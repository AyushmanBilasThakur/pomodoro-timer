const CACHE_NAME = "pomodoro-v1";

const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/technique.png",
  "alarm.wav",
  "manifest.json"
];


self.addEventListener("install", (e) => {
    e.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(assets);
      })
    );
  });

  self.addEventListener("fetch", (e) => {
    e.respondWith(
      caches.match(e.request).then((res) => {
        return res || fetch(e.request);
      })
    );
  });