const CACHE = 'kisanalert-v1'
const STATIC = [
  '/manifest.json',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(STATIC))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (STATIC.includes(url.pathname)) {
    event.respondWith(caches.match(request))
    return
  }

  if (url.origin === location.origin) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    )
  }
})
