// =========================================================
//  gen-pwa-icons.js — PWA用アイコン生成スクリプト
//  npx playwright test scripts/gen-pwa-icons.js の代わりに
//  直接 Node.js + @playwright/test の chromium を使用
// =========================================================
import { chromium } from '@playwright/test'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const publicDir  = path.resolve(__dirname, '../public')

// アイコンのキャンバス描画HTML
function makeHtml(size) {
  const m   = Math.round(size * 0.055)   // margin
  const r   = Math.round(size * 0.18)    // corner radius
  const lw  = Math.round(size * 0.048)   // border width
  const em  = Math.round(size * 0.46)    // emoji font size
  const ey  = Math.round(size * 0.50)    // emoji center y
  const tx  = Math.round(size * 0.15)    // text font size

  return `<!DOCTYPE html>
<html>
<head><style>*{margin:0;padding:0;overflow:hidden;}</style></head>
<body style="background:#0f0e17;width:${size}px;height:${size}px;">
<canvas id="c" width="${size}" height="${size}"></canvas>
<script>
const c   = document.getElementById('c')
const ctx = c.getContext('2d')
const S   = ${size}

// ── 背景 ──
ctx.fillStyle = '#0f0e17'
ctx.fillRect(0, 0, S, S)

// ── 内側の丸角矩形（グレーダーク） ──
function roundRect(x,y,w,h,r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

roundRect(${m}, ${m}, S - ${m * 2}, S - ${m * 2}, ${r})
ctx.fillStyle = '#1a1a2e'
ctx.fill()

// グラデーション枠線
const grad = ctx.createLinearGradient(0, 0, S, S)
grad.addColorStop(0,    '#e63946')
grad.addColorStop(0.33, '#f4a261')
grad.addColorStop(0.66, '#2a9d8f')
grad.addColorStop(1,    '#e63946')
ctx.strokeStyle = grad
ctx.lineWidth   = ${lw}
roundRect(${m}, ${m}, S - ${m * 2}, S - ${m * 2}, ${r})
ctx.stroke()

// ── キーボード絵文字 ──
ctx.font         = '${em}px serif'
ctx.textAlign    = 'center'
ctx.textBaseline = 'middle'
ctx.fillText('⌨️', S / 2, ${ey})

${size >= 300 ? `
// ── テキスト（512のみ） ──
ctx.font         = 'bold ${tx}px "Segoe UI", sans-serif'
ctx.fillStyle    = 'rgba(255,255,255,0.65)'
ctx.textAlign    = 'center'
ctx.textBaseline = 'middle'
ctx.fillText('PPT道場', S / 2, S * 0.84)
` : ''}
</script>
</body>
</html>`
}

const browser = await chromium.launch()

for (const size of [192, 512]) {
  const page = await browser.newPage()
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(makeHtml(size), { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(200)   // 絵文字レンダリング待機

  const canvas = await page.$('#c')
  const outPath = `${publicDir}/icon-${size}.png`
  await canvas.screenshot({ path: outPath, omitBackground: false })
  await page.close()
  console.log(`✅ 生成: icon-${size}.png`)
}

await browser.close()
console.log('🎉 PWAアイコン生成完了')
