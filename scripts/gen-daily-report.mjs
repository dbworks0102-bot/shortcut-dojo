/**
 * デイリーレポート生成スクリプト
 * Usage: node scripts/gen-daily-report.mjs
 *
 * Supabase の article_views テーブルから閲覧数を取得してレポートHTMLを生成する
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root      = resolve(__dirname, '..')
const TIPS_DIR  = resolve(root, 'tips')
const PUB_FILE  = resolve(TIPS_DIR, 'published.json')
const DB_FILE   = resolve(TIPS_DIR, 'articles-db.json')

const SB_URL = 'https://gqdkhvipjcpwfzeyczxx.supabase.co'
const SB_KEY = 'sb_publishable_qIsUonaI-u-Pmg7Xn4OS6Q_oYBgzdoJ'

// ─── 日付ユーティリティ ────────────────────────────────────────────────────────
function todayJST() {
  const d = new Date(Date.now() + 9 * 60 * 60 * 1000)
  return d.toISOString().slice(0, 10)
}

function formatDate(isoDate) {
  const [y, m, d] = isoDate.split('-')
  return `${y}年${parseInt(m)}月${parseInt(d)}日`
}

// ─── Supabase からビュー数取得 ─────────────────────────────────────────────────
async function fetchSupabaseViews() {
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/article_views?select=slug,views&order=views.desc`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } }
    )
    if (!res.ok) {
      console.log(`⚠️  Supabase クエリ失敗 (${res.status}): article_views テーブルが未作成の可能性があります`)
      return null
    }
    const rows = await res.json()
    const bySlug      = Object.fromEntries(rows.map(r => [r.slug, Number(r.views)]))
    const totalAllTime = rows.reduce((s, r) => s + Number(r.views), 0)
    const topArticle   = rows[0] ?? null
    return { bySlug, totalAllTime, topArticle }
  } catch (e) {
    console.log(`⚠️  Supabase 接続エラー: ${e.message}`)
    return null
  }
}

// ─── HTML 生成 ────────────────────────────────────────────────────────────────
function generateReportHTML(sbData, publishedList, allArticles, today) {
  const artMap    = Object.fromEntries(allArticles.map(a => [a.slug, a]))
  const hasData   = sbData !== null
  const dateLabel = formatDate(today)

  const totalAllTime  = hasData ? sbData.totalAllTime.toLocaleString() : '—'
  const totalArticles = publishedList.length

  // 最も読まれた記事
  let topCard = ''
  if (hasData && sbData.topArticle) {
    const topArt = artMap[sbData.topArticle.slug]
    if (topArt) {
      topCard = `
    <div class="stat-card" style="border-top:3px solid ${topArt.gameColor}">
      <div class="label">🏆 最も読まれた記事</div>
      <div style="font-size:0.88rem;font-weight:700;margin-top:0.4rem;line-height:1.4;">${topArt.title}</div>
      <div style="font-size:0.82rem;color:#6b7280;margin-top:0.3rem;">${sbData.topArticle.views.toLocaleString()} PV</div>
    </div>`
    }
  }

  const noDataWarning = !hasData ? `
  <div style="max-width:960px;margin:0 auto;padding:0.8rem 1.5rem;">
    <div style="background:#fef3c7;border:1px solid #fbbf24;border-radius:12px;padding:1rem 1.5rem;font-size:0.82rem;color:#92400e;">
      ⚠️ <strong>Supabase 未設定：</strong>Supabase ダッシュボードで <code>article_views</code> テーブルと <code>increment_article_view</code> RPC 関数を作成してください。
    </div>
  </div>` : ''

  // 記事テーブル行
  const rows = publishedList
    .slice()
    .reverse()
    .map(p => {
      const a     = artMap[p.slug]
      if (!a) return ''
      const views = hasData ? (sbData.bySlug[p.slug] ?? 0).toLocaleString() : '—'
      return `<tr>
        <td style="padding:0.6rem 1rem;white-space:nowrap;font-size:0.75rem;color:#6b7280;">${formatDate(p.date)}</td>
        <td style="padding:0.6rem 1rem;">
          <a href="/tips/${p.slug}/" style="color:#1a1a2e;font-weight:700;font-size:0.85rem;text-decoration:none;">${a.title}</a>
        </td>
        <td style="padding:0.6rem 1rem;text-align:center;">
          <span style="background:rgba(0,0,0,0.05);border-radius:6px;padding:2px 10px;font-size:0.82rem;font-weight:700;color:${a.gameColor}">${a.icon} ${a.gameLabel}</span>
        </td>
        <td style="padding:0.6rem 1rem;text-align:right;font-weight:700;font-size:0.9rem;color:#1a1a2e;">${views}</td>
      </tr>`
    }).join('\n')

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>デイリーレポート ${dateLabel} | ショートカット道場 Tips</title>
  <meta name="robots" content="noindex">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap" rel="stylesheet">

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-SFR73HWEPN"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SFR73HWEPN');
  </script>

  <style>
    *, *::before, *::after { margin:0;padding:0;box-sizing:border-box; }
    body { font-family:'Noto Sans JP','Segoe UI',sans-serif;background:#f8f9fa;color:#1a1a2e;line-height:1.7; }
    .top-bar { height:5px;background:linear-gradient(90deg,#e63946,#f4a261,#2a9d8f,#e63946);background-size:200%;animation:shimmer 3s linear infinite; }
    @keyframes shimmer { 0%{background-position:0%} 100%{background-position:200%} }
    .nav { max-width:960px;margin:0 auto;padding:0.8rem 1.5rem;display:flex;align-items:center;gap:0.4rem;font-size:0.78rem;color:#6b7280; }
    .nav a { color:#e63946;text-decoration:none; }
    .inner { max-width:960px;margin:0 auto;padding:0 1.5rem 4rem; }
    .page-header { padding:2rem 0 1.5rem; }
    .page-header h1 { font-size:1.5rem;font-weight:900;margin-bottom:0.3rem; }
    .page-header .sub { font-size:0.82rem;color:#6b7280; }
    .cards { display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;margin-bottom:2rem; }
    .stat-card { background:#fff;border-radius:16px;padding:1.4rem;box-shadow:0 2px 8px rgba(0,0,0,0.06);border-top:3px solid #e5e7eb; }
    .stat-card .label { font-size:0.72rem;font-weight:700;letter-spacing:1px;color:#6b7280;text-transform:uppercase;margin-bottom:0.4rem; }
    .stat-card .value { font-size:2rem;font-weight:900;line-height:1.2; }
    .stat-card .unit  { font-size:0.8rem;color:#6b7280;margin-left:2px; }
    table { width:100%;border-collapse:collapse;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06); }
    thead tr { background:#f3f4f6; }
    thead th { padding:0.7rem 1rem;text-align:left;font-size:0.72rem;font-weight:700;letter-spacing:1px;color:#6b7280;text-transform:uppercase; }
    thead th:last-child { text-align:right; }
    tbody tr { border-top:1px solid rgba(0,0,0,0.06); }
    tbody tr:hover { background:#fafafa; }
    .section-title { font-size:0.85rem;font-weight:900;color:#1a1a2e;letter-spacing:0.5px;margin:1.5rem 0 0.8rem;display:flex;align-items:center;gap:0.5rem; }
    footer { text-align:center;padding:2rem;font-size:0.75rem;color:#6b7280;border-top:1px solid rgba(0,0,0,0.08);margin-top:2rem; }
    footer a { color:#6b7280;text-decoration:none; }
    @media (max-width:600px) { .inner { padding:0 1rem 3rem; } }
  </style>
</head>
<body>

<div class="top-bar"></div>

<nav class="nav">
  <a href="/">ショートカット道場</a>
  <span>›</span>
  <a href="/tips/">Tips</a>
  <span>›</span>
  <span>デイリーレポート</span>
</nav>

${noDataWarning}

<div class="inner">

  <div class="page-header">
    <h1>📊 デイリーレポート</h1>
    <div class="sub">生成日時：${dateLabel} (JST) — 記事閲覧数サマリー</div>
  </div>

  <!-- サマリーカード -->
  <div class="cards">
    <div class="stat-card" style="border-top-color:#e63946">
      <div class="label">🔢 記事合計閲覧数</div>
      <div class="value">${totalAllTime}<span class="unit">PV</span></div>
    </div>
    <div class="stat-card" style="border-top-color:#2a9d8f">
      <div class="label">📝 公開記事数</div>
      <div class="value">${totalArticles}<span class="unit">件</span></div>
    </div>
    ${topCard}
  </div>

  <!-- 記事別閲覧数 -->
  <div class="section-title">⌨️ 記事別 累計閲覧数（新着順）</div>
  <table>
    <thead>
      <tr>
        <th>公開日</th>
        <th>記事タイトル</th>
        <th>アプリ</th>
        <th style="text-align:right">累計PV</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <p style="font-size:0.75rem;color:#9ca3af;margin-top:1rem;">
    ※ データは Supabase から取得。更新は毎日 9:00 JST。
  </p>

</div>

<footer>
  © 2026 <a href="/">ショートカット道場</a> —
  <a href="/tips/">Tips一覧</a> /
  <a href="/ppt/">PPT道場</a> /
  <a href="/excel/">Excel道場</a> /
  <a href="/word/">Word道場</a> /
  <a href="/outlook/">Outlook道場</a> /
  <a href="/chrome/">Chrome道場</a> /
  <a href="/teams/">Teams道場</a> /
  <a href="/mac/">Mac道場</a>
</footer>
</body>
</html>`
}

// ─── メイン ───────────────────────────────────────────────────────────────────
const db        = JSON.parse(readFileSync(DB_FILE, 'utf8'))
const published = existsSync(PUB_FILE) ? JSON.parse(readFileSync(PUB_FILE, 'utf8')) : []
const today     = todayJST()

const sbData = await fetchSupabaseViews()

const reportDir = resolve(TIPS_DIR, 'report')
mkdirSync(reportDir, { recursive: true })

const html = generateReportHTML(sbData, published, db, today)
writeFileSync(resolve(reportDir, 'index.html'), html, 'utf8')

const totalPV = sbData ? sbData.totalAllTime.toLocaleString() : '(Supabase未設定)'
console.log(`✅  tips/report/index.html — 累計 ${totalPV} PV / ${published.length}記事`)
