const DB_NAME = 'apentomos-offline'
const DB_VERSION = 1

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains('queue'))
        db.createObjectStore('queue', { keyPath: 'id', autoIncrement: true })
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function queueRequest(url: string, method: string, headers: Record<string, string>, body?: BodyInit | null) {
  const bodyStr = body instanceof FormData ? null : body ? String(body) : null
  const db = await openDB()
  const tx = db.transaction('queue', 'readwrite')
  const store = tx.objectStore('queue')
  await new Promise<void>((resolve, reject) => {
    const req = store.add({ url, method, headers, body: bodyStr, createdAt: Date.now() })
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
  if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
    const reg = await navigator.serviceWorker.ready
    const swReg = reg as ServiceWorkerRegistration & { sync: { register: (tag: string) => Promise<void> } }
    swReg.sync.register('submit-report')
  }
}
