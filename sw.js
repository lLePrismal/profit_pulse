* ========================= sw.js (Service Worker) ========================= */

/*
Copy the content below into a separate file named sw.js and place it at the web root.
*/

// sw.js
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('metricmaster-cache-v1').then(function(cache) {
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
      return response || fetch(event.request).catch(()=>{
        // fallback for offline - returns cached index
        return caches.match('/index.html');
      });
    })
  );
});
