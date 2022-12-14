var GHPATH = "/kid-musical-instruments";
var APP_PREFIX = "music_instru_";
var VERSION = "version_002";
var URLS = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/css/styles.css`,
  `${GHPATH}/img/icon.jpg`,
  `${GHPATH}/media/accordion.mp3`,
  `${GHPATH}/media/contrabass.mp3`,
  `${GHPATH}/media/cymbal.mp3`,
  `${GHPATH}/media/drums.mp3`,
  `${GHPATH}/media/flute.mp3`,
  `${GHPATH}/media/guitar.mp3`,
  `${GHPATH}/media/piano.mp3`,
  `${GHPATH}/media/trumpet.mp3`,
  `${GHPATH}/media/violin.mp3`,
];

var CACHE_NAME = APP_PREFIX + VERSION;
self.addEventListener("fetch", function (e) {
  console.log("Fetch request : " + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        console.log("Responding with cache : " + e.request.url);
        return request;
      } else {
        console.log("File is not cached, fetching : " + e.request.url);
        return fetch(e.request);
      }
    })
  );
});

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Installing cache : " + CACHE_NAME);
      return cache.addAll(URLS);
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheWhitelist.indexOf(key) === -1) {
            console.log("Deleting cache : " + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});
