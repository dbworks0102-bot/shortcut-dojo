/**
 * 毎日2記事生成スクリプト
 * Usage: node scripts/gen-daily-articles.mjs
 *
 * - tips/articles-db.json から未公開の記事を2件選ぶ
 * - tips/[slug]/index.html を生成
 * - tips/index.html（一覧ページ）を更新
 * - tips/published.json を更新
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { generateKeyboardSVG, generateKeyBadgesHTML } from './keyboard-svg.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root      = resolve(__dirname, '..')
const TIPS_DIR  = resolve(root, 'tips')
const PUB_FILE  = resolve(TIPS_DIR, 'published.json')
const DB_FILE   = resolve(TIPS_DIR, 'articles-db.json')

// ─── 公開状態の読み書き ────────────────────────────────────────────────────────
function loadPublished() {
  if (!existsSync(PUB_FILE)) return []
  return JSON.parse(readFileSync(PUB_FILE, 'utf8'))
}

function savePublished(list) {
  writeFileSync(PUB_FILE, JSON.stringify(list, null, 2), 'utf8')
}

// ─── 今日の日付 ───────────────────────────────────────────────────────────────
function todayJST() {
  const d = new Date(Date.now() + 9 * 60 * 60 * 1000)
  return d.toISOString().slice(0, 10)  // YYYY-MM-DD
}

function formatDate(isoDate) {
  const [y, m, d] = isoDate.split('-')
  return `${y}年${parseInt(m)}月${parseInt(d)}日`
}

// ─── 記事 HTML 生成 ───────────────────────────────────────────────────────────
function generateArticleHTML(art, publishedDate) {
  const kbSVG       = generateKeyboardSVG(art.keys)
  const keyBadges   = generateKeyBadgesHTML(art.keys)
  const keysDisplay = art.keys.join('+')
  const dateLabel   = formatDate(publishedDate)

  const relatedRows = art.related.map(r =>
    `<tr>
      <td style="padding:0.5rem 1rem;vertical-align:middle;">${generateKeyBadgesHTML(r.keys)}</td>
      <td style="padding:0.5rem 1rem;color:#374151;">${r.op}</td>
    </tr>`
  ).join('\n')

  const usageItems = art.usage.map((u, i) =>
    `<li style="margin-bottom:0.7rem"><span style="font-weight:700;color:${art.gameColor};margin-right:0.5rem">${i+1}.</span>${u}</li>`
  ).join('\n')

  const tipsItems = art.tips.map(t =>
    `<li style="margin-bottom:0.5rem;padding-left:1.2rem;position:relative">
      <span style="position:absolute;left:0;color:${art.gameColor}">✓</span>${t}
    </li>`
  ).join('\n')

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${art.title} | ショートカット道場</title>
  <meta name="description" content="${art.lead}">
  <meta name="keywords" content="${art.game},${art.op},ショートカットキー,${keysDisplay},使い方,効果,${art.gameLabel}">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="${art.gameColor}">
  <link rel="canonical" href="https://shortcut-dojo.com/tips/${art.slug}/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">

  <!-- OGP -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://shortcut-dojo.com/tips/${art.slug}/">
  <meta property="og:title" content="${art.title}">
  <meta property="og:description" content="${art.lead}">
  <meta property="og:image" content="https://shortcut-dojo.com/${art.game}/ogp.png">
  <meta property="og:locale" content="ja_JP">
  <meta property="og:site_name" content="ショートカット道場">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${art.title}">
  <meta name="twitter:description" content="${art.lead}">
  <meta name="twitter:image" content="https://shortcut-dojo.com/${art.game}/ogp.png">
  <meta property="article:published_time" content="${publishedDate}">

  <!-- JSON-LD -->
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "${art.title}",
  "description": "${art.lead}",
  "url": "https://shortcut-dojo.com/tips/${art.slug}/",
  "datePublished": "${publishedDate}",
  "inLanguage": "ja",
  "isPartOf": {
    "@type": "WebSite",
    "name": "ショートカット道場",
    "url": "https://shortcut-dojo.com/"
  },
  "step": ${JSON.stringify(art.usage.map((u, i) => ({
    "@type": "HowToStep",
    "position": i + 1,
    "text": u
  })))}
}
  </script>

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-SFR73HWEPN"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SFR73HWEPN');
  </script>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');
    *, *::before, *::after { margin:0;padding:0;box-sizing:border-box; }
    :root {
      --color:  ${art.gameColor};
      --colorL: ${art.gameColorL};
      --muted:  #6b7280;
      --border: rgba(0,0,0,0.08);
    }
    body { font-family:'Noto Sans JP','Segoe UI',sans-serif; background:#fff; color:#1a1a2e; line-height:1.75; }
    .top-bar { height:5px; background:linear-gradient(90deg,var(--color),color-mix(in srgb,var(--color) 60%,white),var(--color)); }
    .nav { max-width:800px;margin:0 auto;padding:0.8rem 1.5rem;display:flex;align-items:center;gap:0.4rem;font-size:0.78rem;color:var(--muted); }
    .nav a { color:var(--color);text-decoration:none; }
    .nav a:hover { text-decoration:underline; }
    .nav-sep { color:rgba(0,0,0,0.25); }
    .hero { background:var(--colorL);border-bottom:1px solid var(--border);padding:2rem 1.5rem; }
    .hero-inner { max-width:800px;margin:0 auto; }
    .hero-badge { display:inline-block;background:var(--color);color:#fff;font-size:0.7rem;font-weight:700;letter-spacing:1px;padding:3px 14px;border-radius:50px;margin-bottom:0.8rem; }
    .hero-date { font-size:0.75rem;color:var(--muted);margin-bottom:0.5rem; }
    h1 { font-size:clamp(1.3rem,3.5vw,1.8rem);font-weight:900;line-height:1.4;margin-bottom:0.8rem; }
    .hero-lead { font-size:0.95rem;color:#374151;max-width:680px;margin-bottom:1.2rem; }
    .keys-hero { display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem; }
    .keys-hero .lv-badge { font-size:0.68rem;font-weight:700;padding:2px 12px;border-radius:50px; }
    article { max-width:800px;margin:0 auto;padding:0 1.5rem 4rem; }
    .section { margin-top:2.5rem; }
    .section h2 { font-size:1.05rem;font-weight:900;color:#1a1a2e;padding-bottom:0.5rem;border-bottom:2px solid var(--colorL);margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem; }
    .section h2 .icon { font-size:1.1rem; }
    p { font-size:0.92rem;color:#374151;margin-bottom:0.8rem; }
    ul { font-size:0.92rem;color:#374151;list-style:none;padding:0; }
    .time-compare { display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:0.5rem; }
    .time-box { border-radius:12px;padding:1rem 1.2rem; }
    .time-box.before { background:#fef2f2;border:1px solid #fecaca; }
    .time-box.after  { background:#f0fdf4;border:1px solid #bbf7d0; }
    .time-label { font-size:0.7rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:0.4rem; }
    .time-box.before .time-label { color:#ef4444; }
    .time-box.after  .time-label { color:#22c55e; }
    .time-value { font-size:0.9rem;font-weight:700;color:#1a1a2e; }
    .time-saving-badge { margin-top:1rem;background:var(--colorL);border-radius:12px;padding:0.8rem 1.2rem;font-size:0.88rem;color:#1a1a2e;border-left:4px solid var(--color); }
    .keyboard-wrap { margin:1rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch; }
    .keyboard-wrap svg { max-width:100%;height:auto; }
    .keyboard-caption { font-size:0.75rem;color:var(--muted);text-align:center;margin-top:0.4rem; }
    table { width:100%;border-collapse:collapse;font-size:0.88rem; }
    tbody tr { border-bottom:1px solid var(--border); }
    tbody tr:last-child { border-bottom:none; }
    .cta-box { text-align:center;margin-top:3rem;padding:2rem;background:var(--colorL);border-radius:20px; }
    .cta-box p { color:var(--muted);font-size:0.85rem;margin-bottom:1rem; }
    .cta-btn { display:inline-block;background:var(--color);color:#fff;font-size:1rem;font-weight:900;padding:0.75rem 2.2rem;border-radius:50px;text-decoration:none;box-shadow:0 6px 20px color-mix(in srgb,var(--color) 40%,transparent);transition:transform 0.2s,box-shadow 0.2s; }
    .cta-btn:hover { transform:translateY(-2px); }
    .back-link { display:inline-block;margin-top:2rem;color:var(--color);text-decoration:none;font-size:0.88rem;font-weight:700; }
    .back-link:hover { text-decoration:underline; }
    footer { text-align:center;padding:2rem 1rem;font-size:0.78rem;color:var(--muted);border-top:1px solid var(--border);margin-top:2rem; }
    footer a { color:var(--muted);text-decoration:none; }
    @media (max-width:520px) {
      .time-compare { grid-template-columns:1fr; }
      article { padding:0 1rem 3rem; }
    }
  </style>
</head>
<body>

<div class="top-bar"></div>

<nav class="nav" aria-label="パンくずリスト">
  <a href="/">ショートカット道場</a>
  <span class="nav-sep">›</span>
  <a href="/tips/">ショートカット活用Tips</a>
  <span class="nav-sep">›</span>
  <span>${art.op}</span>
</nav>

<div class="hero">
  <div class="hero-inner">
    <div class="hero-badge">${art.icon} ${art.gameLabel}</div>
    <div class="hero-date">🗓 ${dateLabel}公開</div>
    <h1>${art.title}</h1>
    <p class="hero-lead">${art.lead}</p>
    <div class="keys-hero">
      <span style="font-size:0.88rem;font-weight:700;color:var(--muted)">ショートカット：</span>
      ${keyBadges}
    </div>
  </div>
</div>

<article>

  <!-- キーボード画像 -->
  <div class="section">
    <h2><span class="icon">⌨️</span> 使用するキーの位置</h2>
    <div class="keyboard-wrap">
      ${kbSVG}
    </div>
    <p class="keyboard-caption">赤くハイライトされたキーが「${art.op}」のショートカットです（${keysDisplay}）</p>
  </div>

  <!-- 使い方 -->
  <div class="section">
    <h2><span class="icon">📖</span> 使い方</h2>
    <ol style="list-style:none;padding:0;">
      ${usageItems}
    </ol>
  </div>

  <!-- 効果 -->
  <div class="section">
    <h2><span class="icon">✨</span> 効果</h2>
    <p>${art.effect}</p>
  </div>

  <!-- 時間比較 -->
  <div class="section">
    <h2><span class="icon">⏱</span> 使う前と後での所要時間の違い</h2>
    <div class="time-compare">
      <div class="time-box before">
        <div class="time-label">🖱 使う前（マウス操作）</div>
        <div class="time-value">${art.timeBefore}</div>
      </div>
      <div class="time-box after">
        <div class="time-label">⌨️ 使った後（ショートカット）</div>
        <div class="time-value">${art.timeAfter}</div>
      </div>
    </div>
    <div class="time-saving-badge">
      💡 <strong>時短効果：</strong>${art.timeSaving}
    </div>
  </div>

  <!-- 覚え方・豆知識 -->
  <div class="section">
    <h2><span class="icon">💡</span> 覚え方のコツ・豆知識</h2>
    <ul>
      ${tipsItems}
    </ul>
  </div>

  <!-- 関連ショートカット -->
  <div class="section">
    <h2><span class="icon">🔗</span> 合わせて覚えたい関連ショートカット</h2>
    <table>
      <tbody>
        ${relatedRows}
      </tbody>
    </table>
  </div>

  <!-- CTA -->
  <div class="cta-box">
    <p><strong>${art.op}</strong>を含む全ショートカットを4択クイズで練習しよう！</p>
    <a href="/${art.game}/" class="cta-btn">${art.icon} ${art.gameLabel}でゲーム練習する →</a>
  </div>

  <a href="/tips/" class="back-link">← ショートカット活用Tips 一覧に戻る</a>

</article>

<footer>
  © 2026 <a href="/">ショートカット道場</a> —
  <a href="/ppt/">PPT道場</a> /
  <a href="/excel/">Excel道場</a> /
  <a href="/word/">Word道場</a> /
  <a href="/outlook/">Outlook道場</a> /
  <a href="/chrome/">Chrome道場</a> /
  <a href="/teams/">Teams道場</a> /
  <a href="/mac/">Mac道場</a> /
  <a href="/tips/">Tips一覧</a>
</footer>
<script>
  fetch('https://gqdkhvipjcpwfzeyczxx.supabase.co/rest/v1/rpc/increment_article_view', {
    method: 'POST',
    headers: { 'apikey': 'sb_publishable_qIsUonaI-u-Pmg7Xn4OS6Q_oYBgzdoJ', 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_slug: '${art.slug}' })
  })
</script>
</body>
</html>`
}

// ─── 一覧ページ生成 ───────────────────────────────────────────────────────────
function generateIndexHTML(publishedList, allArticles) {
  const artMap = Object.fromEntries(allArticles.map(a => [a.id, a]))

  const cards = publishedList
    .slice()
    .reverse()
    .map(p => {
      const a = artMap[p.id]
      if (!a) return ''
      const keysDisplay = a.keys.join('+')
      return `      <a href="/tips/${a.slug}/" class="tip-card" style="--c:${a.gameColor}">
        <div class="tip-card-badge">${a.icon} ${a.gameLabel}</div>
        <h2 class="tip-card-title">${a.title}</h2>
        <div class="tip-card-keys">${keysDisplay}</div>
        <div class="tip-card-lead">${a.lead.slice(0, 60)}…</div>
        <div class="tip-card-date">🗓 ${formatDate(p.date)}</div>
      </a>`
    }).join('\n')

  const total = publishedList.length

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ショートカットキー 活用Tips一覧 | ショートカット道場</title>
  <meta name="description" content="PowerPoint・Excel・Word・Outlook・Chrome・Teams・MacのショートカットキーをTips形式で解説。使い方・効果・時短効果・キーボード図付きで毎日2記事更新。">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#1a1a2e">
  <link rel="canonical" href="https://shortcut-dojo.com/tips/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://shortcut-dojo.com/tips/">
  <meta property="og:title" content="ショートカットキー 活用Tips一覧 | ショートカット道場">
  <meta property="og:description" content="PowerPoint・Excel・Word・Outlook・Chrome・Teams・MacのショートカットキーをTips形式で解説。毎日2記事更新。">
  <meta property="og:image" content="https://shortcut-dojo.com/ogp.png">
  <meta property="og:locale" content="ja_JP">
  <meta property="og:site_name" content="ショートカット道場">

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-SFR73HWEPN"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SFR73HWEPN');
  </script>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');
    *, *::before, *::after { margin:0;padding:0;box-sizing:border-box; }
    body { font-family:'Noto Sans JP','Segoe UI',sans-serif;background:#fff;color:#1a1a2e;line-height:1.7; }
    .top-bar { height:5px;background:linear-gradient(90deg,#e63946,#f4a261,#2a9d8f,#e63946);background-size:200% 100%;animation:shimmer 3s linear infinite; }
    @keyframes shimmer { 0%{background-position:0%} 100%{background-position:200%} }
    .nav { max-width:960px;margin:0 auto;padding:0.8rem 1.5rem;display:flex;align-items:center;gap:0.4rem;font-size:0.78rem;color:#6b7280; }
    .nav a { color:#e63946;text-decoration:none; }
    .nav a:hover { text-decoration:underline; }
    header { max-width:960px;margin:0 auto;padding:2.5rem 1.5rem 2rem;text-align:center; }
    header h1 { font-size:clamp(1.5rem,4vw,2.2rem);font-weight:900;margin-bottom:0.6rem; }
    header p { font-size:0.92rem;color:#6b7280;max-width:600px;margin:0 auto 1.2rem; }
    .update-badge { display:inline-block;background:#fef3c7;color:#92400e;font-size:0.75rem;font-weight:700;padding:3px 14px;border-radius:50px;margin-bottom:1rem; }
    .stats { display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap;margin-top:0.5rem; }
    .stats span { font-size:0.82rem;color:#6b7280; }
    .stats strong { color:#1a1a2e;font-weight:900; }
    main { max-width:960px;margin:0 auto;padding:0 1.5rem 4rem; }
    .grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.2rem;margin-top:2rem; }
    .tip-card { display:block;border:1px solid rgba(0,0,0,0.08);border-radius:16px;padding:1.4rem;text-decoration:none;color:inherit;transition:transform 0.2s,box-shadow 0.2s;border-top:3px solid var(--c,#e63946); }
    .tip-card:hover { transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,0.1); }
    .tip-card-badge { font-size:0.72rem;font-weight:700;color:var(--c,#e63946);margin-bottom:0.5rem; }
    .tip-card-title { font-size:0.92rem;font-weight:900;line-height:1.4;margin-bottom:0.5rem;color:#1a1a2e; }
    .tip-card-keys { font-family:monospace;font-size:0.88rem;font-weight:700;color:var(--c,#e63946);background:rgba(0,0,0,0.04);display:inline-block;padding:2px 10px;border-radius:6px;margin-bottom:0.5rem; }
    .tip-card-lead { font-size:0.8rem;color:#6b7280;line-height:1.6;margin-bottom:0.6rem; }
    .tip-card-date { font-size:0.72rem;color:#9ca3af; }
    footer { text-align:center;padding:2rem 1rem;font-size:0.78rem;color:#6b7280;border-top:1px solid rgba(0,0,0,0.08);margin-top:2rem; }
    footer a { color:#6b7280;text-decoration:none; }
    @media (max-width:480px) { main { padding:0 1rem 3rem; } }
  </style>
</head>
<body>

<div class="top-bar"></div>

<nav class="nav" aria-label="パンくずリスト">
  <a href="/">ショートカット道場</a>
  <span style="color:rgba(0,0,0,0.25)">›</span>
  <span>ショートカット活用Tips</span>
</nav>

<header>
  <div class="update-badge">📅 毎日2記事更新中</div>
  <h1>⌨️ ショートカットキー 活用Tips</h1>
  <p>パワポ・エクセル・ワード・Outlook・Chrome・Teams・MacのショートカットキーをTips形式で解説。使い方・効果・時短効果・キーボード図付きでわかりやすく紹介します。</p>
  <div class="stats">
    <span>記事数：<strong>${total}件</strong></span>
    <span>対象アプリ：<strong>7種類</strong></span>
    <span>更新頻度：<strong>毎日2記事</strong></span>
    <span><a href="/tips/report/" style="color:#e63946;font-weight:700;text-decoration:none;">📊 デイリーレポート →</a></span>
  </div>
</header>

<main>
  <div class="grid">
${cards}
  </div>
</main>

<footer>
  © 2026 <a href="/">ショートカット道場</a> —
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

// ─── メイン処理 ───────────────────────────────────────────────────────────────
const db          = JSON.parse(readFileSync(DB_FILE, 'utf8'))
const published   = loadPublished()
const publishedIds = new Set(published.map(p => p.id))

// 未公開の記事を取得
const unpublished = db.filter(a => !publishedIds.has(a.id))

if (unpublished.length === 0) {
  // 全記事を公開済みの場合はループ（DBをリセットして最初から）
  console.log('⚠️  全記事を公開済みです。published.json をリセットしてループします。')
  published.length = 0
  publishedIds.clear()
  unpublished.push(...db)
}

// 今日公開する2記事を選択
const ARTICLES_PER_DAY = 2
const todayArticles = unpublished.slice(0, ARTICLES_PER_DAY)
const today = todayJST()

// ディレクトリ作成 & 記事 HTML 生成
for (const art of todayArticles) {
  const dir = resolve(TIPS_DIR, art.slug)
  mkdirSync(dir, { recursive: true })

  const html = generateArticleHTML(art, today)
  writeFileSync(resolve(dir, 'index.html'), html, 'utf8')
  console.log(`✅  tips/${art.slug}/index.html  [${art.icon} ${art.op}]`)

  published.push({ id: art.id, slug: art.slug, date: today })
}

// published.json を更新
savePublished(published)

// 一覧ページを更新
const indexHTML = generateIndexHTML(published, db)
writeFileSync(resolve(TIPS_DIR, 'index.html'), indexHTML, 'utf8')
console.log(`✅  tips/index.html (${published.length}件)`)

console.log(`\n📅  ${today} — ${todayArticles.length}記事を生成しました。`)
console.log(`    残り未公開: ${unpublished.length - ARTICLES_PER_DAY}件`)
