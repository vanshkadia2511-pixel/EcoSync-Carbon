const CACHE_NAME = 'ecosync-v2';
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/activity-log',
  '/coach',
  '/challenges',
  '/leaderboard',
  '/profile',
  '/what-if',
  '/carbon-twin',
  '/manifest.json',
];

// Install: pre-cache all core routes
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: Network-first for API, Cache-first for assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip Firebase/external API calls
  if (url.hostname.includes('firebase') || url.hostname.includes('googleapis')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful GET responses
        if (event.request.method === 'GET' && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
