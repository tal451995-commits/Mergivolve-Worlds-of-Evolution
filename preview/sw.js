
const CACHE_NAME = 'mergivolve-v13';

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

    await Promise.all(ASSETS.map(async asset => {
      try {
        const response = await fetch(asset, { cache: 'no-store' });
        if (response.ok) {
          await cache.put(asset, response);
        }
      } catch (error) {
        // Continue installation if an asset is temporarily unavailable.
      }
    }));

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

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    try {
      const response = await fetch(request, {
        cache: 'no-store'
      });

      if (response.ok) {
        await cache.put(request, response.clone());
        return response;
      }

      const cached = await cache.match(request);
      return cached || response;
    } catch (error) {
      const cached = await cache.match(request);
      if (cached) return cached;

      if (request.mode === 'navigate') {
        const shell = await cache.match('./merge-game.html');
        if (shell) return shell;
      }

      return new Response(
        'Offline — resource unavailable in saved version.',
        { status: 503 }
      );
    }
  })());
});
