const CACHE = 'kisanalert-v2'
const OFFLINE_URL = '/offline.html'
const DB_NAME = 'kisanalert-offline'
const DB_VERSION = 1
const PUSH_PUBLIC_KEY = 'BEyRqiEDbkucm9Uw9yd3bGUqTOI1DbS_athnQpx489WSRcfx38hJ_Q1eVJPpMGnJa2-MQwAoEsaWg7lNZiwdu-M'

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
          fetch(url).then((res) => { if (res.ok) cache.put(url, res) }).catch(() => {})
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
  if (url.pathname.startsWith('/_next/static/')) { event.respondWith(cacheFirst(request)); return }
  if (STATIC_ASSETS.includes(url.pathname)) { event.respondWith(cacheFirst(request)); return }
  if (request.mode === 'navigate') { event.respondWith(networkFirstNav(request)); return }
  event.respondWith(networkFirst(request))
})

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return
  let data
  try { data = event.data.json() } catch { data = { title: 'KisanAlert', body: event.data.text() } }
  const title = data.title || 'KisanAlert'
  const options = {
    body: data.body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: { url: data.url || '/' },
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/'
  event.waitUntil(clients.openWindow(url))
})

self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(
    self.registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: PUSH_PUBLIC_KEY })
      .then((subscription) => {
        fetch('/api/push/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(subscription.toJSON()) })
      })
  )
})

// Background sync for offline submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'submit-report') {
    event.waitUntil(processQueue())
  }
})

async function processQueue() {
  const db = await openDB()
  const tx = db.transaction('queue', 'readwrite')
  const store = tx.objectStore('queue')
  const all = await store.getAll()
  for (const item of all) {
    try {
      const res = await fetch(item.url, { method: item.method, headers: item.headers, body: item.body })
      if (res.ok) await store.delete(item.id)
    } catch { /* will retry on next sync */ }
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains('queue')) {
        db.createObjectStore('queue', { keyPath: 'id', autoIncrement: true })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  try {
    const res = await fetch(request)
    if (res.ok) { const cache = await caches.open(CACHE); cache.put(request, res.clone()) }
    return res
  } catch { return caches.match(request) }
}

async function networkFirst(request) {
  try {
    const res = await fetch(request)
    if (res.ok) { const cache = await caches.open(CACHE); cache.put(request, res.clone()) }
    return res
  } catch { return (await caches.match(request)) || new Response('Offline', { status: 503 }) }
}

async function networkFirstNav(request) {
  try {
    const res = await fetch(request)
    if (res.ok) { const cache = await caches.open(CACHE); cache.put(request, res.clone()) }
    return res
  } catch {
    const cached = await caches.match(request)
    if (cached) return cached
    return (await caches.match(OFFLINE_URL)) || new Response('Offline', { status: 503 })
  }
}
