// gen-ogp.mjs — Playwright でOGP画像（1200×630）を生成
import { chromium } from '@playwright/test'
import { writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))

const GAMES = [
  {
    name: 'Excel道場',
    sub:  'Excel ショートカットキー 練習ゲーム',
    color1: '#217346',
    color2: '#70ad47',
    color3: '#1e5631',
    emoji: '📊',
    url:  'shortcut-dojo.com/excel/',
    out:  join(__dir, 'public/excel/ogp.png'),
  },
  {
    name: 'Word道場',
    sub:  'Word ショートカットキー 練習ゲーム',
    color1: '#2b579a',
    color2: '#5b9bd5',
    color3: '#1c4587',
    emoji: '📝',
    url:  'shortcut-dojo.com/word/',
    out:  join(__dir, 'public/word/ogp.png'),
  },
]

function html(g) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700;900&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    font-family: 'Noto Sans JP', 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #0f0e17 0%, #1a1a2e 50%, #0d1120 100%);
    color: #fff;
    position: relative;
  }
  .top-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 8px;
    background: linear-gradient(90deg, ${g.color1}, ${g.color2}, ${g.color3}, ${g.color1});
  }
  .glow {
    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(ellipse at 50% 38%, ${g.color1}33 0%, ${g.color1}08 55%, transparent 75%);
  }
  .content {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 0;
  }
  .site-label {
    font-size: 22px; letter-spacing: 6px; color: #8892b0;
    margin-bottom: 12px;
  }
  .emoji { font-size: 72px; margin-bottom: 16px; line-height: 1; }
  .game-name {
    font-size: 96px; font-weight: 900; line-height: 1;
    background: linear-gradient(135deg, ${g.color2}, #fff);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 40px ${g.color1});
    margin-bottom: 14px;
  }
  .game-sub {
    font-size: 28px; color: #8892b0; margin-bottom: 32px;
  }
  .features {
    display: flex; gap: 20px;
  }
  .feat {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 50px;
    padding: 8px 22px;
    font-size: 20px; font-weight: 700; color: #fff;
  }
  .url {
    position: absolute; bottom: 20px; right: 28px;
    font-size: 18px; color: rgba(255,255,255,0.25); font-family: monospace;
  }
  .dojo-tag {
    position: absolute; bottom: 20px; left: 28px;
    font-size: 18px; color: rgba(255,255,255,0.25);
  }
</style>
</head>
<body>
  <div class="top-bar"></div>
  <div class="glow"></div>
  <div class="content">
    <div class="site-label">🥋  ショートカット道場</div>
    <div class="emoji">${g.emoji}</div>
    <div class="game-name">${g.name}</div>
    <div class="game-sub">${g.sub}</div>
    <div class="features">
      <span class="feat">🌱 かんたん</span>
      <span class="feat">🔥 ふつう</span>
      <span class="feat">⚡ むずかしい</span>
      <span class="feat">🏆 ランキング</span>
      <span class="feat">✨ 無料</span>
    </div>
  </div>
  <div class="url">${g.url}</div>
  <div class="dojo-tag">ショートカット道場</div>
</body>
</html>`
}

const browser = await chromium.launch()
const page    = await browser.newPage()
await page.setViewportSize({ width: 1200, height: 630 })

for (const g of GAMES) {
  await page.setContent(html(g), { waitUntil: 'networkidle' })
  // フォント読み込みを少し待つ
  await page.waitForTimeout(1500)
  const buf = await page.screenshot({ type: 'png' })
  mkdirSync(dirname(g.out), { recursive: true })
  writeFileSync(g.out, buf)
  console.log(`✅ ${g.name} OGP → ${g.out}`)
}

await browser.close()
console.log('完了')
