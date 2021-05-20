import { ensureChannelIsOpen, ensurePresence, matrixServer, token } from './fixtures';
import { fetch, makeRaiden, makeRaidens, makeSignature } from './mocks';

import { verifyMessage } from '@ethersproject/wallet';
import { EventEmitter } from 'events';
import type { MatrixClient } from 'matrix-js-sdk';
import { first, pluck } from 'rxjs/operators';

import { raidenConfigUpdate, raidenShutdown } from '@/actions';
import { Capabilities } from '@/constants';
import { messageReceived, messageSend, messageServiceSend } from '@/messages/actions';
import type { Delivered, Processed } from '@/messages/types';
import { MessageType } from '@/messages/types';
import { encodeJsonMessage, signMessage } from '@/messages/utils';
import { Service } from '@/services/types';
import { makeMessageId } from '@/transfers/utils';
import { matrixPresence, matrixSetup, rtcChannel } from '@/transport/actions';
import { getSortedAddresses } from '@/transport/utils';
import { ErrorCodes } from '@/utils/error';
import type { Address, Signed } from '@/utils/types';
import { isntNil } from '@/utils/types';

import { sleep } from '../utils';
import type { MockedRaiden } from './mocks';

const accessToken = 'access_token';
const deviceId = 'device_id';
const processed: Processed = {
  type: MessageType.PROCESSED,
  message_identifier: makeMessageId(),
};

function getSortedClients<C extends { address: Address }[]>(clients: C): C {
  const addresses = getSortedAddresses(...clients.map(({ address }) => address));
  return [...clients].sort(
    (a, b) => addresses.indexOf(a.address) - addresses.indexOf(b.address),
  ) as C;
}

type MockedDataChannel = jest.Mocked<RTCDataChannel & EventEmitter>;
type MockedPeerConnection = jest.Mocked<RTCPeerConnection & EventEmitter>;

/**
 * Spies and mocks classes constructors on globalThis
 *
 * @returns Mocked spies
 */
function mockRTC() {
  const RTCPeerConnection = jest.spyOn(globalThis, 'RTCPeerConnection').mockImplementation(() => {
    class RTCDataChannel extends EventEmitter {
      readyState = 'unknown';
      close = jest.fn();
      send = jest.fn();
    }
    const channel = new RTCDataChannel() as unknown as MockedDataChannel;

    class RTCPeerConnection extends EventEmitter {
      createDataChannel = jest.fn(() => channel);
      createOffer = jest.fn(async () => ({ type: 'offer', sdp: 'offerSdp' }));
      createAnswer = jest.fn(async () => ({ type: 'answer', sdp: 'answerSdp' }));
      setLocalDescription = jest.fn(async () => {
        setTimeout(() => {
          connection.emit('icecandidate', { candidate: 'candidate1Fail' });
          connection.emit('icecandidate', { candidate: 'myCandidate' });
          connection.emit('icecandidate', { candidate: null });
        }, 5);
      });
      setRemoteDescription = jest.fn(async () => {
        /* remote */
      });
      addIceCandidate = jest.fn(async () => {
        setTimeout(() => connection.emit('datachannel', { channel }), 2);
        setTimeout(() => {
          Object.assign(channel, { readyState: 'open' });
          channel.emit('open', true);
        }, 5);
        setTimeout(() => channel.emit('message', { data: 'ping' }), 12);
      });
      close = jest.fn();
    }
    const connection = new RTCPeerConnection() as unknown as MockedPeerConnection;
    connection.addIceCandidate.mockRejectedValueOnce(new Error('addIceCandidate failed'));

    return connection;
  });

  return RTCPeerConnection;
}

describe('initMatrixEpic', () => {
  let raiden: MockedRaiden;

  beforeEach(async () => {
    fetch.mockImplementation(async () => ({
      ok: true,
      status: 200,
      json: jest.fn<Promise<unknown>, []>(async () => ({
        active_servers: [matrixServer],
        all_servers: [],
      })),
    }));
    raiden = await makeRaiden(undefined, false);
  });

  afterEach(() => jest.restoreAllMocks());

  test('matrix stored setup', async () => {
    expect.assertions(4);

    const userId = `@${raiden.address.toLowerCase()}:${matrixServer}`;
    const displayName = await raiden.deps.signer.signMessage(userId);
    const setupPayload = {
      server: `https://${matrixServer}`,
      setup: {
        userId,
        accessToken,
        deviceId,
        displayName,
      },
    };
    // since this is called before start, it sets the state but doesn't go to output
    raiden.store.dispatch(raidenConfigUpdate({ httpTimeout: 30 }));
    raiden.store.dispatch(matrixSetup(setupPayload));

    await raiden.start();
    await sleep();
    const matrix = (await raiden.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;

    expect(raiden.output).toContainEqual(matrixSetup(setupPayload));
    expect(matrix.setPushRuleEnabled).toHaveBeenCalledWith(
      'global',
      'override',
      '.m.rule.master',
      true,
    );
    // ensure if stored setup works, servers list don't need to be fetched
    expect(fetch).not.toHaveBeenCalled();

    // test presence got set again after some time, to overcome presence bug
    await sleep(2 * raiden.config.httpTimeout);
    // test presence got set again after some time, to overcome presence bug
    expect(matrix.setPresence).toHaveBeenCalledWith({
      presence: 'online',
      status_msg: expect.any(String),
    });
  });

  test('matrix server config set without stored setup', async () => {
    expect.assertions(2);

    const matrixServer = 'mycustom.matrix.server';
    raiden.store.dispatch(raidenConfigUpdate({ matrixServer: `https://${matrixServer}` }));
    await raiden.start();
    await sleep();

    expect(raiden.output).toContainEqual(
      matrixSetup({
        server: `https://${matrixServer}`,
        setup: {
          userId: `@${raiden.address.toLowerCase()}:${matrixServer}`,
          accessToken: expect.any(String),
          deviceId: expect.any(String),
          displayName: expect.any(String),
        },
      }),
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  test('matrix server config set same as stored setup', async () => {
    expect.assertions(2);

    const matrixServer = 'mycustom.matrix.server';
    const userId = `@${raiden.address.toLowerCase()}:${matrixServer}`;
    const displayName = await raiden.deps.signer.signMessage(userId);
    const setupPayload = {
      server: `https://${matrixServer}`,
      setup: {
        userId,
        accessToken,
        deviceId,
        displayName,
      },
    };
    // since this is called before start, it sets the state but doesn't go to output
    raiden.store.dispatch(matrixSetup(setupPayload));
    raiden.store.dispatch(raidenConfigUpdate({ matrixServer: `https://${matrixServer}` }));

    await raiden.start();
    await sleep();

    expect(raiden.output).toContainEqual(matrixSetup(setupPayload));
    // ensure if stored setup works, servers list don't need to be fetched
    expect(fetch).not.toHaveBeenCalled();
  });

  test('matrix fetch servers list', async () => {
    expect.assertions(2);

    // make the matrixServer falsy otherwise fetchSortedMatrixServers$
    // inside initMatrixEpic is not called. This will force fetching server list
    raiden.store.dispatch(raidenConfigUpdate({ matrixServer: '' }));
    await raiden.start();
    await sleep();

    expect(raiden.output).toContainEqual(
      matrixSetup({
        server: `https://${matrixServer}`,
        setup: {
          userId: `@${raiden.address.toLowerCase()}:${matrixServer}`,
          accessToken: expect.any(String),
          deviceId: expect.any(String),
          displayName: expect.any(String),
        },
      }),
    );
    expect(fetch).toHaveBeenCalledTimes(2); // list + rtt
  });

  test('matrix throws if can not fetch servers list', async () => {
    expect.assertions(3);

    // Can't fetch server list
    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: jest.fn(async () => ({})),
    });
    raiden.store.dispatch(raidenConfigUpdate({ matrixServer: '' }));

    await raiden.start();
    await raiden.action$.toPromise();

    expect(raiden.started).toBeFalsy();
    expect(raiden.output).toContainEqual(
      raidenShutdown({
        reason: expect.objectContaining({
          message: expect.stringContaining('Could not fetch server list'),
        }),
      }),
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('matrix throws if can not contact any server from list', async () => {
    expect.assertions(3);

    // error matrixRTT
    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: jest.fn(async () => ({})),
    });
    // but first, succeed on fetch list
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn(async () => ({
        active_servers: [matrixServer],
        all_servers: [],
      })),
    });

    // set fetch list from matrixServerLookup
    raiden.store.dispatch(raidenConfigUpdate({ matrixServer: '' }));
    await raiden.start();
    await raiden.action$.toPromise();

    expect(raiden.started).toBeFalsy();
    expect(raiden.output).toContainEqual(
      raidenShutdown({
        reason: expect.objectContaining({
          message: ErrorCodes.TRNS_NO_MATRIX_SERVERS,
        }),
      }),
    );
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});

test('channelMonitored triggers matrixPresence.request', async () => {
  const [raiden, partner] = await makeRaidens(2);
  await ensureChannelIsOpen([raiden, partner]);

  expect(raiden.output).toContainEqual(
    matrixPresence.request(undefined, { address: partner.address }),
  );
});

test('matrixShutdownEpic: stopClient called on action$ completion', async () => {
  expect.assertions(2);
  const raiden = await makeRaiden(undefined);
  const matrix = await raiden.deps.matrix$.toPromise();
  expect(matrix.stopClient).not.toHaveBeenCalled();
  raiden.stop();
  expect(matrix.stopClient).toHaveBeenCalledTimes(1);
});

describe('matrixMonitorPresenceEpic', () => {
  test('fails when users does not have displayName', async () => {
    expect.assertions(1);

    const [raiden, partner] = await makeRaidens(2);
    const matrix = (await raiden.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const partnerMatrix = (await partner.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    matrix.searchUserDirectory.mockImplementationOnce(async () => ({
      limited: false,
      results: [{ user_id: partnerMatrix.getUserId()! }],
    }));

    raiden.store.dispatch(matrixPresence.request(undefined, { address: partner.address }));

    await sleep(2 * raiden.config.pollingInterval);
    expect(raiden.output).toContainEqual(
      matrixPresence.failure(expect.any(Error), { address: partner.address }),
    );
  });

  test('fails when users does not have valid addresses', async () => {
    expect.assertions(1);
    const [raiden, partner] = await makeRaidens(2);
    const matrix = (await raiden.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;

    matrix.searchUserDirectory.mockImplementation(async () => ({
      limited: false,
      results: [{ user_id: `@invalidUser:${matrixServer}`, display_name: 'display_name' }],
    }));

    raiden.store.dispatch(matrixPresence.request(undefined, { address: partner.address }));

    await sleep(2 * raiden.config.pollingInterval);
    expect(raiden.output).toContainEqual(
      matrixPresence.failure(expect.any(Error), { address: partner.address }),
    );
  });

  test('fails when users does not have presence or unknown address', async () => {
    expect.assertions(1);

    const [raiden, partner] = await makeRaidens(2);
    const matrix = (await raiden.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const partnerMatrix = (await partner.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    (verifyMessage as jest.Mock).mockReturnValueOnce(token);
    matrix.searchUserDirectory.mockImplementation(async () => ({
      limited: false,
      results: [{ user_id: partnerMatrix.getUserId()!, display_name: 'display_name' }],
    }));

    raiden.store.dispatch(matrixPresence.request(undefined, { address: partner.address }));

    await sleep(2 * raiden.config.pollingInterval);
    expect(raiden.output).toContainEqual(
      matrixPresence.failure(expect.any(Error), { address: partner.address }),
    );
  });

  test('fails when verifyMessage throws', async () => {
    expect.assertions(1);

    const [raiden, partner] = await makeRaidens(2);
    const matrix = (await raiden.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const partnerMatrix = (await partner.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;

    matrix.searchUserDirectory.mockImplementation(async () => ({
      limited: false,
      results: [{ user_id: partnerMatrix.getUserId()!, display_name: 'display_name' }],
    }));
    (verifyMessage as jest.Mock).mockImplementationOnce(() => {
      throw new Error('invalid signature');
    });

    raiden.store.dispatch(matrixPresence.request(undefined, { address: partner.address }));

    await sleep(2 * raiden.config.pollingInterval);
    expect(raiden.output).toContainEqual(
      matrixPresence.failure(expect.any(Error), { address: partner.address }),
    );
  });

  test('success with previously monitored user', async () => {
    expect.assertions(1);
    const [raiden, partner] = await makeRaidens(2);
    const partnerMatrix = await partner.deps.matrix$.toPromise();
    const presence = matrixPresence.success(
      { userId: partnerMatrix.getUserId()!, available: false, ts: Date.now() },
      { address: partner.address },
    );

    raiden.store.dispatch(presence);
    const sliceLength = raiden.output.length;
    raiden.store.dispatch(matrixPresence.request(undefined, { address: partner.address }));

    await sleep(2 * raiden.config.pollingInterval);
    expect(raiden.output.slice(sliceLength)).toContainEqual(presence);
  });

  test('success with searchUserDirectory and getUserPresence', async () => {
    expect.assertions(1);

    const [raiden, partner] = await makeRaidens(2);
    const matrix = (await raiden.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const partnerMatrix = (await partner.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    matrix.searchUserDirectory.mockImplementation(async ({ term }) => ({
      results: [
        {
          user_id: `@${term}:${matrixServer}`,
          display_name: `${term}_display_name`,
          avatar_url: 'mxc://raiden.network/cap?Delivery=0&randomCap=test',
        },
      ],
    }));

    raiden.store.dispatch(matrixPresence.request(undefined, { address: partner.address }));

    await sleep(2 * raiden.config.pollingInterval);
    expect(raiden.output).toContainEqual(
      matrixPresence.success(
        {
          userId: partnerMatrix.getUserId()!,
          available: true,
          ts: expect.any(Number),
          caps: { [Capabilities.DELIVERY]: 0, randomCap: 'test' },
        },
        { address: partner.address },
      ),
    );
  });

  test('success even if some getUserPresence fails', async () => {
    expect.assertions(1);

    const [raiden, partner] = await makeRaidens(2);
    const matrix = (await raiden.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const partnerMatrix = (await partner.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    matrix.searchUserDirectory.mockImplementationOnce(async () => ({
      limited: false,
      results: [
        { user_id: `@${partner.address.toLowerCase()}.2:${matrixServer}`, display_name: '2' },
        { user_id: partnerMatrix.getUserId()!, display_name: '1' },
      ],
    }));
    matrix._http.authedRequest.mockRejectedValueOnce(new Error('Could not fetch presence'));

    raiden.store.dispatch(matrixPresence.request(undefined, { address: partner.address }));

    await sleep(2 * raiden.config.pollingInterval);
    expect(raiden.output).toContainEqual(
      matrixPresence.success(
        { userId: partnerMatrix.getUserId()!, available: true, ts: expect.any(Number) },
        { address: partner.address },
      ),
    );
  });
});

test('matrixUpdateCapsEpic', async () => {
  // Please check this test thoroughly whether we are testing the right things
  expect.assertions(5);

  const raiden = await makeRaiden();
  const matrix = (await raiden.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;

  raiden.store.dispatch(raidenConfigUpdate({ caps: { [Capabilities.DELIVERY]: 0 } }));

  await sleep(2 * raiden.config.pollingInterval);
  expect(matrix.setAvatarUrl).toHaveBeenCalledTimes(1);
  // expect(matrix.setAvatarUrl).toHaveBeenCalledWith('noDelivery');

  matrix.setAvatarUrl.mockRejectedValueOnce(new Error('failed'));
  raiden.store.dispatch(
    raidenConfigUpdate({
      caps: { [Capabilities.DELIVERY]: 1 },
    }),
  );

  await sleep(2 * raiden.config.pollingInterval);
  expect(matrix.setAvatarUrl).toHaveBeenCalledTimes(3);
  expect(matrix.setAvatarUrl).toHaveBeenCalledWith(
    expect.stringMatching(`mxc://raiden.network/cap?.*${Capabilities.DELIVERY}=1`),
  );

  raiden.store.dispatch(raidenConfigUpdate({ caps: { customCap: 'abc' } }));

  await sleep(2 * raiden.config.pollingInterval);
  expect(matrix.setAvatarUrl).toHaveBeenCalledTimes(4);
  expect(matrix.setAvatarUrl).toHaveBeenCalledWith(
    expect.stringMatching(`mxc://raiden.network/cap?.*${Capabilities.DELIVERY}=0&.*customCap=abc`),
  );
});

describe('matrixLeaveUnknownRoomsEpic', () => {
  test('leave unknown rooms', async () => {
    expect.assertions(3);

    const raiden = await makeRaiden();
    const matrix = (await raiden.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const roomId = `!unknownRoomId:${matrixServer}`;

    matrix.emit('Room', {
      roomId,
      getCanonicalAlias: jest.fn(),
      getAliases: jest.fn(() => []),
      getMyMembership: jest.fn(() => 'join'),
    });

    await sleep();

    // we should wait a little before leaving rooms
    expect(matrix.leave).not.toHaveBeenCalled();

    await sleep(500);

    expect(matrix.leave).toHaveBeenCalledTimes(1);
    expect(matrix.leave).toHaveBeenCalledWith(roomId);
  });

  test('do not leave global room', async () => {
    expect.assertions(2);

    const roomId = `!discoveryRoomId:${matrixServer}`;
    const raiden = await makeRaiden(undefined);
    const matrix = (await raiden.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const roomAlias = `#raiden_${raiden.deps.network.name}_discovery:${matrixServer}`;

    matrix.emit('Room', {
      roomId,
      getCanonicalAlias: jest.fn(),
      getAliases: jest.fn(() => [roomAlias]),
      getMyMembership: jest.fn(() => 'join'),
    });

    await sleep();

    // we should wait a little before leaving rooms
    expect(matrix.leave).not.toHaveBeenCalled();

    await sleep(500);

    // even after some time, discovery room isn't left
    expect(matrix.leave).not.toHaveBeenCalled();
  });
});

describe('matrixMessageSendEpic', () => {
  test('sendToDevice fails', async () => {
    expect.assertions(3);

    const message = 'Hello world!';
    const [raiden, partner] = getSortedClients(await makeRaidens(2));
    raiden.store.dispatch(raidenConfigUpdate({ httpTimeout: 30 }));
    const matrix = (await raiden.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const partnerMatrix = (await partner.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;

    await ensureChannelIsOpen([raiden, partner]);
    await sleep();
    matrix.sendToDevice.mockClear();

    matrix.sendToDevice
      .mockRejectedValueOnce(Object.assign(new Error('Failed 1'), { httpStatus: 500 }))
      .mockRejectedValueOnce(Object.assign(new Error('Failed 2'), { httpStatus: 500 }))
      .mockRejectedValueOnce(Object.assign(new Error('Failed 3'), { httpStatus: 500 }))
      .mockRejectedValueOnce(Object.assign(new Error('Failed 4'), { httpStatus: 500 }));

    raiden.store.dispatch(
      messageSend.request({ message }, { address: partner.address, msgId: message }),
    );

    await sleep(200);
    expect(raiden.output).toContainEqual(
      messageSend.failure(expect.objectContaining({ message: 'Failed 4' }), {
        address: partner.address,
        msgId: message,
      }),
    );
    expect(matrix.sendToDevice).toHaveBeenCalledTimes(4);
    expect(matrix.sendToDevice).toHaveBeenCalledWith(
      'm.room.message',
      expect.objectContaining({
        [partnerMatrix.getUserId()!]: { ['*']: { body: message, msgtype: 'm.text' } },
      }),
    );
  });

  test('success: errors once but retries successfully', async () => {
    expect.assertions(4);
    const [raiden, partner] = await makeRaidens(2);

    const matrix = (await raiden.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const partnerMatrix = (await partner.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const message = await signMessage(raiden.deps.signer, processed);

    raiden.store.dispatch(matrixPresence.request(undefined, { address: partner.address }));
    partner.store.dispatch(matrixPresence.request(undefined, { address: raiden.address }));

    // fail once, succeed on retry
    matrix.sendToDevice.mockRejectedValueOnce(
      Object.assign(new Error('Failed'), { httpStatus: 500 }),
    );
    raiden.store.dispatch(
      messageSend.request(
        { message },
        { address: partner.address, msgId: message.message_identifier.toString() },
      ),
    );

    await sleep(6 * raiden.config.pollingInterval);
    expect(raiden.output).toContainEqual(
      messageSend.success(expect.objectContaining({ via: expect.stringMatching(/^@0x/) }), {
        address: partner.address,
        msgId: message.message_identifier.toString(),
      }),
    );
    expect(matrix.sendEvent).not.toHaveBeenCalled();
    expect(matrix.sendToDevice).toHaveBeenCalledTimes(2);
    expect(matrix.sendToDevice).toHaveBeenCalledWith('m.room.message', {
      [partnerMatrix.getUserId()!]: {
        ['*']: { body: expect.stringMatching('"Processed"'), msgtype: 'm.text' },
      },
    });
  });

  test('success: batch multiple recipients', async () => {
    expect.assertions(4);
    const [raiden, p1, p2] = await makeRaidens(3);

    const matrix = (await raiden.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const p1Matrix = (await p1.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const p2Matrix = (await p2.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;

    const actualSendToDevice = matrix.sendToDevice.getMockImplementation();
    // sendToDevice takes some time to send messages
    const mockedSendToDevice = jest
      .spyOn(matrix, 'sendToDevice')
      .mockImplementation(async (type, contentMap) => {
        await sleep(raiden.config.httpTimeout / 2);
        return await actualSendToDevice!(type, contentMap);
      });

    await ensurePresence([raiden, p1]);
    await ensurePresence([raiden, p2]);

    const length = 4;
    const messages = Array.from({ length }, (_, i) => `test${i + 1}`);
    const ids = Array.from({ length }, (_, i) => (1001 + i).toString());
    const recipients = [p1.address, p1.address, p2.address, p2.address];

    // queue all messages synchronously
    for (let i = 0; i < messages.length; i++)
      raiden.store.dispatch(
        messageSend.request({ message: messages[i] }, { address: recipients[i], msgId: ids[i] }),
      );

    await sleep(2 * raiden.config.httpTimeout);
    expect(raiden.output).toContainEqual(
      messageSend.success(expect.objectContaining({ via: expect.stringMatching(/^@0x/) }), {
        address: p2.address,
        msgId: ids[length - 1],
      }),
    );
    expect(mockedSendToDevice).toHaveBeenCalledTimes(2);
    // first message got sent immediately
    expect(mockedSendToDevice).toHaveBeenNthCalledWith(1, 'm.room.message', {
      [p1Matrix.getUserId()!]: {
        ['*']: { body: messages[0], msgtype: 'm.text' },
      },
    });
    // second message to first recipient, plus batched messages to 2nd recipient, in a single call
    expect(mockedSendToDevice).toHaveBeenNthCalledWith(2, 'm.room.message', {
      [p1Matrix.getUserId()!]: {
        ['*']: { body: messages[1], msgtype: 'm.text' },
      },
      [p2Matrix.getUserId()!]: {
        ['*']: { body: messages.slice(2).join('\n'), msgtype: 'm.text' },
      },
    });
  });
});

describe('matrixMessageReceivedEpic', () => {
  test('receive: success', async () => {
    expect.assertions(1);
    // Gets a log.warn(`Could not decode message: ${line}: ${err}`);
    // at Object.parseMessage (src/transport/epics/helpers.ts:203:9)
    const message = 'test message';
    const [raiden, partner] = getSortedClients(await makeRaidens(2));
    const partnerMatrix = (await partner.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;

    await ensureChannelIsOpen([raiden, partner]);
    await sleep();

    partner.store.dispatch(
      messageSend.request({ message }, { address: raiden.address, msgId: message }),
    );
    await sleep(raiden.config.httpTimeout);

    expect(raiden.output).toContainEqual(
      messageReceived(
        {
          text: message,
          msgtype: 'm.text',
          ts: expect.any(Number),
          userId: partnerMatrix.getUserId()!,
        },
        { address: partner.address },
      ),
    );
  });

  test('receive: decode signed message', async () => {
    expect.assertions(1);

    const [raiden, partner] = await makeRaidens(2);
    const partnerMatrix = (await partner.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const signed = await signMessage(partner.deps.signer, processed);
    const message = encodeJsonMessage(signed);

    await ensureChannelIsOpen([raiden, partner]);
    await sleep();

    partner.store.dispatch(
      messageSend.request({ message }, { address: raiden.address, msgId: message }),
    );
    await sleep(raiden.config.httpTimeout);
    expect(raiden.output).toContainEqual(
      messageReceived(
        {
          text: message,
          message: signed,
          msgtype: 'm.text',
          ts: expect.any(Number),
          userId: partnerMatrix.getUserId()!,
        },
        { address: partner.address },
      ),
    );
  });

  test("receive: messages from wrong sender aren't decoded", async () => {
    expect.assertions(1);

    const [raiden, partner] = await makeRaidens(2);
    const partnerMatrix = (await partner.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    // signed by ourselves
    const signed = await signMessage(raiden.deps.signer, processed);
    const message = encodeJsonMessage(signed);

    await ensureChannelIsOpen([raiden, partner]);
    await sleep();

    partner.store.dispatch(
      messageSend.request({ message }, { address: raiden.address, msgId: message }),
    );
    await sleep(raiden.config.httpTimeout);

    expect(raiden.output).toContainEqual(
      messageReceived(
        {
          text: message,
          message: undefined,
          msgtype: 'm.text',
          ts: expect.any(Number),
          userId: partnerMatrix.getUserId()!,
        },
        { address: partner.address },
      ),
    );
  });
});

describe('deliveredEpic', () => {
  test('success with cached', async () => {
    expect.assertions(3);

    const [raiden, partner] = await makeRaidens(2);
    const partnerMatrix = (await partner.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const message: Signed<Processed> = {
        type: MessageType.PROCESSED,
        message_identifier: makeMessageId(),
        signature: makeSignature(),
      },
      messageReceivedAction = messageReceived(
        {
          text: encodeJsonMessage(message),
          message,
          ts: 123,
          userId: partnerMatrix.getUserId()!,
        },
        { address: partner.address },
      );

    // set status as available in latest$.presences
    raiden.store.dispatch(
      matrixPresence.success(
        { userId: partnerMatrix.getUserId()!, available: true, ts: Date.now() },
        { address: partner.address },
      ),
    );
    const signerSpy = jest.spyOn(raiden.deps.signer, 'signMessage');

    await sleep(2 * raiden.config.pollingInterval);
    raiden.store.dispatch(messageReceivedAction);
    raiden.store.dispatch(messageReceivedAction);

    await sleep(2 * raiden.config.pollingInterval);
    const messageSendAction = messageSend.request(
      {
        message: {
          type: MessageType.DELIVERED,
          delivered_message_identifier: message.message_identifier,
          signature: expect.any(String),
        },
      },
      { address: partner.address, msgId: message.message_identifier.toString() },
    );
    expect(raiden.output).toContainEqual(messageSendAction);
    expect(raiden.output).toEqual(expect.arrayContaining([messageSendAction, messageSendAction]));
    expect(signerSpy).toHaveBeenCalledTimes(1);
    signerSpy.mockRestore();
  });

  test('skip if partner supports !Capabilities.DELIVERY', async () => {
    expect.assertions(2);

    const [raiden, partner] = await makeRaidens(2);
    const partnerMatrix = (await partner.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    const message: Signed<Processed> = {
        type: MessageType.PROCESSED,
        message_identifier: makeMessageId(),
        signature: makeSignature(),
      },
      messageReceivedAction = messageReceived(
        {
          text: encodeJsonMessage(message),
          message,
          ts: 123,
          userId: partnerMatrix.getUserId()!,
        },
        { address: partner.address },
      );

    // set status as available in latest$.presences
    raiden.store.dispatch(
      matrixPresence.success(
        {
          userId: partnerMatrix.getUserId()!,
          available: true,
          ts: Date.now(),
          caps: { [Capabilities.DELIVERY]: 0 },
        },
        { address: partner.address },
      ),
    );

    const signerSpy = jest.spyOn(raiden.deps.signer, 'signMessage');

    await sleep(2 * raiden.config.pollingInterval);
    raiden.store.dispatch(messageReceivedAction);
    raiden.store.dispatch(messageReceivedAction);

    await sleep(2 * raiden.config.pollingInterval);
    const messageSendAction = messageSend.request(expect.anything(), expect.anything());
    expect(raiden.output).not.toContainEqual(messageSendAction);
    expect(signerSpy).toHaveBeenCalledTimes(0);
    signerSpy.mockRestore();
  });

  test('do not reply if not message type which should be replied', async () => {
    expect.assertions(2);

    const [raiden, partner] = await makeRaidens(2);
    const partnerMatrix = (await partner.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
    // Delivered messages aren't in the set of messages which get replied with a Delivered
    const message: Signed<Delivered> = {
        type: MessageType.DELIVERED,
        delivered_message_identifier: makeMessageId(),
        signature: makeSignature(),
      },
      messageReceivedAction = messageReceived(
        {
          text: encodeJsonMessage(message),
          message,
          ts: 123,
          userId: partnerMatrix.getUserId()!,
        },
        { address: partner.address },
      );

    const signerSpy = jest.spyOn(raiden.deps.signer, 'signMessage');

    await sleep(2 * raiden.config.pollingInterval);
    raiden.store.dispatch(messageReceivedAction);

    await sleep(2 * raiden.config.pollingInterval);
    const messageSendAction = messageSend.request(expect.anything(), expect.anything());
    expect(raiden.output).not.toContainEqual(messageSendAction);
    expect(signerSpy).toHaveBeenCalledTimes(0);
    signerSpy.mockRestore();
  });
});

test('matrixMessageGlobalSendEpic', async () => {
  expect.assertions(6);

  const raiden = await makeRaiden();
  const matrix = (await raiden.deps.matrix$.toPromise()) as jest.Mocked<MatrixClient>;
  const msgId = '123';
  const message = await signMessage(raiden.deps.signer, processed),
    text = encodeJsonMessage(message);

  raiden.store.dispatch(messageServiceSend.request({ message }, { service: Service.PFS, msgId }));

  await sleep(2 * raiden.config.pollingInterval);
  expect(matrix.sendEvent).toHaveBeenCalledTimes(1);
  expect(matrix.sendEvent).toHaveBeenCalledWith(
    expect.any(String),
    'm.room.message',
    expect.objectContaining({ body: text, msgtype: 'm.text' }),
    expect.anything(),
  );
  expect(raiden.output).toContainEqual(
    messageServiceSend.success(
      { via: expect.stringMatching(/!.*:/), tookMs: expect.any(Number), retries: 0 },
      { service: Service.PFS, msgId },
    ),
  );

  // test graceful failure
  raiden.output.splice(0, raiden.output.length);
  matrix.sendEvent.mockClear();
  matrix.sendEvent.mockRejectedValueOnce(Object.assign(new Error('Failed'), { httpStatus: 429 }));

  raiden.store.dispatch(messageServiceSend.request({ message }, { service: Service.PFS, msgId }));

  await sleep(raiden.config.httpTimeout);
  expect(matrix.sendEvent).toHaveBeenCalledTimes(2);
  expect(matrix.sendEvent).toHaveBeenCalledWith(
    expect.any(String),
    'm.room.message',
    expect.objectContaining({ body: text, msgtype: 'm.text' }),
    expect.anything(),
  );
  expect(raiden.output).toContainEqual(
    messageServiceSend.success(
      { via: expect.stringMatching(/!.*:/), tookMs: expect.any(Number), retries: 1 },
      { service: Service.PFS, msgId },
    ),
  );
});

describe('rtcConnectionManagerEpic', () => {
  let raiden: MockedRaiden, partner: MockedRaiden;
  let RTCPeerConnection: ReturnType<typeof mockRTC>;

  beforeAll(() => {
    if (!('RTCPeerConnection' in globalThis)) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      Object.assign(globalThis, require('wrtc'));
    }
  });

  beforeEach(async () => {
    // ensure clients are sorted by address
    [raiden, partner] = await makeRaidens(2);

    RTCPeerConnection = mockRTC();
    raiden.store.dispatch(raidenConfigUpdate({ caps: { [Capabilities.WEBRTC]: 1 } }));
    partner.store.dispatch(
      raidenConfigUpdate({
        caps: {
          [Capabilities.WEBRTC]: 1,
        },
      }),
    );
  });

  afterEach(() => {
    RTCPeerConnection.mockRestore();
    jest.restoreAllMocks();
  });

  test('skip if no webrtc capability exists', async () => {
    raiden.store.dispatch(raidenConfigUpdate({ caps: { [Capabilities.WEBRTC]: 0 } }));
    await ensureChannelIsOpen([raiden, partner]);
    await sleep(2 * raiden.config.pollingInterval);
    expect(raiden.output).not.toContainEqual(rtcChannel(expect.anything(), expect.anything()));
  });

  test('success: receive message & channel error', async () => {
    expect.assertions(8);

    const partnerId = (await partner.deps.matrix$.toPromise()).getUserId()!;

    const promise = raiden.deps.latest$
      .pipe(pluck('rtc', partner.address), first(isntNil))
      .toPromise();
    await ensureChannelIsOpen([raiden, partner]);

    const channel = (await promise) as MockedDataChannel;
    expect(channel).toMatchObject({ readyState: 'open' });
    expect(raiden.output).toContainEqual(
      rtcChannel(expect.objectContaining({ readyState: 'open' }), { address: partner.address }),
    );
    expect(raiden.output).toContainEqual(
      messageSend.request(
        {
          msgtype: 'm.notice',
          message: expect.stringMatching(/"type":\s*"offer"/),
          userId: partnerId,
        },
        { address: partner.address, msgId: expect.any(String) },
      ),
    );
    expect(raiden.output).toContainEqual(
      messageReceived(
        {
          msgtype: 'm.notice',
          text: expect.stringMatching(/"type":\s*"answer"/),
          userId: partnerId,
          ts: expect.any(Number),
        },
        { address: partner.address },
      ),
    );

    channel.emit('message', { data: 'hello\nworld' });
    await sleep();
    expect(raiden.output).toContainEqual(
      messageReceived(
        { text: 'hello', message: undefined, ts: expect.any(Number), userId: partnerId },
        { address: partner.address },
      ),
    );
    expect(raiden.output).toContainEqual(
      messageReceived(
        { text: 'world', message: undefined, ts: expect.any(Number), userId: partnerId },
        { address: partner.address },
      ),
    );

    channel.emit('error', { error: new Error('errored') });
    // right after erroring, channel must be cleared
    await expect(
      raiden.deps.latest$.pipe(first(), pluck('rtc', partner.address)).toPromise(),
    ).resolves.toBeUndefined();

    // erroring node should send a 'hangup' to partner
    expect(raiden.output).toContainEqual(
      messageSend.request(
        { msgtype: 'm.notice', message: expect.stringMatching(/"type":\s*"hangup"/) },
        { address: partner.address, msgId: expect.any(String) },
      ),
    );
  });
});