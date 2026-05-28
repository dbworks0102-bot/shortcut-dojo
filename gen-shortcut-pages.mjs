// gen-shortcut-pages.mjs — ショートカット一覧SEOページ生成
import { writeFileSync, mkdirSync } from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))

// ─── ゲーム設定 ───────────────────────────────────────────
const GAMES = [
  {
    id:       'ppt',
    appName:  'パワポ（PowerPoint）',
    appShort: 'パワポ',
    title:    'パワポ（PowerPoint）ショートカットキー 一覧・早見表',
    desc:     'パワポ（PowerPoint）のショートカットキーを一覧で確認。基本操作からスライドショー・オブジェクト操作まで全150個を難易度別に整理。印刷可能な早見表として活用できます。',
    keywords: 'パワポ,PowerPoint,ショートカットキー,一覧,早見表,Ctrl+S,F5,スライドショー,コピー,貼り付け',
    canonical:'https://shortcut-dojo.com/ppt/shortcuts/',
    color:    '#e63946',
    colorLight:'#fde8ea',
    gameUrl:  '/ppt/',
    gameName: 'PPT道場',
    emoji:    '🥋',
    dataPath: './ppt/src/data/shortcuts.js',
    faq: [
      { q: 'パワポでスライドショーを開始するキーは？',    a: 'F5 キーで最初のスライドから開始できます。現在のスライドから開始するには Shift+F5 を使います。' },
      { q: 'パワポでスライドを複製するキーは？',          a: 'Ctrl+D でスライドを複製できます。' },
      { q: 'パワポでオブジェクトをグループ化するキーは？', a: 'Ctrl+G でグループ化できます。解除は Ctrl+Shift+G です。' },
    ],
  },
  {
    id:       'excel',
    appName:  'Excel（エクセル）',
    appShort: 'エクセル',
    title:    'Excel（エクセル）ショートカットキー 一覧・早見表',
    desc:     'Excel（エクセル）のショートカットキーを一覧で確認。基本操作からセル編集・書式設定・フィルターまで全87個を難易度別に整理。印刷可能な早見表として活用できます。',
    keywords: 'Excel,エクセル,ショートカットキー,一覧,早見表,Ctrl+S,Ctrl+Enter,Alt+=,オートSUM,フィルター',
    canonical:'https://shortcut-dojo.com/excel/shortcuts/',
    color:    '#217346',
    colorLight:'#e6f4ec',
    gameUrl:  '/excel/',
    gameName: 'Excel道場',
    emoji:    '📊',
    dataPath: './excel/src/data/shortcuts.js',
    faq: [
      { q: 'ExcelでオートSUMを挿入するキーは？',       a: 'Alt+= でオートSUM（合計）を挿入できます。' },
      { q: 'Excelで複数セルに同じ値を一括入力するキーは？', a: 'セル範囲を選択して入力後、Ctrl+Enter で一括入力できます。' },
      { q: 'Excelでフィルターを切り替えるキーは？',      a: 'Ctrl+Shift+L でフィルターのON/OFFを切り替えられます。' },
    ],
  },
  {
    id:       'word',
    appName:  'Word（ワード）',
    appShort: 'ワード',
    title:    'Word（ワード）ショートカットキー 一覧・早見表',
    desc:     'Word（ワード）のショートカットキーを一覧で確認。基本操作から文字書式・段落書式・移動操作まで全75個を難易度別に整理。印刷可能な早見表として活用できます。',
    keywords: 'Word,ワード,ショートカットキー,一覧,早見表,Ctrl+B,Ctrl+E,中央揃え,太字,書式設定',
    canonical:'https://shortcut-dojo.com/word/shortcuts/',
    color:    '#2b579a',
    colorLight:'#e8eef8',
    gameUrl:  '/word/',
    gameName: 'Word道場',
    emoji:    '📝',
    dataPath: './word/src/data/shortcuts.js',
    faq: [
      { q: 'Wordで中央揃えにするキーは？',       a: 'Ctrl+E で中央揃えになります。左揃えは Ctrl+L、右揃えは Ctrl+R、両端揃えは Ctrl+J です。' },
      { q: 'Wordで改ページを挿入するキーは？',    a: 'Ctrl+Enter で改ページを挿入できます。' },
      { q: 'Wordで下付き・上付き文字にするキーは？', a: '下付き文字は Ctrl+= 、上付き文字は Ctrl+Shift+= です。' },
    ],
  },
]

const LV_LABEL = { 1: 'かんたん', 2: 'ふつう', 3: 'むずかしい' }
const LV_COLOR = { 1: '#2a9d8f', 2: '#f4a261', 3: '#e63946' }
const LV_BG    = { 1: 'rgba(42,157,143,0.12)', 2: 'rgba(244,162,97,0.12)', 3: 'rgba(230,57,70,0.12)' }

function keyChips(keys) {
  return keys.map((k, i) =>
    (i > 0 ? '<span class="kc-plus">+</span>' : '') +
    `<kbd class="kc">${escHtml(k)}</kbd>`
  ).join('')
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

function genHTML(g, shortcuts) {
  // カテゴリ別グループ
  const catOrder = []
  const byCat = {}
  shortcuts.forEach(s => {
    if (!byCat[s.cat]) { catOrder.push(s.cat); byCat[s.cat] = [] }
    byCat[s.cat].push(s)
  })

  // JSON-LD ItemList
  const itemListElements = shortcuts.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${s.op}：${s.keys.join('+')}`,
    description: `${g.appShort}で「${s.op}」を行うショートカットキーは ${s.keys.join('+')} です。`,
  }))

  const faqEntities = g.faq.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }))

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: g.title,
        url: g.canonical,
        description: g.desc,
        inLanguage: 'ja',
        isPartOf: { '@type': 'WebSite', name: 'ショートカット道場', url: 'https://shortcut-dojo.com/' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'ショートカット道場', item: 'https://shortcut-dojo.com/' },
            { '@type': 'ListItem', position: 2, name: g.gameName, item: `https://shortcut-dojo.com/${g.id}/` },
            { '@type': 'ListItem', position: 3, name: 'ショートカット一覧', item: g.canonical },
          ],
        },
      },
      { '@type': 'ItemList', name: `${g.appShort} ショートカットキー 一覧`, numberOfItems: shortcuts.length, itemListElement: itemListElements },
      { '@type': 'FAQPage', mainEntity: faqEntities },
    ],
  }, null, 2)

  // テーブル行HTML
  const tableRows = catOrder.map(cat => {
    const items = byCat[cat]
    const rows = items.map(s => `
        <tr>
          <td class="sc-op">${escHtml(s.op)}</td>
          <td class="sc-keys">${keyChips(s.keys)}</td>
          <td class="sc-lv"><span class="lv-badge" style="background:${LV_BG[s.lv]};color:${LV_COLOR[s.lv]}">${LV_LABEL[s.lv]}</span></td>
        </tr>`).join('')
    return `
      <section class="cat-section">
        <h2 class="cat-heading">${escHtml(cat)} <span class="cat-count">${items.length}個</span></h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>操作内容</th><th>ショートカットキー</th><th>難易度</th></tr></thead>
            <tbody>${rows}
            </tbody>
          </table>
        </div>
      </section>`
  }).join('')

  // 他ゲームへのリンク
  const related = GAMES.filter(x => x.id !== g.id).map(x =>
    `<a href="${x.gameUrl}shortcuts/" class="rel-link" style="--rc:${x.color}">${x.emoji} ${x.appShort} 一覧</a>`
  ).join('')

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escHtml(g.title)}</title>
  <meta name="description" content="${escHtml(g.desc)}">
  <meta name="keywords"    content="${escHtml(g.keywords)}">
  <meta name="robots"      content="index, follow">
  <meta name="theme-color" content="${g.color}">
  <link rel="canonical"    href="${g.canonical}">
  <link rel="preconnect"   href="https://fonts.googleapis.com">
  <link rel="preconnect"   href="https://fonts.gstatic.com" crossorigin>
  <link rel="icon"         href="/favicon.svg" type="image/svg+xml">

  <!-- OGP -->
  <meta property="og:type"        content="article">
  <meta property="og:url"         content="${g.canonical}">
  <meta property="og:title"       content="${escHtml(g.title)}">
  <meta property="og:description" content="${escHtml(g.desc)}">
  <meta property="og:image"       content="https://shortcut-dojo.com/${g.id}/ogp.png">
  <meta property="og:locale"      content="ja_JP">
  <meta property="og:site_name"   content="ショートカット道場">
  <meta name="twitter:card"       content="summary_large_image">
  <meta name="twitter:title"      content="${escHtml(g.title)}">
  <meta name="twitter:description" content="${escHtml(g.desc)}">
  <meta name="twitter:image"      content="https://shortcut-dojo.com/${g.id}/ogp.png">

  <!-- JSON-LD -->
  <script type="application/ld+json">
${jsonLd}
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

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --color:  ${g.color};
      --colorL: ${g.colorLight};
      --muted:  #6b7280;
      --border: rgba(0,0,0,0.08);
    }

    body {
      font-family: 'Noto Sans JP', 'Segoe UI', sans-serif;
      background: #fff;
      color: #1a1a2e;
      line-height: 1.7;
    }

    /* トップバー */
    .top-bar {
      height: 5px;
      background: linear-gradient(90deg, var(--color), color-mix(in srgb, var(--color) 60%, white), var(--color));
    }

    /* ナビ */
    .nav {
      max-width: 860px; margin: 0 auto; padding: 0.8rem 1.5rem;
      display: flex; align-items: center; gap: 0.4rem;
      font-size: 0.78rem; color: var(--muted);
    }
    .nav a { color: var(--color); text-decoration: none; }
    .nav a:hover { text-decoration: underline; }
    .nav-sep { color: rgba(0,0,0,0.25); }

    /* ヘッダー */
    .hero {
      background: var(--colorL);
      border-bottom: 1px solid var(--border);
      padding: 2.5rem 1.5rem 2rem;
      text-align: center;
    }
    .hero-badge {
      display: inline-block;
      background: var(--color); color: #fff;
      font-size: 0.72rem; font-weight: 700; letter-spacing: 1px;
      padding: 3px 14px; border-radius: 50px; margin-bottom: 1rem;
    }
    h1 {
      font-size: clamp(1.4rem, 4vw, 2rem);
      font-weight: 900; line-height: 1.3; margin-bottom: 0.7rem;
    }
    .hero-desc {
      font-size: 0.9rem; color: var(--muted); max-width: 580px; margin: 0 auto 1.4rem;
    }
    .cta-btn {
      display: inline-block;
      background: var(--color); color: #fff;
      font-size: 1rem; font-weight: 900; padding: 0.75rem 2.2rem;
      border-radius: 50px; text-decoration: none;
      box-shadow: 0 6px 20px color-mix(in srgb, var(--color) 40%, transparent);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px color-mix(in srgb, var(--color) 50%, transparent); }
    .cta-sub { font-size: 0.75rem; color: var(--muted); margin-top: 0.5rem; }

    /* 統計バー */
    .stats-bar {
      max-width: 860px; margin: 0 auto; padding: 1.2rem 1.5rem;
      display: flex; gap: 1.5rem; flex-wrap: wrap;
      border-bottom: 1px solid var(--border);
    }
    .stat-item { font-size: 0.82rem; color: var(--muted); }
    .stat-item strong { color: #1a1a2e; font-weight: 900; font-size: 1.05rem; }

    /* メインコンテンツ */
    main { max-width: 860px; margin: 0 auto; padding: 0 1.5rem 4rem; }

    /* カテゴリセクション */
    .cat-section { margin-top: 2.5rem; }
    .cat-heading {
      font-size: 1rem; font-weight: 900; letter-spacing: 0.05em;
      color: #1a1a2e; margin-bottom: 0.8rem;
      display: flex; align-items: center; gap: 0.6rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--colorL);
    }
    .cat-count {
      font-size: 0.72rem; font-weight: 700; color: var(--color);
      background: var(--colorL);
      padding: 2px 10px; border-radius: 50px;
    }

    /* テーブル */
    .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    table {
      width: 100%; border-collapse: collapse; font-size: 0.88rem;
    }
    thead th {
      background: #f5f5f7; font-size: 0.72rem; font-weight: 700;
      letter-spacing: 0.08em; color: var(--muted);
      padding: 0.55rem 1rem; text-align: left;
      border-bottom: 1px solid var(--border);
    }
    tbody tr { border-bottom: 1px solid var(--border); transition: background 0.12s; }
    tbody tr:hover { background: #fafafa; }
    tbody tr:last-child { border-bottom: none; }
    td { padding: 0.6rem 1rem; vertical-align: middle; }
    .sc-op  { color: #1a1a2e; font-weight: 500; min-width: 160px; }
    .sc-keys { white-space: nowrap; }
    .sc-lv  { white-space: nowrap; }

    /* キーチップ */
    .kc {
      display: inline-block;
      background: #f0f0f0; border: 1px solid #d1d5db;
      border-bottom-width: 2px;
      border-radius: 5px; padding: 1px 8px;
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 0.82rem; color: #1a1a2e;
      font-style: normal;
    }
    .kc-plus { font-size: 0.72rem; color: #9ca3af; margin: 0 1px; }

    /* 難易度バッジ */
    .lv-badge {
      font-size: 0.68rem; font-weight: 700;
      padding: 2px 10px; border-radius: 50px;
      white-space: nowrap;
    }

    /* FAQ */
    .faq-section { margin-top: 3rem; }
    .faq-section h2 {
      font-size: 1.1rem; font-weight: 900; margin-bottom: 1rem;
      padding-bottom: 0.5rem; border-bottom: 2px solid var(--colorL);
    }
    details {
      border: 1px solid var(--border); border-radius: 12px;
      margin-bottom: 0.6rem; overflow: hidden;
    }
    summary {
      padding: 0.85rem 1.2rem; cursor: pointer;
      font-weight: 700; font-size: 0.9rem; list-style: none;
      display: flex; align-items: center; justify-content: space-between;
    }
    summary::-webkit-details-marker { display: none; }
    summary::after { content: '＋'; font-size: 1rem; color: var(--color); }
    details[open] summary::after { content: '－'; }
    .faq-ans { padding: 0 1.2rem 0.85rem; font-size: 0.88rem; color: #374151; line-height: 1.8; }

    /* 関連リンク */
    .related { margin-top: 3rem; }
    .related h2 {
      font-size: 1.1rem; font-weight: 900; margin-bottom: 1rem;
      padding-bottom: 0.5rem; border-bottom: 2px solid var(--colorL);
    }
    .rel-links { display: flex; gap: 0.8rem; flex-wrap: wrap; }
    .rel-link {
      display: inline-block; padding: 0.6rem 1.4rem;
      border: 2px solid var(--rc, #e63946); border-radius: 50px;
      color: var(--rc, #e63946); text-decoration: none;
      font-size: 0.88rem; font-weight: 700; transition: all 0.2s;
    }
    .rel-link:hover { background: var(--rc, #e63946); color: #fff; }

    /* フッター */
    footer {
      text-align: center; padding: 2rem 1rem;
      font-size: 0.78rem; color: var(--muted);
      border-top: 1px solid var(--border); margin-top: 2rem;
    }
    footer a { color: var(--muted); text-decoration: none; }

    /* モバイル */
    @media (max-width: 480px) {
      .nav { padding: 0.6rem 1rem; }
      .hero { padding: 1.8rem 1rem 1.5rem; }
      h1 { font-size: 1.3rem; }
      main { padding: 0 1rem 3rem; }
      thead th:last-child, td.sc-lv { display: none; }
    }
  </style>
</head>
<body>

<div class="top-bar"></div>

<!-- パンくず -->
<nav class="nav" aria-label="パンくずリスト">
  <a href="/">ショートカット道場</a>
  <span class="nav-sep">›</span>
  <a href="${g.gameUrl}">${g.gameName}</a>
  <span class="nav-sep">›</span>
  <span>ショートカット一覧</span>
</nav>

<!-- ヒーロー -->
<div class="hero">
  <div class="hero-badge">${g.emoji} ${g.appShort} ショートカットキー</div>
  <h1>${escHtml(g.title)}</h1>
  <p class="hero-desc">${escHtml(g.desc)}</p>
  <a href="${g.gameUrl}" class="cta-btn">🎮 ${g.gameName}でゲーム練習する</a>
  <p class="cta-sub">4択クイズ形式 • 3難易度 • ランキング付き • 完全無料</p>
</div>

<!-- 統計 -->
<div class="stats-bar">
  <div class="stat-item">ショートカット数：<strong>${shortcuts.length}個</strong></div>
  <div class="stat-item">カテゴリ：<strong>${catOrder.length}種類</strong></div>
  <div class="stat-item">🌱 かんたん：<strong>${shortcuts.filter(s=>s.lv===1).length}個</strong></div>
  <div class="stat-item">🔥 ふつう：<strong>${shortcuts.filter(s=>s.lv===2).length}個</strong></div>
  <div class="stat-item">⚡ むずかしい：<strong>${shortcuts.filter(s=>s.lv===3).length}個</strong></div>
</div>

<main>
  <!-- ショートカット一覧 -->
  ${tableRows}

  <!-- ゲームCTA -->
  <div style="text-align:center;margin-top:3rem;padding:2rem;background:var(--colorL);border-radius:20px;">
    <p style="font-size:1rem;font-weight:700;margin-bottom:0.6rem;">覚えたら実際に練習してみよう！</p>
    <p style="font-size:0.85rem;color:var(--muted);margin-bottom:1.2rem;">4択クイズ形式でスコアを競いながらショートカットキーを習得</p>
    <a href="${g.gameUrl}" class="cta-btn">🎮 ${g.gameName}でゲーム練習する →</a>
  </div>

  <!-- FAQ -->
  <div class="faq-section">
    <h2>よくある質問</h2>
    ${g.faq.map(f => `
    <details>
      <summary>${escHtml(f.q)}</summary>
      <div class="faq-ans">${escHtml(f.a)}</div>
    </details>`).join('')}
    <details>
      <summary>${g.appShort}のショートカットキーを効率よく覚える方法は？</summary>
      <div class="faq-ans">${g.gameName}では4択クイズ形式でショートカットキーを練習できます。毎日少しずつプレイすることで、指が自然に覚えるようになります。「かんたん」モードから始めて、慣れたら「むずかしい」モードに挑戦してみてください。</div>
    </details>
  </div>

  <!-- 関連ページ -->
  <div class="related">
    <h2>他のショートカット一覧</h2>
    <div class="rel-links">
      ${related}
      <a href="/" class="rel-link" style="--rc:#6b7280">🏠 道場トップへ</a>
    </div>
  </div>
</main>

<footer>
  © 2026 <a href="/">ショートカット道場</a> —
  <a href="/ppt/shortcuts/">パワポ一覧</a> /
  <a href="/excel/shortcuts/">Excel一覧</a> /
  <a href="/word/shortcuts/">Word一覧</a>
</footer>

</body>
</html>`
}

// ─── 生成実行 ─────────────────────────────────────────────
for (const g of GAMES) {
  const mod = await import(g.dataPath)
  const html = genHTML(g, mod.SHORTCUTS)

  const outDir = `${__dir}/${g.id}/shortcuts`
  mkdirSync(outDir, { recursive: true })
  writeFileSync(`${outDir}/index.html`, html, 'utf8')
  console.log(`✅ ${g.gameName} 一覧ページ → ${g.id}/shortcuts/index.html (${mod.SHORTCUTS.length}問)`)
}

console.log('\n完了 — vite.config.js への追加が必要です')
