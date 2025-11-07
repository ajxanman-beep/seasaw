importScripts('/z/kit/uv.bundle.js');
importScripts('/z/kit/uv.config.js');
importScripts('/z/kit/uv.sw.js');
importScripts('https://arc.io/arc-sw-core.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));
