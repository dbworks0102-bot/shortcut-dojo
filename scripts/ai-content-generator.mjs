/**
 * AI コンテンツ自動生成スクリプト
 * Usage: node scripts/ai-content-generator.mjs
 *
 * 環境変数:
 *   ANTHROPIC_API_KEY  — Claude API キー（必須）
 *
 * 動作:
 *   1. Supabase から article_views を取得してゲーム人気度を計算
 *   2. articles-db.json でまだ未カバーのショートカットを収集
 *   3. 人気ゲームを優先して Claude API で記事コンテンツを生成
 *   4. articles-db.json に追記
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root      = resolve(__dirname, '..')

const SB_URL    = 'https://gqdkhvipjcpwfzeyczxx.supabase.co'
const SB_KEY    = 'sb_publishable_qIsUonaI-u-Pmg7Xn4OS6Q_oYBgzdoJ'
const API_KEY   = process.env.ANTHROPIC_API_KEY
const ARTICLES_TO_GENERATE = parseInt(process.env.ARTICLES_TO_GENERATE || '4', 10)

// ─── ゲームメタデータ ──────────────────────────────────────────────────────────
const GAME_META = {
  ppt:     { color: '#e63946', colorL: '#fde8ea', label: 'PPT道場',     icon: '🥋', nameJP: 'パワーポイント' },
  excel:   { color: '#217346', colorL: '#e8f5ee', label: 'Excel道場',   icon: '📊', nameJP: 'エクセル' },
  word:    { color: '#2b579a', colorL: '#e8eef6', label: 'Word道場',    icon: '📝', nameJP: 'ワード' },
  outlook: { color: '#0078D4', colorL: '#e6f2fb', label: 'Outlook道場', icon: '📧', nameJP: 'Outlook' },
  chrome:  { color: '#4285F4', colorL: '#e8f0fe', label: 'Chrome道場',  icon: '🌐', nameJP: 'Chrome' },
  teams:   { color: '#6264A7', colorL: '#ededf5', label: 'Teams道場',   icon: '💬', nameJP: 'Teams' },
  mac:     { color: '#555555', colorL: '#efefef', label: 'Mac道場',     icon: '🍎', nameJP: 'Mac' },
}

// ─── Supabase からゲーム人気度を取得 ─────────────────────────────────────────
async function fetchGamePopularity() {
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/article_views?select=slug,views`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } }
    )
    if (!res.ok) return {}
    const rows = await res.json()
    // スラグからゲーム名を推定してゲーム別合計
    const popularity = {}
    for (const r of rows) {
      const game = r.slug.split('-')[0]
      popularity[game] = (popularity[game] || 0) + Number(r.views)
    }
    return popularity
  } catch {
    return {}
  }
}

// ─── 各ゲームのショートカット一覧を読み込む ───────────────────────────────────
async function loadAllShortcuts() {
  const games = Object.keys(GAME_META)
  const result = {}
  for (const game of games) {
    try {
      const mod = await import(`../${game}/src/data/shortcuts.js`)
      result[game] = mod.SHORTCUTS || []
    } catch {
      result[game] = []
    }
  }
  return result
}

// ─── 未カバーショートカットの収集 ────────────────────────────────────────────
function findUncovered(db, allShortcuts, popularity) {
  const covered = new Set(db.map(a => `${a.game}/${a.keys.join('+')}`))

  // ゲームを人気度でソート（データがなければランダム順）
  const gameOrder = Object.keys(GAME_META).sort((a, b) => {
    const pa = popularity[a] || 0
    const pb = popularity[b] || 0
    return pb - pa
  })

  const candidates = []
  for (const game of gameOrder) {
    const shortcuts = allShortcuts[game] || []
    for (const s of shortcuts) {
      const key = `${game}/${s.keys.join('+')}`
      if (!covered.has(key)) {
        candidates.push({ game, ...s })
      }
    }
  }
  return candidates
}

// ─── Claude API で記事を生成 ──────────────────────────────────────────────────
async function generateArticle(shortcut) {
  const meta = GAME_META[shortcut.game]
  const keysDisplay = shortcut.keys.join('+')

  const prompt = `あなたはショートカットキー解説記事の専門ライターです。
以下のショートカットキーについて、日本語の解説記事コンテンツをJSON形式で生成してください。

【ショートカット情報】
- アプリ: ${meta.nameJP}（${shortcut.game}）
- 操作名: ${shortcut.op}
- キー: ${keysDisplay}
- カテゴリ: ${shortcut.cat || '一般操作'}

【出力形式】必ず以下のJSONのみを返してください（他のテキスト不要）:
{
  "op": "${shortcut.op}",
  "slug": "${shortcut.game}-${shortcut.keys.join('-').toLowerCase().replace(/[^a-z0-9-]/g, '')}",
  "title": "SEO最適化された記事タイトル（${keysDisplay}と操作名と${meta.nameJP}を含む、50文字以内）",
  "lead": "読者を引き込む導入文2〜3文（問題提起→解決策の流れ、80〜120文字）",
  "usage": [
    "ステップ1の説明",
    "ステップ2の説明",
    "ステップ3の説明"
  ],
  "effect": "この操作を使う効果・メリットの説明（100〜150文字）",
  "timeBefore": "ショートカットなしでの所要時間の説明",
  "timeAfter": "ショートカット使用後の所要時間の説明",
  "timeSaving": "時短効果の具体的な説明（1日・1ヶ月換算など）",
  "tips": [
    "覚え方のコツや関連知識1",
    "覚え方のコツや関連知識2",
    "覚え方のコツや関連知識3"
  ],
  "related": [
    { "keys": ["関連キー1"], "op": "関連操作1" },
    { "keys": ["関連キー2"], "op": "関連操作2" }
  ]
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
      max_tokens: 1024,
      messages:   [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Claude API error ${res.status}: ${err}`)
  }

  const data   = await res.json()
  const text   = data.content[0].text.trim()
  const jsonStr = text.startsWith('{') ? text : text.match(/\{[\s\S]*\}/)?.[0]
  if (!jsonStr) throw new Error('Claude がJSON以外を返しました')

  const generated = JSON.parse(jsonStr)
  const meta2     = GAME_META[shortcut.game]

  return {
    id:         `${shortcut.game}-${shortcut.keys.join('-').toLowerCase().replace(/[^a-z0-9-]/g, '')}`,
    game:       shortcut.game,
    gameColor:  meta2.color,
    gameColorL: meta2.colorL,
    gameLabel:  meta2.label,
    icon:       meta2.icon,
    op:         shortcut.op,
    keys:       shortcut.keys,
    slug:       generated.slug,
    title:      generated.title,
    lead:       generated.lead,
    usage:      generated.usage,
    effect:     generated.effect,
    timeBefore: generated.timeBefore,
    timeAfter:  generated.timeAfter,
    timeSaving: generated.timeSaving,
    tips:       generated.tips,
    related:    generated.related,
  }
}

// ─── メイン ───────────────────────────────────────────────────────────────────
if (!API_KEY) {
  console.error('❌  ANTHROPIC_API_KEY が設定されていません')
  process.exit(1)
}

const dbPath    = resolve(root, 'tips', 'articles-db.json')
const db        = JSON.parse(readFileSync(dbPath, 'utf8'))
const slugSet   = new Set(db.map(a => a.slug))

console.log(`📊  現在の記事数: ${db.length}`)

const [popularity, allShortcuts] = await Promise.all([
  fetchGamePopularity(),
  loadAllShortcuts(),
])

const gamePopStr = Object.entries(popularity).sort((a,b)=>b[1]-a[1])
  .map(([g,v]) => `${g}:${v}PV`).join(' / ')
console.log(`🏆  ゲーム人気度: ${gamePopStr || '(データなし)'}`)

const candidates = findUncovered(db, allShortcuts, popularity)
console.log(`📝  未カバーショートカット数: ${candidates.length}`)

if (candidates.length === 0) {
  console.log('✅  すべてのショートカットが記事化済みです')
  process.exit(0)
}

const targets = candidates.slice(0, ARTICLES_TO_GENERATE)
const newArticles = []

for (const shortcut of targets) {
  const keysDisplay = shortcut.keys.join('+')
  process.stdout.write(`  生成中: [${shortcut.game}] ${shortcut.op} (${keysDisplay})… `)
  try {
    const article = await generateArticle(shortcut)
    // スラグ重複チェック
    if (slugSet.has(article.slug)) {
      article.slug = `${article.slug}-${shortcut.game}`
    }
    slugSet.add(article.slug)
    newArticles.push(article)
    console.log(`✅  "${article.title}"`)
  } catch (e) {
    console.log(`❌  ${e.message}`)
  }
}

if (newArticles.length > 0) {
  const updated = [...db, ...newArticles]
  writeFileSync(dbPath, JSON.stringify(updated, null, 2), 'utf8')
  console.log(`\n✅  articles-db.json に ${newArticles.length} 件追加 (合計 ${updated.length} 件)`)
} else {
  console.log('\n⚠️  新規記事の生成に失敗しました')
}
