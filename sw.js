const CACHE_NAME = 'watson-xd-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
  'https://files.catbox.moe/3z07rr.jpg',
  'https://files.catbox.moe/29wglg.jpg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap'
];

// Install Service Worker and cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache: ' + CACHE_NAME);
      return cache.addAll(urlsToCache);
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate and clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Ensure the service worker takes control of all pages immediately
  return self.clients.claim();
});

// Fetching strategy: Cache-First for static, Network-First for API/Dynamic
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip caching for API calls to ensure fresh movie data
  if (url.href.includes('apis.davidcyriltech.my.id') || url.href.includes('moviebox.ph')) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      // If found in cache, return it
      if (response) {
        return response;
      }

      // Otherwise, fetch from network
      return fetch(event.request).then(networkResponse => {
        // Validate response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // Clone and save to cache for next time
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    }).catch(() => {
      // Fallback for SPA routing: return index.html if network fails and no cache exists
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});
