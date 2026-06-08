// =========================================================
//  supabase.js — オンラインランキング・フィードバック（Supabase REST API）
//  環境変数:
//    VITE_SUPABASE_URL      = https://xxxxxxxx.supabase.co
//    VITE_SUPABASE_ANON_KEY = sb_publishable_xxx or eyJxxxxxxx
// =========================================================

const URL_BASE = import.meta.env.VITE_SUPABASE_URL     || 'https://gqdkhvipjcpwfzeyczxx.supabase.co'
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qIsUonaI-u-Pmg7Xn4OS6Q_oYBgzdoJ'

/** Supabase が有効かどうか */
export const isOnlineEnabled = () => !!(URL_BASE && ANON_KEY)

// =========================================================
//  共通フェッチ
// =========================================================
async function sbFetch(path, opts = {}) {
  const res = await fetch(URL_BASE + path, {
    ...opts,
    headers: {
      'apikey':        ANON_KEY,
      'Authorization': 'Bearer ' + ANON_KEY,
      'Content-Type':  'application/json',
      ...opts.headers,
    },
  })
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`)
  return res.status === 204 ? null : res.json()
}

// =========================================================
//  スコア保存（ゲーム終了時）
// =========================================================
export async function saveOnlineScore({ name, score, correct, wrong, maxCombo, acc, diff, ts, game }) {
  if (!isOnlineEnabled()) return
  await sbFetch('/rest/v1/scores', {
    method:  'POST',
    headers: { 'Prefer': 'return=minimal' },
    body: JSON.stringify({ name, score, correct, wrong, max_combo: maxCombo, acc, diff, ts, game }),
  }).catch(err => console.warn('[Supabase] score save failed:', err))
}

// =========================================================
//  ランキング取得（難易度別 TOP 50）
// =========================================================
// =========================================================
//  フィードバック送信
// =========================================================
export async function submitFeedback({ type, op_name, keys, message, sender_name }) {
  if (!isOnlineEnabled()) return false
  try {
    await sbFetch('/rest/v1/feedback', {
      method:  'POST',
      headers: { 'Prefer': 'return=minimal' },
      body: JSON.stringify({ type, op_name, keys, message, sender_name }),
    })
    return true
  } catch (err) {
    console.warn('[Supabase] feedback submit failed:', err)
    return false
  }
}

export async function getOnlineRankings(diff, game) {
  if (!isOnlineEnabled()) return []
  const qs = new URLSearchParams({
    diff:   `eq.${diff}`,
    game:   `eq.${game}`,
    order:  'score.desc',
    limit:  '50',
    select: 'name,score,correct,wrong,max_combo,acc,created_at',
  })
  const data = await sbFetch(`/rest/v1/scores?${qs}`)
    .catch(err => { console.warn('[Supabase] ranking fetch failed:', err); return [] })

  return (data ?? []).map(r => ({
    name:     r.name,
    score:    r.score,
    correct:  r.correct ?? 0,
    wrong:    r.wrong   ?? 0,
    maxCombo: r.max_combo ?? 0,
    acc:      r.acc ?? 0,
    date:     new Date(r.created_at).toLocaleDateString('ja-JP'),
  }))
}
