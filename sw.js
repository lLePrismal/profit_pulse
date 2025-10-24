/* ============================ sw.js ============================ */

// copy below into sw.js at root
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('profitpulse-cache-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).catch(()=>caches.match('/index.html'));
    })
  );
});
