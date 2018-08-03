let log = console.log.bind(console);
let err = console.error.bind(console);

let version = '1';
let cacheName = 'pwa-client-v' + version;
let dataCacheName = 'pwa-client-data-v' + version;
let appShellFilesToCache = [
	'./',
	'./index.html',
	// './inline.bundle.js',
	// './polyfills.bundle.js',
	// './styles.bundle.js',
	// './vendor.bundle.js',
	// './main.bundle.js',
	'./manifest.json'
];

self.addEventListener('install', (ev) => {
	ev.waitUntil(self.skipWaiting());
	log('Service Worker: Installed');

	ev.waitUntil(
		caches.open(cacheName).then((cache) => {
			log('Service Worker: Caching App Shell');
			return cache.addAll(appShellFilesToCache);
		})
	);
});

self.addEventListener('activate', (ev) => {
	ev.waitUntil(self.clients.claim());
	log('Service Worker: Active');

	ev.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(keyList.map((key) => {
				if (key !== cacheName) {
					log('Service Worker: Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener('fetch', (e) => {
	log('Service Worker: Fetch URL ', e.request.url);

	// Match requests for data and handle them separately
	e.respondWith(
		caches.match(e.request.clone()).then((response) => {
			return response || fetch(e.request.clone()).then((r2) => {
				return caches.open(dataCacheName).then((cache) => {
					console.log('Service Worker: Fetched & Cached URL ', e.request.url);
					cache.put(e.request.url, r2.clone());
					return r2.clone();
				});
			});
		})
	);
});
