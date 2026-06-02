/**
 * ショートカット記事ページ生成スクリプト
 * Usage: node scripts/gen-shortcut-articles.mjs
 */
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ─── ゲーム設定 ───────────────────────────────────────────────────────────────
const GAMES = [
  {
    id:       'outlook',
    name:     'Outlook',
    nameJP:   'アウトルック',
    icon:     '📧',
    color:    '#0078D4',
    colorL:   '#e6f2fb',
    tool:     'Outlook（アウトルック）',
    toolShort:'Outlook',
    ctaLabel: '📧 Outlook道場でゲーム練習する',
    faq: [
      { q: 'Outlookで新しいメールを作成するキーは？',       a: 'Ctrl+N で新しいメールを作成できます。' },
      { q: 'Outlookでメールに返信するキーは？',             a: 'Ctrl+R で返信、Ctrl+Shift+R で全員に返信できます。' },
      { q: 'Outlookでメールを送信するキーは？',             a: 'Ctrl+Enter でメールを送信できます。' },
      { q: 'Outlookで予定表に切り替えるキーは？',          a: 'Ctrl+2 で予定表に切り替えられます。メールは Ctrl+1 です。' },
    ],
    related: [
      { href: '/excel/shortcuts/', label: '📊 Excel 一覧',   color: '#217346' },
      { href: '/word/shortcuts/',  label: '📝 Word 一覧',    color: '#2b579a' },
      { href: '/chrome/shortcuts/',label: '🌐 Chrome 一覧', color: '#4285F4' },
      { href: '/teams/shortcuts/', label: '💬 Teams 一覧',  color: '#6264A7' },
      { href: '/',                 label: '🏠 道場トップへ', color: '#6b7280' },
    ],
  },
  {
    id:       'chrome',
    name:     'Chrome',
    nameJP:   'クローム',
    icon:     '🌐',
    color:    '#4285F4',
    colorL:   '#e8f0fe',
    tool:     'Google Chrome（クローム）',
    toolShort:'Chrome',
    ctaLabel: '🌐 Chrome道場でゲーム練習する',
    faq: [
      { q: 'Chromeで新しいタブを開くキーは？',              a: 'Ctrl+T で新しいタブを開けます。' },
      { q: 'Chromeで閉じたタブを元に戻すキーは？',          a: 'Ctrl+Shift+T で閉じたタブを再度開けます。' },
      { q: 'Chromeでアドレスバーにフォーカスするキーは？',  a: 'Ctrl+L でアドレスバーにフォーカスできます。' },
      { q: 'Chromeで開発者ツールを開くキーは？',            a: 'F12 または Ctrl+Shift+I で開発者ツールを開けます。' },
    ],
    related: [
      { href: '/outlook/shortcuts/', label: '📧 Outlook 一覧', color: '#0078D4' },
      { href: '/ppt/shortcuts/',     label: '🥋 パワポ 一覧',  color: '#e63946' },
      { href: '/teams/shortcuts/',   label: '💬 Teams 一覧',   color: '#6264A7' },
      { href: '/mac/shortcuts/',     label: '🍎 Mac 一覧',     color: '#555555' },
      { href: '/',                   label: '🏠 道場トップへ', color: '#6b7280' },
    ],
  },
  {
    id:       'teams',
    name:     'Teams',
    nameJP:   'チームズ',
    icon:     '💬',
    color:    '#6264A7',
    colorL:   '#f0f0f8',
    tool:     'Microsoft Teams（チームズ）',
    toolShort:'Teams',
    ctaLabel: '💬 Teams道場でゲーム練習する',
    faq: [
      { q: 'Teamsで検索するキーは？',                      a: 'Ctrl+E で検索ボックスにフォーカスできます。' },
      { q: 'Teams会議中にミュートするキーは？',             a: 'Ctrl+Shift+M でマイクのミュートを切り替えられます。' },
      { q: 'Teams会議中にカメラをオン・オフするキーは？',   a: 'Ctrl+Shift+O でカメラのオン・オフを切り替えられます。' },
      { q: 'Teamsで設定を開くキーは？',                    a: 'Ctrl+, （Ctrl+カンマ）で設定を開けます。' },
    ],
    related: [
      { href: '/outlook/shortcuts/', label: '📧 Outlook 一覧', color: '#0078D4' },
      { href: '/chrome/shortcuts/',  label: '🌐 Chrome 一覧',  color: '#4285F4' },
      { href: '/excel/shortcuts/',   label: '📊 Excel 一覧',   color: '#217346' },
      { href: '/mac/shortcuts/',     label: '🍎 Mac 一覧',     color: '#555555' },
      { href: '/',                   label: '🏠 道場トップへ', color: '#6b7280' },
    ],
  },
  {
    id:       'mac',
    name:     'Mac',
    nameJP:   'マック',
    icon:     '🍎',
    color:    '#555555',
    colorL:   '#f0f0f0',
    tool:     'Mac（マック）',
    toolShort:'Mac',
    ctaLabel: '🍎 Mac道場でゲーム練習する',
    faq: [
      { q: 'Macでコピーするキーは？',                      a: '⌘+C（Command+C）でコピーできます。貼り付けは ⌘+V です。' },
      { q: 'Macでスクリーンショットを撮るキーは？',         a: '⌘+Shift+3 で全画面、⌘+Shift+4 で範囲選択のスクリーンショットを撮れます。' },
      { q: 'MacでSpotlight検索を開くキーは？',             a: '⌘+Space（Command+Space）でSpotlight検索を開けます。' },
      { q: 'Macでアプリを切り替えるキーは？',              a: '⌘+Tab（Command+Tab）でアプリを切り替えられます。' },
    ],
    related: [
      { href: '/chrome/shortcuts/',  label: '🌐 Chrome 一覧',  color: '#4285F4' },
      { href: '/teams/shortcuts/',   label: '💬 Teams 一覧',   color: '#6264A7' },
      { href: '/outlook/shortcuts/', label: '📧 Outlook 一覧', color: '#0078D4' },
      { href: '/excel/shortcuts/',   label: '📊 Excel 一覧',   color: '#217346' },
      { href: '/',                   label: '🏠 道場トップへ', color: '#6b7280' },
    ],
  },
]

// ─── ユーティリティ ────────────────────────────────────────────────────────────
function keysHtml(keys) {
  return keys.map((k, i) => {
    const chip = `<kbd class="kc">${k}</kbd>`
    return i < keys.length - 1 ? chip + '<span class="kc-plus">+</span>' : chip
  }).join('')
}

function lvBadge(lv) {
  if (lv === 1) return `<span class="lv-badge" style="background:rgba(42,157,143,0.12);color:#2a9d8f">かんたん</span>`
  if (lv === 2) return `<span class="lv-badge" style="background:rgba(244,162,97,0.12);color:#f4a261">ふつう</span>`
  return `<span class="lv-badge" style="background:rgba(230,57,70,0.12);color:#e63946">むずかしい</span>`
}

function tableSection(catName, rows) {
  const rowsHtml = rows.map(r => `        <tr>
          <td class="sc-op">${r.op}</td>
          <td class="sc-keys">${keysHtml(r.keys)}</td>
          <td class="sc-lv">${lvBadge(r.lv)}</td>
        </tr>`).join('\n')
  return `      <section class="cat-section">
        <h2 class="cat-heading">${catName} <span class="cat-count">${rows.length}個</span></h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>操作内容</th><th>ショートカットキー</th><th>難易度</th></tr></thead>
            <tbody>
${rowsHtml}
            </tbody>
          </table>
        </div>
      </section>`
}

function ldItemList(shortcuts, toolShort) {
  return shortcuts.map((s, i) => `        {
          "@type": "ListItem",
          "position": ${i + 1},
          "name": "${s.op}：${s.keys.join('+')}",
          "description": "${toolShort}で「${s.op}」を行うショートカットキーは ${s.keys.join('+')} です。"
        }`).join(',\n')
}

function faqLd(faq) {
  return faq.map(f => `        {
          "@type": "Question",
          "name": "${f.q}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${f.a}"
          }
        }`).join(',\n')
}

// ─── HTML 生成 ─────────────────────────────────────────────────────────────────
async function generate(cfg) {
  const mod = await import(`../${cfg.id}/src/data/shortcuts.js`)
  const shortcuts = mod.SHORTCUTS

  // カテゴリ分類
  const catMap = {}
  shortcuts.forEach(s => {
    if (!catMap[s.cat]) catMap[s.cat] = []
    catMap[s.cat].push(s)
  })

  const total  = shortcuts.length
  const easy   = shortcuts.filter(s => s.lv === 1).length
  const normal = shortcuts.filter(s => s.lv === 2).length
  const hard   = shortcuts.filter(s => s.lv === 3).length
  const catCount = Object.keys(catMap).length

  const tables = Object.entries(catMap).map(([cat, rows]) => tableSection(cat, rows)).join('\n\n')
  const relLinks = cfg.related.map(r =>
    `      <a href="${r.href}" class="rel-link" style="--rc:${r.color}">${r.label}</a>`
  ).join('')

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cfg.tool}ショートカットキー 一覧・早見表</title>
  <meta name="description" content="${cfg.tool}のショートカットキーを一覧で確認。全${total}個のショートカットを${catCount}カテゴリに整理。難易度別に学べる早見表として活用できます。">
  <meta name="keywords"    content="${cfg.name},${cfg.nameJP},ショートカットキー,一覧,早見表,${cfg.toolShort}操作,${cfg.name}道場">
  <meta name="robots"      content="index, follow">
  <meta name="theme-color" content="${cfg.color}">
  <link rel="canonical"    href="https://shortcut-dojo.com/${cfg.id}/shortcuts/">
  <link rel="preconnect"   href="https://fonts.googleapis.com">
  <link rel="preconnect"   href="https://fonts.gstatic.com" crossorigin>
  <link rel="icon"         href="/favicon.svg" type="image/svg+xml">

  <!-- OGP -->
  <meta property="og:type"        content="article">
  <meta property="og:url"         content="https://shortcut-dojo.com/${cfg.id}/shortcuts/">
  <meta property="og:title"       content="${cfg.tool}ショートカットキー 一覧・早見表">
  <meta property="og:description" content="${cfg.tool}のショートカットキーを一覧で確認。全${total}個のショートカットを${catCount}カテゴリに整理。難易度別に学べる早見表として活用できます。">
  <meta property="og:image"       content="https://shortcut-dojo.com/${cfg.id}/ogp.png">
  <meta property="og:locale"      content="ja_JP">
  <meta property="og:site_name"   content="ショートカット道場">
  <meta name="twitter:card"       content="summary_large_image">
  <meta name="twitter:title"      content="${cfg.tool}ショートカットキー 一覧・早見表">
  <meta name="twitter:description" content="${cfg.tool}のショートカットキーを一覧で確認。全${total}個のショートカットを${catCount}カテゴリに整理。難易度別に学べる早見表として活用できます。">
  <meta name="twitter:image"      content="https://shortcut-dojo.com/${cfg.id}/ogp.png">

  <!-- JSON-LD -->
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "name": "${cfg.tool}ショートカットキー 一覧・早見表",
      "url": "https://shortcut-dojo.com/${cfg.id}/shortcuts/",
      "description": "${cfg.tool}のショートカットキーを一覧で確認。全${total}個のショートカットを${catCount}カテゴリに整理。難易度別に学べる早見表として活用できます。",
      "inLanguage": "ja",
      "isPartOf": {
        "@type": "WebSite",
        "name": "ショートカット道場",
        "url": "https://shortcut-dojo.com/"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "ショートカット道場",
            "item": "https://shortcut-dojo.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "${cfg.name}道場",
            "item": "https://shortcut-dojo.com/${cfg.id}/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "ショートカット一覧",
            "item": "https://shortcut-dojo.com/${cfg.id}/shortcuts/"
          }
        ]
      }
    },
    {
      "@type": "ItemList",
      "name": "${cfg.toolShort} ショートカットキー 一覧",
      "numberOfItems": ${total},
      "itemListElement": [
${ldItemList(shortcuts, cfg.toolShort)}
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
${faqLd(cfg.faq)},
        {
          "@type": "Question",
          "name": "${cfg.toolShort}のショートカットキーを効率よく練習する方法は？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${cfg.name}道場では、${cfg.tool}のショートカットキーを4択クイズ形式で楽しく練習できます。かんたん・ふつう・むずかしいの3段階難易度で出題。スコアやランキングで上達を確認しながら学べます。無料でご利用いただけます。"
          }
        }
      ]
    }
  ]
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

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --color:  ${cfg.color};
      --colorL: ${cfg.colorL};
      --muted:  #6b7280;
      --border: rgba(0,0,0,0.08);
    }

    body {
      font-family: 'Noto Sans JP', 'Segoe UI', sans-serif;
      background: #fff;
      color: #1a1a2e;
      line-height: 1.7;
    }

    .top-bar {
      height: 5px;
      background: linear-gradient(90deg, var(--color), color-mix(in srgb, var(--color) 60%, white), var(--color));
    }

    .nav {
      max-width: 860px; margin: 0 auto; padding: 0.8rem 1.5rem;
      display: flex; align-items: center; gap: 0.4rem;
      font-size: 0.78rem; color: var(--muted);
    }
    .nav a { color: var(--color); text-decoration: none; }
    .nav a:hover { text-decoration: underline; }
    .nav-sep { color: rgba(0,0,0,0.25); }

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

    .stats-bar {
      max-width: 860px; margin: 0 auto; padding: 1.2rem 1.5rem;
      display: flex; gap: 1.5rem; flex-wrap: wrap;
      border-bottom: 1px solid var(--border);
    }
    .stat-item { font-size: 0.82rem; color: var(--muted); }
    .stat-item strong { color: #1a1a2e; font-weight: 900; font-size: 1.05rem; }

    main { max-width: 860px; margin: 0 auto; padding: 0 1.5rem 4rem; }

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

    .lv-badge {
      font-size: 0.68rem; font-weight: 700;
      padding: 2px 10px; border-radius: 50px;
      white-space: nowrap;
    }

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

    footer {
      text-align: center; padding: 2rem 1rem;
      font-size: 0.78rem; color: var(--muted);
      border-top: 1px solid var(--border); margin-top: 2rem;
    }
    footer a { color: var(--muted); text-decoration: none; }

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

<nav class="nav" aria-label="パンくずリスト">
  <a href="/">ショートカット道場</a>
  <span class="nav-sep">›</span>
  <a href="/${cfg.id}/">${cfg.name}道場</a>
  <span class="nav-sep">›</span>
  <span>ショートカット一覧</span>
</nav>

<div class="hero">
  <div class="hero-badge">${cfg.icon} ${cfg.toolShort} ショートカットキー</div>
  <h1>${cfg.tool}ショートカットキー 一覧・早見表</h1>
  <p class="hero-desc">${cfg.tool}のショートカットキーを一覧で確認。全${total}個のショートカットを${catCount}カテゴリに整理。難易度別に学べる早見表として活用できます。</p>
  <a href="/${cfg.id}/" class="cta-btn">${cfg.ctaLabel}</a>
  <p class="cta-sub">4択クイズ形式 • 3難易度 • ランキング付き • 完全無料</p>
</div>

<div class="stats-bar">
  <div class="stat-item">ショートカット数：<strong>${total}個</strong></div>
  <div class="stat-item">カテゴリ：<strong>${catCount}種類</strong></div>
  <div class="stat-item">🌱 かんたん：<strong>${easy}個</strong></div>
  <div class="stat-item">🔥 ふつう：<strong>${normal}個</strong></div>
  <div class="stat-item">⚡ むずかしい：<strong>${hard}個</strong></div>
</div>

<main>
${tables}

  <div style="text-align:center;margin-top:3rem;padding:2rem;background:var(--colorL);border-radius:20px;">
    <p style="font-size:1rem;font-weight:700;margin-bottom:0.6rem;">覚えたら実際に練習してみよう！</p>
    <p style="font-size:0.85rem;color:var(--muted);margin-bottom:1.2rem;">4択クイズ形式でスコアを競いながらショートカットキーを習得</p>
    <a href="/${cfg.id}/" class="cta-btn">${cfg.ctaLabel} →</a>
  </div>

  <div class="faq-section">
    <h2>よくある質問</h2>
${cfg.faq.map(f => `    <details>
      <summary>${f.q}</summary>
      <div class="faq-ans">${f.a}</div>
    </details>`).join('\n')}
    <details>
      <summary>${cfg.toolShort}のショートカットキーを効率よく覚える方法は？</summary>
      <div class="faq-ans">${cfg.name}道場では4択クイズ形式でショートカットキーを練習できます。毎日少しずつプレイすることで、指が自然に覚えるようになります。「かんたん」モードから始めて、慣れたら「むずかしい」モードに挑戦してみてください。</div>
    </details>
  </div>

  <div class="related">
    <h2>他のショートカット一覧</h2>
    <div class="rel-links">
${relLinks}
    </div>
  </div>
</main>

<footer>
  © 2026 <a href="/">ショートカット道場</a> —
  <a href="/ppt/shortcuts/">パワポ一覧</a> /
  <a href="/excel/shortcuts/">Excel一覧</a> /
  <a href="/word/shortcuts/">Word一覧</a> /
  <a href="/outlook/shortcuts/">Outlook一覧</a> /
  <a href="/chrome/shortcuts/">Chrome一覧</a> /
  <a href="/teams/shortcuts/">Teams一覧</a> /
  <a href="/mac/shortcuts/">Mac一覧</a>
</footer>
</body>
</html>`

  const outPath = resolve(root, cfg.id, 'shortcuts', 'index.html')
  writeFileSync(outPath, html, 'utf8')
  console.log(`✅  ${cfg.id}/shortcuts/index.html  (${total}問, ${catCount}カテゴリ)`)
}

// ─── 実行 ──────────────────────────────────────────────────────────────────────
for (const game of GAMES) {
  await generate(game)
}
console.log('\nDone.')
