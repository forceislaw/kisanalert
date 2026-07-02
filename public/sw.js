const CACHE = 'kisanalert-v2'
const OFFLINE_URL = '/offline.html'

const STATIC_ASSETS = [
  '/manifest.json',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png',
  OFFLINE_URL,
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll(STATIC_ASSETS).catch(() => {
        STATIC_ASSETS.forEach((url) => {
          fetch(url)
            .then((res) => { if (res.ok) cache.put(url, res) })
            .catch(() => {})
        })
      })
    )
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

  if (url.origin !== location.origin) return

  // Static JS/CSS bundles — cache-first (immutable hashed files)
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request))
    return
  }

  // Static assets — cache-first
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(cacheFirst(request))
    return
  }

  // Navigation requests — network-first with fallback
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNav(request))
    return
  }

  // Everything else — network-first
  event.respondWith(networkFirst(request))
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  try {
    const res = await fetch(request)
    if (res.ok) {
      const cache = await caches.open(CACHE)
      cache.put(request, res.clone())
    }
    return res
  } catch {
    return caches.match(request)
  }
}

async function networkFirst(request) {
  try {
    const res = await fetch(request)
    if (res.ok) {
      const cache = await caches.open(CACHE)
      cache.put(request, res.clone())
    }
    return res
  } catch {
    const cached = await caches.match(request)
    return cached || new Response('Offline', { status: 503 })
  }
}

async function networkFirstNav(request) {
  try {
    const res = await fetch(request)
    if (res.ok) {
      const cache = await caches.open(CACHE)
      cache.put(request, res.clone())
    }
    return res
  } catch {
    const cached = await caches.match(request)
    if (cached) return cached
    const offline = await caches.match(OFFLINE_URL)
    return offline || new Response('Offline', { status: 503 })
  }
}
