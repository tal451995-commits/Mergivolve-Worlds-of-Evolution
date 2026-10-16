
const CACHE_NAME = 'mergivolve-v9';

const ASSETS = [
  './',
  './index.html',
  './merge-game.html',
  './manifest.json',
  './icon-192-1.png',
  './icon-512-1.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    for (const asset of ASSETS) {
      const response = await fetch(asset, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to cache ${asset}: ${response.status}`);
      }
      await cache.put(asset, response);
    }

    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter(key =>
          key.startsWith('mergivolve-') &&
          key !== CACHE_NAME
        )
        .map(key => caches.delete(key))
    );

    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin
  ) {
    return;
  }

  if (
    url.pathname.endsWith('/manifest.json') ||
    url.pathname.endsWith('/sw.js')
  ) {
    event.respondWith(fetch(request, { cache: 'no-store' }));
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    if (cached) return cached;

    return fetch(request);
  })());
});
