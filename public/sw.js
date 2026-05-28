// =========================================================
//  sw.js — Service Worker（ショートカット道場）
//  戦略:
//   - HTML (navigate): Network-first → キャッシュフォールバック
//   - 静的アセット: Cache-first → ネットワーク取得してキャッシュ更新
// =========================================================

const CACHE_NAME    = 'shortcut-dojo-v1'
const CACHE_OFFLINE = 'shortcut-dojo-offline-v1'

// インストール時にプレキャッシュするURL
const PRECACHE_URLS = [
  '/',
  '/ppt/',
  '/favicon.svg',
  '/favicon-32.png',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/robots.txt',
  '/sitemap.xml',
]

// =========================================================
//  install — 静的リソースを事前キャッシュ
// =========================================================
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  )
})

// =========================================================
//  activate — 古いキャッシュを削除
// =========================================================
self.addEventListener('activate', event => {
  const valid = [CACHE_NAME, CACHE_OFFLINE]
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !valid.includes(k)).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  )
})

// =========================================================
//  fetch — リクエストのインターセプト
// =========================================================
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // 他オリジン（GA・Google Fonts等）はスルー
  if (url.origin !== location.origin) return

  // ── HTML ページ: Network-first ──
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
          }
          return response
        })
        .catch(() =>
          caches.match(request).then(cached => cached ?? caches.match('/'))
        )
    )
    return
  }

  // ── 静的アセット（JS / CSS / 画像 / フォント）: Cache-first ──
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) {
        // バックグラウンドで最新版を取得してキャッシュ更新（stale-while-revalidate）
        fetch(request).then(fresh => {
          if (fresh.ok) {
            caches.open(CACHE_NAME).then(cache => cache.put(request, fresh))
          }
        }).catch(() => {})
        return cached
      }

      // キャッシュになければネットワーク取得
      return fetch(request).then(response => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
        }
        return response
      })
    })
  )
})

// =========================================================
//  バージョン更新通知（オプション）
// =========================================================
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
