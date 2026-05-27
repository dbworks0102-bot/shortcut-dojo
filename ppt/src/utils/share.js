// =========================================================
//  share.js — スコアカード画像生成 + SNSシェア
// =========================================================

const W = 1200
const H = 630

const GRADE_COLORS = {
  S: '#ffd700',
  A: '#ff6b9d',
  B: '#f4a261',
  C: '#2a9d8f',
  D: '#8892b0',
}

const DIFF_LABEL = {
  easy:   '🌱 かんたん',
  medium: '🔥 ふつう',
  hard:   '⚡ むずかしい',
}

const DIFF_LABEL_TEXT = {
  easy:   'かんたん',
  medium: 'ふつう',
  hard:   'むずかしい',
}

// =========================================================
//  Canvas でスコアカード画像を生成して Blob を返す
// =========================================================
export async function generateShareImage({ grade, score, correct, wrong, acc, maxCombo, diff, playerName }) {
  // フォント読み込み完了を待つ
  await document.fonts.ready

  const canvas  = document.createElement('canvas')
  canvas.width  = W
  canvas.height = H
  const ctx     = canvas.getContext('2d')

  const gc = GRADE_COLORS[grade] ?? '#8892b0'

  // ── 背景グラデーション ──
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0,   '#0f0e17')
  bg.addColorStop(0.5, '#1a1a2e')
  bg.addColorStop(1,   '#0d1120')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // ── グレードカラーのグロー（背景） ──
  const glow = ctx.createRadialGradient(W / 2, H * 0.38, 20, W / 2, H * 0.38, 380)
  glow.addColorStop(0,   gc + '44')
  glow.addColorStop(0.6, gc + '11')
  glow.addColorStop(1,   'transparent')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, H)

  // ── 上部カラーバー ──
  const bar = ctx.createLinearGradient(0, 0, W, 0)
  bar.addColorStop(0,    '#e63946')
  bar.addColorStop(0.33, '#f4a261')
  bar.addColorStop(0.66, '#2a9d8f')
  bar.addColorStop(1,    '#e63946')
  ctx.fillStyle = bar
  ctx.fillRect(0, 0, W, 8)

  // ── ロゴ ──
  ctx.textAlign    = 'center'
  ctx.font         = 'bold 44px "Noto Sans JP", "Segoe UI", sans-serif'
  ctx.fillStyle    = '#ffffff'
  ctx.fillText('🥋  PPT道場', W / 2, 82)

  ctx.font         = '26px "Noto Sans JP", "Segoe UI", sans-serif'
  ctx.fillStyle    = '#8892b0'
  ctx.fillText('パワポ ショートカットキー 練習ゲーム', W / 2, 122)

  // ── グレード（巨大） ──
  ctx.font         = 'bold 280px "Noto Sans JP", "Segoe UI", sans-serif'
  ctx.fillStyle    = gc
  ctx.shadowColor  = gc
  ctx.shadowBlur   = 80
  ctx.textAlign    = 'center'
  ctx.fillText(grade, W / 2, 400)
  ctx.shadowBlur   = 0

  // ── スコア ──
  ctx.font         = 'bold 68px "Noto Sans JP", "Segoe UI", sans-serif'
  ctx.fillStyle    = '#f4a261'
  ctx.fillText(score.toLocaleString() + ' 点', W / 2, 474)

  // ── 難易度 ──
  ctx.font         = '28px "Noto Sans JP", "Segoe UI", sans-serif'
  ctx.fillStyle    = '#8892b0'
  ctx.fillText(DIFF_LABEL[diff] ?? diff, W / 2, 516)

  // ── 統計 3列 ──
  const stats  = [
    { label: '✅ 正解',     value: correct + '問'  },
    { label: '🎯 正解率',   value: acc + '%'         },
    { label: '⚡ 最大コンボ', value: maxCombo + 'x' },
  ]
  const colW = W / stats.length
  const statY = 565

  stats.forEach((s, i) => {
    const cx = colW * i + colW / 2

    // 縦仕切り線
    if (i > 0) {
      ctx.strokeStyle = 'rgba(255,255,255,0.10)'
      ctx.lineWidth   = 1
      ctx.beginPath()
      ctx.moveTo(colW * i, statY - 26)
      ctx.lineTo(colW * i, statY + 30)
      ctx.stroke()
    }

    ctx.textAlign    = 'center'
    ctx.font         = '22px "Noto Sans JP", "Segoe UI", sans-serif'
    ctx.fillStyle    = '#8892b0'
    ctx.fillText(s.label, cx, statY - 8)

    ctx.font         = 'bold 36px "Noto Sans JP", "Segoe UI", sans-serif'
    ctx.fillStyle    = '#ffffff'
    ctx.fillText(s.value, cx, statY + 28)
  })

  // ── URL ──
  ctx.font         = '20px monospace'
  ctx.fillStyle    = 'rgba(255,255,255,0.22)'
  ctx.textAlign    = 'right'
  ctx.fillText('shortcut-dojo.com/ppt/', W - 36, H - 22)

  // ── プレイヤー名 ──
  if (playerName && playerName !== 'ゲスト') {
    ctx.font         = '20px "Noto Sans JP", "Segoe UI", sans-serif'
    ctx.fillStyle    = 'rgba(255,255,255,0.38)'
    ctx.textAlign    = 'left'
    ctx.fillText('👤 ' + playerName, 36, H - 22)
  }

  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
}

// =========================================================
//  シェア実行
//  スマホ: Web Share API（画像付き）
//  PC    : X(Twitter) / 画像ダウンロード
// =========================================================
export async function shareScore(params) {
  const { grade, score, acc, diff, playerName, correct, wrong, maxCombo } = params

  const shareText =
    `🥋 PPT道場で挑戦！\n` +
    `グレード: ${grade}  スコア: ${score.toLocaleString()}点\n` +
    `正解率: ${acc}%  最大コンボ: ${maxCombo}x\n` +
    `難易度: ${DIFF_LABEL_TEXT[diff] ?? diff}\n` +
    `#PPT道場 #ショートカット練習`

  const shareUrl = 'https://shortcut-dojo.com/ppt/'

  // ── Web Share API (スマホ・画像付き) ──
  if (navigator.share) {
    try {
      const blob = await generateShareImage(params)
      const file = new File([blob], 'ppt-dojo-score.png', { type: 'image/png' })

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ title: 'PPT道場 スコア', text: shareText, files: [file], url: shareUrl })
        return { method: 'native-with-image' }
      }
    } catch (e) {
      if (e.name === 'AbortError') return { method: 'aborted' }
      // 画像共有失敗 → テキストのみで再試行
    }

    try {
      await navigator.share({ title: 'PPT道場 スコア', text: shareText, url: shareUrl })
      return { method: 'native-text-only' }
    } catch (e2) {
      if (e2.name === 'AbortError') return { method: 'aborted' }
    }
  }

  // ── PC: X(Twitter) ポップアップ + 画像ダウンロード ──
  const twitterUrl =
    'https://twitter.com/intent/tweet?' +
    'text='  + encodeURIComponent(shareText + '\n') +
    '&url='  + encodeURIComponent(shareUrl)

  window.open(twitterUrl, '_blank', 'width=570,height=460,noopener,noreferrer')

  // 画像も自動ダウンロード
  try {
    const blob = await generateShareImage(params)
    const a    = document.createElement('a')
    a.href     = URL.createObjectURL(blob)
    a.download = 'ppt-dojo-score.png'
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 5000)
  } catch (_) { /* 画像生成失敗は無視 */ }

  return { method: 'twitter' }
}
