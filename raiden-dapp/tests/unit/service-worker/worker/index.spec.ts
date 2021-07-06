import {
  MockedCache,
  MockedCacheStorage,
  MockedClient,
  MockedClients,
  MockedExtendableEvent,
  MockedFetchEvent,
  MockedIDBFactory,
  MockedIDBObjectStore,
  MockedMessageEvent,
  MockedRegistration,
  MockedRequest,
  mockEnvironmentForServiceWorker,
} from '../../utils/mocks';

async function installServiceWorker(context: EventTarget): Promise<void> {
  require('@/service-worker/worker');

  const installEvent = new MockedExtendableEvent('install');
  context.dispatchEvent(installEvent);
  await installEvent.waitToFinish();
}

async function activateServiceWorker(context: EventTarget): Promise<void> {
  const activateEvent = new MockedExtendableEvent('activate');
  context.dispatchEvent(activateEvent);
  await activateEvent.waitToFinish();
}

async function installAndActivateServiceWorker(context: EventTarget): Promise<void> {
  await installServiceWorker(context);
  await activateServiceWorker(context);
}

async function sendMessageToServiceWorker(
  context: EventTarget,
  data: string,
  installServiceWorker = true,
): Promise<void> {
  if (installServiceWorker) {
    await installAndActivateServiceWorker(context);
  }

  jest.clearAllMocks(); // Forget recorded data of previous installation and activation steps.
  const messageEvent = new MockedMessageEvent('message', data);
  context.dispatchEvent(messageEvent);
  await messageEvent.waitToFinish();
}

async function fetchUrlViaServiceWorker(
  context: EventTarget,
  url: string,
  installServiceWorker = true,
): Promise<MockedFetchEvent> {
  if (installServiceWorker) {
    await installAndActivateServiceWorker(context);
  }

  jest.clearAllMocks(); // Forget recorded data of previous installation and activation steps.
  const fetchEvent = new MockedFetchEvent('fetch', url);
  context.dispatchEvent(fetchEvent);
  await fetchEvent.waitToFinish();
  await new Promise((resolve) => setTimeout(resolve, 50)); // For some rason this is necessary...
  return fetchEvent;
}

describe('service worker index', () => {
  beforeEach(() => {
    jest.resetModules(); // Required so that the service worker script does not get cached.
    jest.restoreAllMocks();
  });

  describe('installation and activation phases', () => {
    test('saves manifest entries to cache if cache and database are empty', async () => {
      const cache = new MockedCache([]);
      const indexedDB = new MockedIDBFactory();
      const manifest = [{ url: 'https://test.tld/asset', revision: '1' }];
      const context = mockEnvironmentForServiceWorker({ cache, indexedDB, manifest });

      await installServiceWorker(context);

      expect(cache.put).toHaveBeenCalledTimes(1);
      expect(cache.put.mock.calls.map((call) => call[0].url)).toEqual([
        'https://test.tld/asset?__WB_REVISION__=1',
      ]);
    });

    test('saves manifest to database if cache and database are empty', async () => {
      const cache = new MockedCache([]);
      const objectStore = new MockedIDBObjectStore();
      const manifest = [{ url: 'https://test.tld/asset', revision: '1' }];
      const context = mockEnvironmentForServiceWorker({ cache, objectStore, manifest });

      await installAndActivateServiceWorker(context);

      expect(objectStore.put).toHaveBeenCalledTimes(1);
      expect(objectStore.put).toHaveBeenLastCalledWith(
        [{ url: 'https://test.tld/asset', revision: '1' }],
        'precacheEntries',
      );
    });

    test('takes over previous cache if finding manifest in database', async () => {
      const cache = new MockedCache(['https://test.tld/old-asset']);
      const objectStore = new MockedIDBObjectStore('precacheEntries', [
        { url: 'https://test.tld/old-asset' },
      ]);
      const context = mockEnvironmentForServiceWorker({ cache, objectStore });

      await installAndActivateServiceWorker(context);

      expect(cache.put).not.toHaveBeenCalled();
      expect(objectStore.put).not.toHaveBeenCalled();
    });

    test('sends window reload message after activation', async () => {
      const client = new MockedClient();
      const context = mockEnvironmentForServiceWorker({ client });

      await installServiceWorker(context);
      expect(client.postMessage).not.toHaveBeenCalled();

      await activateServiceWorker(context);
      expect(client.postMessage).toHaveBeenCalledTimes(1);
      expect(client.postMessage).toHaveBeenLastCalledWith('reload_window', undefined);
    });

    test('takes control of all clients when getting activated', async () => {
      const clients = new MockedClients();
      const context = mockEnvironmentForServiceWorker({ clients });

      await installServiceWorker(context);
      expect(clients.claim).not.toHaveBeenCalled();

      await activateServiceWorker(context);
      expect(clients.claim).toHaveBeenCalledTimes(1);
    });

    test('sends installation error message to clients if cache exists but no database', async () => {
      const cache = new MockedCache(['https://test.tls/asset']);
      const client = new MockedClient();
      const indexedDB = new MockedIDBFactory();
      const context = mockEnvironmentForServiceWorker({ cache, client, indexedDB });

      await installAndActivateServiceWorker(context);

      expect(client.postMessage).toHaveBeenCalledTimes(1);
      expect(client.postMessage).toHaveBeenLastCalledWith(
        'installation_error',
        new Error('Cache given, but precache entries are missing!'),
      );
    });
  });

  describe('acts on fetch requests of client', () => {
    test('replies with cached responses for requests in manifest', async () => {
      const manifest = [{ url: 'https://test.tld/asset', revision: '1' }];
      const context = mockEnvironmentForServiceWorker({ manifest });

      const fetchEvent = await fetchUrlViaServiceWorker(context, 'https://test.tld/asset');

      expect(fetchEvent.respondWith).toHaveBeenCalledTimes(1);
      expect(fetchEvent.respondWith).toHaveBeenLastCalledWith(expect.any(Object));
    });

    test('ignores requests not in manifest', async () => {
      const manifest = [{ url: 'https://test.tld/asset', revision: '1' }];
      const context = mockEnvironmentForServiceWorker({ manifest });

      const fetchEvent = await fetchUrlViaServiceWorker(context, 'https://something-else.tld');

      expect(fetchEvent.respondWith).not.toHaveBeenCalled();
    });

    test('can serve from cache of old version', async () => {
      const cache = new MockedCache(['https://test.tld/old-asset']);
      const objectStore = new MockedIDBObjectStore('precacheEntries', [
        { url: 'https://test.tld/old-asset' },
      ]);
      const manifest = [{ url: 'https://test.tld/new-asset', revision: '1' }];
      const context = mockEnvironmentForServiceWorker({ cache, objectStore, manifest });

      let fetchEvent = await fetchUrlViaServiceWorker(context, 'https://test.tld/old-asset');
      expect(fetchEvent.respondWith).toHaveBeenCalledTimes(1);
      expect(fetchEvent.respondWith).toHaveBeenLastCalledWith(expect.any(Object));

      fetchEvent = await fetchUrlViaServiceWorker(context, 'https://test.tld/new-asset');
      expect(fetchEvent.respondWith).not.toHaveBeenCalled();
    });
  });

  describe('on update message', () => {
    test('deletes cache for current version', async () => {
      const caches = new MockedCacheStorage();
      const context = mockEnvironmentForServiceWorker({ caches });

      await sendMessageToServiceWorker(context, 'update');

      expect(caches.delete).toHaveBeenCalledTimes(1);
      expect(caches.delete).toHaveBeenLastCalledWith('workbox-precache-v2');
    });

    test('deletes database precache-entries', async () => {
      const objectStore = new MockedIDBObjectStore('precacheEntries', []);
      const context = mockEnvironmentForServiceWorker({ objectStore });

      await sendMessageToServiceWorker(context, 'update');

      expect(objectStore.delete).toHaveBeenCalledTimes(1);
      expect(objectStore.delete).toHaveBeenLastCalledWith('precacheEntries');
    });

    test('unregisters itself', async () => {
      const registration = new MockedRegistration();
      const context = mockEnvironmentForServiceWorker({ registration });

      await sendMessageToServiceWorker(context, 'update');

      expect(registration.unregister).toHaveBeenCalledTimes(1);
    });

    test('sends window reload message', async () => {
      const client = new MockedClient();
      const context = mockEnvironmentForServiceWorker({ client });

      await sendMessageToServiceWorker(context, 'update');

      expect(client.postMessage).toHaveBeenCalledTimes(1);
      expect(client.postMessage).toHaveBeenLastCalledWith('reload_window', undefined);
    });
  });

  describe('on verify cache message', () => {
    test('sends cache is invalid message if cache is missing', async () => {
      const caches = new MockedCacheStorage();
      const client = new MockedClient();
      const context = mockEnvironmentForServiceWorker({ caches, client });
      await installAndActivateServiceWorker(context);

      await caches.delete('workbox-precache-v2');
      await sendMessageToServiceWorker(context, 'verify_cache', false);

      expect(client.postMessage).toHaveBeenCalledTimes(1);
      expect(client.postMessage).toHaveBeenLastCalledWith('cache_is_invalid', undefined);
    });

    test('sends cache is invalid message if cache does not exist', async () => {
      const caches = new MockedCacheStorage();
      const client = new MockedClient();
      const context = mockEnvironmentForServiceWorker({ caches, client });
      await installAndActivateServiceWorker(context);

      await caches.delete('workbox-precache-v2');
      await sendMessageToServiceWorker(context, 'verify_cache', false);

      expect(client.postMessage).toHaveBeenCalledTimes(1);
      expect(client.postMessage).toHaveBeenLastCalledWith('cache_is_invalid', undefined);
    });

    test('sends cache is invalid message if cache is missing an entry', async () => {
      const cache = new MockedCache();
      const client = new MockedClient();
      const manifest = [
        { url: 'https://test.tld/asset-one', revision: '1' },
        { url: 'https://test.tld/asset-two', revision: '1' },
      ];
      const context = mockEnvironmentForServiceWorker({ cache, client, manifest });
      await installAndActivateServiceWorker(context);

      await cache.delete(new MockedRequest('https://test.tld/asset-one?__WB_REVISION__=1'));
      await sendMessageToServiceWorker(context, 'verify_cache', false);

      expect(client.postMessage).toHaveBeenCalledTimes(1);
      expect(client.postMessage).toHaveBeenLastCalledWith('cache_is_invalid', undefined);
    });
  });

  describe('on routing errors', () => {
    test('sends cache is invalid message if detecting invalid cache and a client is available', async () => {
      const client = new MockedClient();
      const cache = new MockedCache();
      const manifest = [{ url: 'https://test.tld/asset', revision: '1' }];
      const context = mockEnvironmentForServiceWorker({ client, cache, manifest });
      await installAndActivateServiceWorker(context);

      await cache.delete(new MockedRequest('https://test.tld/asset?__WB_REVISION__=1'));
      await fetchUrlViaServiceWorker(context, 'https://test.tld/asset', false);

      expect(client.postMessage).toHaveBeenCalledTimes(1);
      expect(client.postMessage).toHaveBeenLastCalledWith('cache_is_invalid', undefined);
    });

    test('initates update if detecting invalid cache and no client is available', async () => {
      const cache = new MockedCache();
      const caches = new MockedCacheStorage('workbox-precache-v2', cache);
      const clients = new MockedClients([]);
      const objectStore = new MockedIDBObjectStore('precacheEntries', []);
      const registration = new MockedRegistration();
      const manifest = [{ url: 'https://test.tld/asset', revision: '1' }];
      const context = mockEnvironmentForServiceWorker({
        caches,
        clients,
        objectStore,
        registration,
        manifest,
      });
      await installAndActivateServiceWorker(context);

      await cache.delete(new MockedRequest('https://test.tld/asset?__WB_REVISION__=1'));
      await fetchUrlViaServiceWorker(context, 'https://test.tld/asset', false);

      // Only check some basics of absolute required actions. We have detailed
      // tests for full updates.
      expect(caches.delete).toHaveBeenCalledTimes(1);
      expect(caches.delete).toHaveBeenLastCalledWith('workbox-precache-v2');
      expect(objectStore.delete).toHaveBeenCalledTimes(1);
      expect(objectStore.delete).toHaveBeenLastCalledWith('precacheEntries');
      expect(registration.unregister).toHaveBeenCalledTimes(1);
    });
  });
});