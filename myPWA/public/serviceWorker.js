const CACHE_NAME = "fittrack-cache-v1";
const urlsToCache = [
  "/", 
  "/index.html",
  "/css/style.css",
  "/js/index.js",
  "/images/logo.png"
];

// Install event
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Skip unsupported schemes (like chrome-extension://)
  if (url.protocol === "chrome-extension:" || url.protocol === "chrome:") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).then(networkResponse => {
          // Only cache http/https requests
          if (event.request.url.startsWith("http")) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
      );
    })
  );
});

// Activate event (cleanup old caches)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});