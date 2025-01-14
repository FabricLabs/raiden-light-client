import { BigNumber } from '@ethersproject/bignumber';
import { concat as concatBytes, hexDataLength, hexlify } from '@ethersproject/bytes';
import { keccak256 } from '@ethersproject/keccak256';
import type { JsonRpcProvider, Provider } from '@ethersproject/providers';
import { Web3Provider } from '@ethersproject/providers';
import { fold, isRight } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import * as t from 'io-ts';
import type { Observable } from 'rxjs';
import { concat, defer, firstValueFrom, from, lastValueFrom, of, timer } from 'rxjs';
import { delay, ignoreElements, map, mapTo, take, tap, toArray } from 'rxjs/operators';

import type { Lock } from '@/channels';
import { LocksrootZero } from '@/constants';
import { getLocksroot, getSecrethash, makeSecret } from '@/transfers/utils';
import { getSortedAddresses } from '@/transport/utils';
import { encode } from '@/utils/data';
import { assert, ErrorCodec, ErrorCodes, RaidenError } from '@/utils/error';
import {
  contractHasMethod,
  fromEthersEvent,
  getLogsByChunk$,
  getNetworkName,
} from '@/utils/ethers';
import { LruCache } from '@/utils/lru';
import { completeWith, concatBuffer, lastMap, takeIf, withMergeFrom } from '@/utils/rx';
import {
  Address,
  BigNumberC,
  decode,
  HexString,
  Secret,
  templateLiteral,
  Timed,
  timed,
  UInt,
} from '@/utils/types';

import { makeAddress } from '../utils';

describe('getLogsByChunk$', () => {
  let provider: jest.Mocked<JsonRpcProvider>;
  const error = new Error('getLogs error');

  beforeEach(() => {
    provider = {
      pollingInterval: 10,
      send: jest.fn(async () => []),
      formatter: { filterLog: jest.fn(() => true) },
    } as unknown as jest.Mocked<JsonRpcProvider>;
  });

  test('success: fail to minChunk', async () => {
    expect.assertions(7);

    // errors twice before succeeding
    provider.send.mockRejectedValueOnce(error);
    provider.send.mockRejectedValueOnce(error);

    await expect(
      lastValueFrom(getLogsByChunk$(provider, { fromBlock: 20, toBlock: 30 }, 10, 5), {
        defaultValue: undefined,
      }),
    ).resolves.toBeUndefined();
    expect(provider.send).toHaveBeenCalledTimes(5);
    expect(provider.send).toHaveBeenNthCalledWith(1, 'eth_getLogs', [
      { fromBlock: hexlify(20), toBlock: hexlify(29) },
    ]);
    expect(provider.send).toHaveBeenNthCalledWith(2, 'eth_getLogs', [
      { fromBlock: hexlify(20), toBlock: hexlify(24) },
    ]);

    expect(provider.send).toHaveBeenNthCalledWith(3, 'eth_getLogs', [
      { fromBlock: hexlify(20), toBlock: hexlify(24) },
    ]);
    expect(provider.send).toHaveBeenNthCalledWith(4, 'eth_getLogs', [
      { fromBlock: hexlify(25), toBlock: hexlify(29) },
    ]);
    expect(provider.send).toHaveBeenNthCalledWith(5, 'eth_getLogs', [
      { fromBlock: hexlify(30), toBlock: hexlify(30) },
    ]);
  });

  test('fail: max retries', async () => {
    expect.assertions(5);

    provider.send.mockRejectedValue(error);

    await expect(
      lastValueFrom(getLogsByChunk$(provider, { fromBlock: 20, toBlock: 30 }, 10, 4), {
        defaultValue: undefined,
      }),
    ).rejects.toBe(error);
    expect(provider.send).toHaveBeenCalledTimes(5);
    expect(provider.send).toHaveBeenCalledWith('eth_getLogs', [
      {
        fromBlock: hexlify(20),
        toBlock: hexlify(29),
      },
    ]);
    expect(provider.send).toHaveBeenCalledWith('eth_getLogs', [
      {
        fromBlock: hexlify(20),
        toBlock: hexlify(24),
      },
    ]);
    expect(provider.send).toHaveBeenCalledWith('eth_getLogs', [
      {
        fromBlock: hexlify(20),
        toBlock: hexlify(23),
      },
    ]);
  });
});

test('fromEthersEvent', async () => {
  expect.assertions(3);

  const provider = new Web3Provider({
    request: async ({ method }) => {
      if (method === 'eth_blockNumber') return 123;
      else if (method === 'eth_chainId') return 1337;
    },
  });
  provider.pollingInterval = 10;
  const onSpy = jest.spyOn(provider, 'on');
  const removeListenerSpy = jest.spyOn(provider, 'removeListener');

  const promise = firstValueFrom(fromEthersEvent<number>(provider, 'block'));
  const blockNumber = await promise;

  expect(blockNumber).toBe(123);
  expect(onSpy).toHaveBeenCalledTimes(1);
  expect(removeListenerSpy).toHaveBeenCalledTimes(1);
});

describe('types', () => {
  test('HexString', () => {
    // ensure same instance
    expect(HexString()).toBe(HexString(undefined));
    expect(HexString(20)).not.toBe(HexString());

    const b = '0xdeadbeef' as HexString;
    const B = HexString().encode(b);
    expect(HexString().is(B)).toBe(true);
    expect(B).toBe(b);
    pipe(
      HexString().decode(B),
      fold(
        () => {
          throw new Error('failed');
        },
        (result) => expect(result).toBe(b),
      ),
    );
  });

  test('UInt<8>', () => {
    expect(UInt(8)).toBe(UInt(8)); // ensure same instance
    expect(UInt(8).is(BigNumber.from('18446744073709551615'))).toBe(true);
    expect(UInt(8).is(BigNumber.from('18446744073709551616'))).toBe(false);
    expect(UInt(8).is(BigNumber.from('-1'))).toBe(false);
  });

  test('UInt<32>', () => {
    expect(UInt(32)).toBe(UInt(32)); // ensure same instance
    expect(UInt(32)).not.toBe(UInt(8));
    expect(
      UInt(32).is(
        BigNumber.from(
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
        ),
      ),
    ).toBe(true);
    expect(
      UInt(32).is(
        BigNumber.from(
          '115792089237316195423570985008687907853269984665640564039457584007913129639936',
        ),
      ),
    ).toBe(false);
    expect(UInt(32).is(BigNumber.from('-1'))).toBe(false);
  });

  test('BigNumberC', () => {
    const b = BigNumber.from(16);
    expect(BigNumberC.is(b)).toBe(true);
    expect(BigNumberC.encode(b)).toEqual('16');
    pipe(
      BigNumberC.decode(b),
      fold(
        () => {
          throw new Error('failed');
        },
        (result) => expect(result).toBeInstanceOf(BigNumber),
      ),
    );
    expect(isRight(BigNumberC.decode(null))).toBe(false);
  });

  test('Address', () => {
    const address = '0x000000000000000000000000000000000004000A',
      address2 = '0x00000000000000000000000000000000000300Aa';

    const addrPred = jest.spyOn(Address, 'is');

    expect(Address.is(address)).toBe(true);
    expect(Address.is(address.toLowerCase())).toBe(false);
    expect(Address.is(address2)).toBe(false);

    // can decode lowercased addresses
    const address2decoded = decode(Address, address2.toLowerCase());
    expect(address2decoded).toBeTruthy();
    expect(Address.is(address2decoded)).toBe(true);
    // still serializes to the checksummed format
    expect(address2decoded).not.toEqual(address2);
    expect(address2decoded).not.toEqual(address2.toLowerCase());

    expect(addrPred).toHaveBeenCalledTimes(4);

    // narrow address to Address below
    if (!Address.is(address)) throw new Error('not an address');

    // functions receiving HexStrings should accept Address, as it's also an HexString
    function foo(h: HexString): HexString {
      return h;
    }
    function bar(h: HexString<20>): HexString<20> {
      return h;
    }
    expect(foo(address)).toBe(address);
    expect(bar(address)).toBe(address);
  });

  test('Timed', () => {
    const TimedAddress = Timed(t.type({ address: Address }));
    type TimedAddress = t.TypeOf<typeof TimedAddress>;

    const address = '0x000000000000000000000000000000000004000A' as Address,
      data: TimedAddress = timed({ address });
    expect(TimedAddress.is(data)).toBe(true);
    expect(TimedAddress.is({ address, ts: 'invalid number' })).toBe(false);
  });

  test('ErrorCodec', () => {
    const err = new RaidenError(ErrorCodes.RDN_GENERAL_ERROR);
    expect(ErrorCodec.is(err)).toBe(true);
    const encoded = ErrorCodec.encode(err);
    expect(encoded).toEqual({
      name: 'RaidenError',
      message: ErrorCodes.RDN_GENERAL_ERROR,
      stack: expect.any(String),
    });
    expect(decode(ErrorCodec, encoded)).toStrictEqual(err);
    const decoded = decode(ErrorCodec, encoded);
    expect(decoded).toBeInstanceOf(RaidenError);
    expect(decoded.message).toBe(ErrorCodes.RDN_GENERAL_ERROR);
    expect(decoded.stack).toBeTruthy();
  });
});

test('LruCache', () => {
  const cache = new LruCache<string, { v: number }>(2);
  expect(cache.size).toBe(0);
  expect(cache.max).toBe(2);

  const v1 = { v: 1 },
    v2 = { v: 2 },
    v3 = { v: 3 };
  cache.set('1', v1);
  cache.set('2', v2);

  expect(cache.get('1')).toBe(v1);
  expect(cache.get('2')).toBe(v2);
  expect(cache.get('3')).toBeUndefined();

  cache.set('3', v3);
  expect(cache.get('3')).toBe(v3);
  expect(cache.get('2')).toBe(v2);
  expect(cache.get('1')).toBeUndefined();
  expect(cache.size).toBe(2);

  cache.clear();
  expect(cache.size).toBe(0);
});

describe('data', () => {
  test('encode', () => {
    expect(encode(3, 2)).toBe('0x0003');
    expect(encode('0x4001', 2)).toBe('0x4001');
    expect(encode([5, 6], 2)).toBe('0x0506');
    expect(encode(BigNumber.from('48879'), 3)).toBe('0x00beef');

    expect(() => encode(-1, 2)).toThrowError('negative');
    expect(() => encode(BigNumber.from(65537), 2)).toThrowError('too large');
    expect(() => encode('0x01', 2)).toThrowError(ErrorCodes.DTA_ARRAY_LENGTH_DIFFERENCE);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(() => encode(null, 2)).toThrowError(
      'Passed data is not a HEX string nor integer array',
    );
  });
});

describe('messages', () => {
  test('getLocksroot', () => {
    expect(getLocksroot([])).toBe(
      '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    );
    expect(getLocksroot([])).toBe(LocksrootZero);
    const locks: Lock[] = [
      {
        amount: BigNumber.from(1) as UInt<32>,
        expiration: BigNumber.from(1) as UInt<32>,
        secrethash: getSecrethash(keccak256('0x01') as Secret),
      },
      {
        amount: BigNumber.from(2) as UInt<32>,
        expiration: BigNumber.from(2) as UInt<32>,
        secrethash: getSecrethash(keccak256('0x02') as Secret),
      },
      {
        amount: BigNumber.from(3) as UInt<32>,
        expiration: BigNumber.from(3) as UInt<32>,
        secrethash: getSecrethash(keccak256('0x03') as Secret),
      },
    ];
    expect(getLocksroot([locks[0]])).toBe(
      '0xa006dee2839936dcff0101a74d3760319cecb7ce7fbca57be4a7e2bb86bbbfe6',
    );
    expect(getLocksroot(locks)).toBe(
      '0xe0cd0d2f9fb2ed8cf1ddc3789e62b6b6f83e2b174399202d7217333e141a910b',
    );
  });

  test('makeSecret', () => {
    const secret = makeSecret();
    expect(Secret.is(secret)).toBe(true);
    expect(hexDataLength(secret)).toBe(32);
  });
});

describe('RaidenError', () => {
  test('RaidenError is instance of its custom class', () => {
    try {
      throw new RaidenError(ErrorCodes.PFS_DISABLED);
    } catch (err) {
      expect(err).toBeInstanceOf(RaidenError);
      expect(err instanceof Error).toBeTruthy();
      expect((err as Error).name).toEqual('RaidenError');
    }
  });

  test('Has stack trace w/ class name and developer-friendly message', () => {
    try {
      function doSomething() {
        throw new RaidenError(ErrorCodes.PFS_DISABLED);
      }
      doSomething();
    } catch (err) {
      // Stack trace exists
      expect((err as Error).stack).toBeDefined();

      // Stack trace starts with the error message
      expect((err as Error).stack!.split('\n').shift()).toEqual(
        'RaidenError: Pathfinding Service is disabled and no direct route is available.',
      );

      // Stack trace contains function where error was thrown
      expect((err as Error).stack!.split('\n')[1]).toContain('doSomething');
    }
  });

  test('End user "code" property is set', () => {
    try {
      throw new RaidenError(ErrorCodes.PFS_DISABLED);
    } catch (err) {
      expect((err as RaidenError).code).toBeDefined();
      expect((err as RaidenError).code).toEqual('PFS_DISABLED');
    }
  });

  test('Details can be added and are shown in stack trace', () => {
    try {
      throw new RaidenError(ErrorCodes.PFS_DISABLED, { value: 'bar', key: 'foo' });
    } catch (err) {
      expect((err as RaidenError).details).toStrictEqual({ value: 'bar', key: 'foo' });
    }
  });
});

test('getNetworkName', () => {
  expect(getNetworkName({ name: 'unknown', chainId: 1337 })).toBe('1337');
  expect(getNetworkName({ name: 'homestead', chainId: 1 })).toBe('mainnet');
  expect(getNetworkName({ name: 'goerli', chainId: 5 })).toBe('goerli');
});

test('concatBuffer', async () => {
  await expect(
    lastValueFrom(
      of(1, 2, 3).pipe(
        concatBuffer((values) => timer(10).pipe(mapTo(values))),
        toArray(),
      ),
    ),
  ).resolves.toStrictEqual([[1], [2, 3]]);
});

test('getSortedAddresses', () => {
  expect(
    getSortedAddresses(
      '0x00000000000000000000000000000000000004Aa' as Address,
      '0x00000000000000000000000000000000000003Aa' as Address,
    ),
  ).toEqual([
    '0x00000000000000000000000000000000000003Aa',
    '0x00000000000000000000000000000000000004Aa',
  ]);
  expect(
    getSortedAddresses(
      '0x0000000000000000000000000000000000000A00' as Address,
      '0x000000000000000000000000000000000000000A' as Address,
      '0x000000000000000000000000000000000000A000' as Address,
    ),
  ).toEqual([
    '0x000000000000000000000000000000000000000A',
    '0x0000000000000000000000000000000000000A00',
    '0x000000000000000000000000000000000000A000',
  ]);
  expect(
    getSortedAddresses(
      '0x000000000000000000000000000000000000000b' as Address,
      '0x000000000000000000000000000000000000000A' as Address,
      '0x0000000000000000000000000000000000000009' as Address,
    ),
  ).toEqual([
    '0x0000000000000000000000000000000000000009',
    '0x000000000000000000000000000000000000000A',
    '0x000000000000000000000000000000000000000b',
  ]);
});

test('completeWith', async () => {
  expect.assertions(5);

  const completeBefore = jest.fn();
  const completeAfter = jest.fn();
  await expect(
    lastValueFrom(
      timer(20).pipe(
        tap({ complete: completeBefore }),
        completeWith(timer(10)),
        tap({ complete: completeAfter }),
      ),
      { defaultValue: undefined },
    ),
  ).resolves.toBeUndefined();
  // since completeWith completed the output before the input timer, it seems like it was
  // unsubscribed instead, but second tap sees proper completion
  expect(completeBefore).not.toHaveBeenCalled();
  expect(completeAfter).toHaveBeenCalled();

  // since completeWith emits synchronously, it should unsubscribe from (even synchronous) input
  // before first emition
  await expect(
    lastValueFrom(of(1).pipe(completeWith(of(2))), { defaultValue: undefined }),
  ).resolves.toBeUndefined();

  // timer(0) is immediate but asynchronous, synchronous input should still go through
  await expect(
    lastValueFrom(of(1).pipe(completeWith(timer(0))), { defaultValue: undefined }),
  ).resolves.toBe(1);
});

test('lastMap', async () => {
  const project = jest.fn(async () => true);
  await expect(lastValueFrom(of(1, 2, 3).pipe(lastMap(project)))).resolves.toBe(true);
  expect(project).toHaveBeenCalledTimes(1); // only last emition passes
  expect(project).toHaveBeenCalledWith(3, expect.anything());

  const project2 = jest.fn((v) => of([v]).pipe(delay(20)));
  await expect(
    lastValueFrom(timer(10).pipe(ignoreElements(), lastMap(project2))),
  ).resolves.toEqual([null]);
  expect(project2).toHaveBeenCalledTimes(1); // only last emition passed
  // ignoreElements calls project with null
  expect(project2).toHaveBeenCalledWith(null, expect.anything());
});

test('withMergeFrom', async () => {
  const obs1 = of(1, 2);
  const obs2 = jest.fn(
    (v1: number, count: number) => from(Array.from({ length: v1 }, () => count)), // [0], [1, 1]
  );
  const obs3 = jest.fn(async (v1: number, v2: number, sub: boolean) =>
    Promise.resolve({ v: sub ? v2 - v1 : v1 + v2 }),
  );

  expect(
    lastValueFrom(
      obs1.pipe(
        withMergeFrom((v1, count) => obs2(v1, count)),
        withMergeFrom(([v1, v2]) => obs3(v1, v2, true)),
        map(([[v1, v2], { v: v3 }]) => ({ v1, v2, v3 })),
        toArray(),
      ),
    ),
  ).resolves.toEqual([
    { v1: 1, v2: 0, v3: -1 },
    { v1: 2, v2: 1, v3: -1 },
    { v1: 2, v2: 1, v3: -1 },
  ]);
  expect(obs2).toHaveBeenCalledTimes(2);
  expect(obs3).toHaveBeenCalledTimes(3);
});

test('takeIf', async () => {
  expect.assertions(7);

  // sync emit passes if condition is truthy
  await expect(lastValueFrom(of(0).pipe(takeIf(of(true))))).resolves.toBe(0);

  // falsy cond on sync emit emits nothing
  await expect(
    lastValueFrom(of(0).pipe(takeIf(of(false))), { defaultValue: undefined }),
  ).resolves.toBeUndefined();

  // async emit passes if condition is truthy
  let source$ = jest.fn(() => timer(20) as Observable<number>);
  await expect(lastValueFrom(defer(source$).pipe(takeIf(of(true))))).resolves.toBe(0);
  // source$ should be subscribed only once
  expect(source$).toHaveBeenCalledTimes(1);

  // falsy cond on async emit emits nothing
  await expect(
    lastValueFrom(timer(10).pipe(takeIf(of(false))), { defaultValue: undefined }),
  ).resolves.toBeUndefined();

  source$ = jest.fn(() => timer(20, 20));
  // truthy - falsy - truthy..
  const cond$ = jest.fn(() => concat(of(true), timer(30, 10)));
  await expect(
    lastValueFrom(defer(source$).pipe(takeIf(defer(cond$)), take(4), toArray())),
  ).resolves.toEqual([0, 0, 1, 2]);
  // source$ should be subscribed twice: once for true, once for 1..
  expect(source$).toHaveBeenCalledTimes(2);
});

test('contractHasMethod', async () => {
  const sighash = '0xdeadbeef' as HexString<4>;
  const provider = {
    getCode: jest.fn(async () => hexlify(concatBytes(['0x001122', '0x63', sighash, '0x7890']))),
  } as unknown as jest.Mocked<Provider>;
  const contract1 = makeAddress();
  const contract2 = makeAddress();

  await expect(contractHasMethod(sighash, { address: contract1, provider })).resolves.toBeTrue();
  expect(provider.getCode).toHaveBeenCalledWith(contract1);

  provider.getCode.mockResolvedValue('0x1337');

  // memoized call per address
  await expect(contractHasMethod(sighash, { address: contract1, provider })).resolves.toBeTrue();

  await expect(contractHasMethod(sighash, { address: contract2, provider })).resolves.toBeFalse();
  expect(provider.getCode).toHaveBeenCalledWith(contract2);
  expect(provider.getCode).toHaveBeenCalledTimes(2);
});

test('templateLiteral', () => {
  const myLiteral = templateLiteral<`#{number}#`>(/^#\d+#$/);
  type MyLiteral = t.TypeOf<typeof myLiteral>;
  expect(myLiteral.is('#123#')).toBe(true);
  expect(myLiteral.is('##')).toBe(false);
  expect(myLiteral.is('#1#')).toBe(true);
  expect(myLiteral.is('#9999')).toBe(false);
  expect(myLiteral.is('8888#')).toBe(false);

  const str = '#456#' as string;
  let encapsulated: `$${MyLiteral}$`;
  assert(myLiteral.is(str));
  // eslint-disable-next-line prefer-const
  encapsulated = `$${str}$`; // assigning only possible if str is properly inferred
  expect(myLiteral.is(encapsulated.substr(1, 5))).toBe(true);
});
