/**
 * SEO 自動最適化スクリプト
 * Usage: node scripts/seo-optimizer.mjs
 *
 * 環境変数:
 *   ANTHROPIC_API_KEY  — Claude API キー（必須）
 *
 * 動作:
 *   1. Supabase から article_views を取得
 *   2. 閲覧数が低い記事のタイトル・リードを Claude で SEO 改善
 *   3. articles-db.json を更新
 *   4. 対象記事の HTML を再生成
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root      = resolve(__dirname, '..')

const SB_URL  = 'https://gqdkhvipjcpwfzeyczxx.supabase.co'
const SB_KEY  = 'sb_publishable_qIsUonaI-u-Pmg7Xn4OS6Q_oYBgzdoJ'
const API_KEY = process.env.ANTHROPIC_API_KEY

// 閲覧数がこの値以下の記事を改善対象とする
const LOW_VIEW_THRESHOLD = parseInt(process.env.SEO_THRESHOLD || '5', 10)
// 1回の実行で改善する最大記事数
const MAX_OPTIMIZE = parseInt(process.env.SEO_MAX || '3', 10)

// ─── Supabase からビュー数取得 ─────────────────────────────────────────────────
async function fetchViews() {
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/article_views?select=slug,views`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } }
    )
    if (!res.ok) return {}
    const rows = await res.json()
    return Object.fromEntries(rows.map(r => [r.slug, Number(r.views)]))
  } catch {
    return {}
  }
}

// ─── Claude で title・lead を SEO 改善 ───────────────────────────────────────
async function optimizeSEO(article, currentViews) {
  const keysDisplay = article.keys.join('+')

  const prompt = `あなたはSEOの専門家です。
以下のショートカット解説記事のタイトルとリード文を、Google検索で上位表示されやすいように改善してください。

【現在の情報】
- アプリ: ${article.gameLabel}（${article.game}）
- 操作名: ${article.op}
- キー: ${keysDisplay}
- 現在のタイトル: ${article.title}
- 現在のリード文: ${article.lead}
- 現在の閲覧数: ${currentViews}（改善が必要）

【SEO改善の方針】
- タイトル: 「${article.game} ${keysDisplay}」「${article.op}」「使い方」「時短」などを自然に含める
- リード文: 検索意図に合った具体的な問題提起から始める
- 文字数: タイトル40〜60文字、リード文80〜130文字
- 口語的・親しみやすいトーンで

【出力形式】JSONのみ返してください:
{
  "title": "改善後のタイトル",
  "lead": "改善後のリード文"
}`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key':         API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type':      'application/json',
    },
    body: JSON.stringify({
      model:      'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages:   [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) throw new Error(`Claude API error ${res.status}`)

  const data   = await res.json()
  const text   = data.content[0].text.trim()
  const jsonStr = text.startsWith('{') ? text : text.match(/\{[\s\S]*\}/)?.[0]
  if (!jsonStr) throw new Error('Claude がJSON以外を返しました')

  return JSON.parse(jsonStr)
}

// ─── 記事 HTML 再生成（gen-daily-articles.mjs の関数を再利用） ───────────────
async function regenerateArticleHTML(article, publishedDate) {
  const { generateKeyboardSVG, generateKeyBadgesHTML } = await import('./keyboard-svg.mjs')

  const kbSVG       = generateKeyboardSVG(article.keys)
  const keyBadges   = generateKeyBadgesHTML(article.keys)
  const keysDisplay = article.keys.join('+')

  const formatDate = (iso) => {
    const [y, m, d] = iso.split('-')
    return `${y}年${parseInt(m)}月${parseInt(d)}日`
  }
  const dateLabel = formatDate(publishedDate)

  const relatedRows = article.related.map(r =>
    `<tr>
      <td style="padding:0.5rem 1rem;vertical-align:middle;">${generateKeyBadgesHTML(r.keys)}</td>
      <td style="padding:0.5rem 1rem;color:#374151;">${r.op}</td>
    </tr>`
  ).join('\n')

  const usageItems = article.usage.map((u, i) =>
    `<li style="margin-bottom:0.7rem"><span style="font-weight:700;color:${article.gameColor};margin-right:0.5rem">${i+1}.</span>${u}</li>`
  ).join('\n')

  const tipsItems = article.tips.map(t =>
    `<li style="margin-bottom:0.5rem;padding-left:1.2rem;position:relative">
      <span style="position:absolute;left:0;color:${article.gameColor}">✓</span>${t}
    </li>`
  ).join('\n')

  // gen-daily-articles.mjs と同じテンプレートを使う
  const { generateArticleHTMLFromTemplate } = await import('./article-template.mjs')
    .catch(() => null)

  // テンプレートモジュールがない場合は直接読み込んで関数を呼ぶ
  const genMod = await import('./gen-daily-articles.mjs?t=' + Date.now())
    .catch(() => null)

  return null // 呼び出し元で判断
}

// ─── メイン ───────────────────────────────────────────────────────────────────
if (!API_KEY) {
  console.error('❌  ANTHROPIC_API_KEY が設定されていません')
  process.exit(1)
}

const dbPath    = resolve(root, 'tips', 'articles-db.json')
const pubPath   = resolve(root, 'tips', 'published.json')
const db        = JSON.parse(readFileSync(dbPath, 'utf8'))
const published = JSON.parse(readFileSync(pubPath, 'utf8'))
const pubMap    = Object.fromEntries(published.map(p => [p.slug, p.date]))

const views     = await fetchViews()
console.log(`📊  Supabase ビューデータ: ${Object.keys(views).length} 件`)

// 公開済みで閲覧数が低い記事を特定
const lowViewArticles = db
  .filter(a => pubMap[a.slug] && (views[a.slug] ?? 0) <= LOW_VIEW_THRESHOLD)
  .sort((a, b) => (views[a.slug] ?? 0) - (views[b.slug] ?? 0))
  .slice(0, MAX_OPTIMIZE)

if (lowViewArticles.length === 0) {
  console.log(`✅  閲覧数 ${LOW_VIEW_THRESHOLD} 以下の記事はありません`)
  process.exit(0)
}

console.log(`🎯  SEO 改善対象: ${lowViewArticles.length} 件（閲覧数 ${LOW_VIEW_THRESHOLD} 以下）`)

let improved = 0
for (const article of lowViewArticles) {
  const currentViews = views[article.slug] ?? 0
  process.stdout.write(`  最適化中: [${article.game}] ${article.op} (${currentViews}PV)… `)

  try {
    const improved_ = await optimizeSEO(article, currentViews)
    const oldTitle  = article.title
    article.title   = improved_.title || article.title
    article.lead    = improved_.lead  || article.lead
    console.log(`✅`)
    console.log(`    Before: ${oldTitle}`)
    console.log(`    After:  ${article.title}`)
    improved++
  } catch (e) {
    console.log(`❌  ${e.message}`)
  }
}

if (improved > 0) {
  writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8')
  console.log(`\n✅  articles-db.json を更新しました（${improved} 件のSEO改善）`)
  console.log('    次回の gen-daily-articles.mjs 実行時に改善版 HTML が生成されます')
} else {
  console.log('\n⚠️  SEO 改善処理に失敗しました')
}

// レポート出力
console.log('\n📋  閲覧数レポート（公開済み記事）:')
const report = db
  .filter(a => pubMap[a.slug])
  .map(a => ({ slug: a.slug, game: a.game, views: views[a.slug] ?? 0 }))
  .sort((a, b) => b.views - a.views)

for (const r of report) {
  const bar = '█'.repeat(Math.min(r.views, 20))
  console.log(`  ${r.views.toString().padStart(4)} PV  ${r.game.padEnd(8)} ${r.slug} ${bar}`)
}
