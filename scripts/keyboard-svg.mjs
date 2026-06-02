/**
 * QWERTY キーボード SVG ジェネレーター
 * 指定したキーを赤枠ハイライトして返す
 */

// ─── レイアウト定数 ───────────────────────────────────────────────────────────
const U  = 42   // 標準キー幅 (px)
const G  = 4    // キー間ギャップ
const S  = U+G  // ストライド
const KH = 38   // 標準キー高さ

// ─── キー定義 ─────────────────────────────────────────────────────────────────
// { ids, label, x, y, w, h }
// ids: 検索に使う正規化キー名の配列（すべて小文字）

const FN_Y = 6
const R1_Y = 44   // バッククォート行
const R2_Y = R1_Y + KH + G   // QWERTY行
const R3_Y = R2_Y + KH + G   // ASDF行
const R4_Y = R3_Y + KH + G   // ZXCV行
const R5_Y = R4_Y + KH + G   // スペース行

const KEYS = [
  // ─ Fnキー行 ─
  { ids:['escape','esc'],        label:'Esc',     x:0,           y:FN_Y, w:U,     h:32 },
  { ids:['f1'],                  label:'F1',      x:S*1.75,      y:FN_Y, w:U,     h:32 },
  { ids:['f2'],                  label:'F2',      x:S*1.75+S,    y:FN_Y, w:U,     h:32 },
  { ids:['f3'],                  label:'F3',      x:S*1.75+S*2,  y:FN_Y, w:U,     h:32 },
  { ids:['f4'],                  label:'F4',      x:S*1.75+S*3,  y:FN_Y, w:U,     h:32 },
  { ids:['f5'],                  label:'F5',      x:S*1.75+S*4+S*0.5, y:FN_Y, w:U, h:32 },
  { ids:['f6'],                  label:'F6',      x:S*1.75+S*5+S*0.5, y:FN_Y, w:U, h:32 },
  { ids:['f7'],                  label:'F7',      x:S*1.75+S*6+S*0.5, y:FN_Y, w:U, h:32 },
  { ids:['f8'],                  label:'F8',      x:S*1.75+S*7+S*0.5, y:FN_Y, w:U, h:32 },
  { ids:['f9'],                  label:'F9',      x:S*1.75+S*8+S,     y:FN_Y, w:U, h:32 },
  { ids:['f10'],                 label:'F10',     x:S*1.75+S*9+S,     y:FN_Y, w:U, h:32 },
  { ids:['f11'],                 label:'F11',     x:S*1.75+S*10+S,    y:FN_Y, w:U, h:32 },
  { ids:['f12'],                 label:'F12',     x:S*1.75+S*11+S,    y:FN_Y, w:U, h:32 },

  // ─ 数字行 (R1) ─
  { ids:['`','backtick'],        label:'`',       x:0,           y:R1_Y, w:U,     h:KH },
  { ids:['1'],                   label:'1',       x:S*1,         y:R1_Y, w:U,     h:KH },
  { ids:['2'],                   label:'2',       x:S*2,         y:R1_Y, w:U,     h:KH },
  { ids:['3'],                   label:'3',       x:S*3,         y:R1_Y, w:U,     h:KH },
  { ids:['4'],                   label:'4',       x:S*4,         y:R1_Y, w:U,     h:KH },
  { ids:['5'],                   label:'5',       x:S*5,         y:R1_Y, w:U,     h:KH },
  { ids:['6'],                   label:'6',       x:S*6,         y:R1_Y, w:U,     h:KH },
  { ids:['7'],                   label:'7',       x:S*7,         y:R1_Y, w:U,     h:KH },
  { ids:['8'],                   label:'8',       x:S*8,         y:R1_Y, w:U,     h:KH },
  { ids:['9'],                   label:'9',       x:S*9,         y:R1_Y, w:U,     h:KH },
  { ids:['0'],                   label:'0',       x:S*10,        y:R1_Y, w:U,     h:KH },
  { ids:['-','minus'],           label:'-',       x:S*11,        y:R1_Y, w:U,     h:KH },
  { ids:['=','equal'],           label:'=',       x:S*12,        y:R1_Y, w:U,     h:KH },
  { ids:['backspace'],           label:'BS',      x:S*13,        y:R1_Y, w:U*1.9, h:KH },

  // ─ QWERTY行 (R2) ─
  { ids:['tab'],                 label:'Tab',     x:0,           y:R2_Y, w:U*1.5, h:KH },
  { ids:['q'],                   label:'Q',       x:U*1.5+G,     y:R2_Y, w:U,     h:KH },
  { ids:['w'],                   label:'W',       x:U*1.5+G+S,   y:R2_Y, w:U,     h:KH },
  { ids:['e'],                   label:'E',       x:U*1.5+G+S*2, y:R2_Y, w:U,     h:KH },
  { ids:['r'],                   label:'R',       x:U*1.5+G+S*3, y:R2_Y, w:U,     h:KH },
  { ids:['t'],                   label:'T',       x:U*1.5+G+S*4, y:R2_Y, w:U,     h:KH },
  { ids:['y'],                   label:'Y',       x:U*1.5+G+S*5, y:R2_Y, w:U,     h:KH },
  { ids:['u'],                   label:'U',       x:U*1.5+G+S*6, y:R2_Y, w:U,     h:KH },
  { ids:['i'],                   label:'I',       x:U*1.5+G+S*7, y:R2_Y, w:U,     h:KH },
  { ids:['o'],                   label:'O',       x:U*1.5+G+S*8, y:R2_Y, w:U,     h:KH },
  { ids:['p'],                   label:'P',       x:U*1.5+G+S*9, y:R2_Y, w:U,     h:KH },
  { ids:['['],                   label:'[',       x:U*1.5+G+S*10,y:R2_Y, w:U,     h:KH },
  { ids:[']'],                   label:']',       x:U*1.5+G+S*11,y:R2_Y, w:U,     h:KH },
  { ids:['\\','backslash'],      label:'\\',      x:U*1.5+G+S*12,y:R2_Y, w:U*1.5, h:KH },

  // ─ ASDF行 (R3) ─
  { ids:['capslock','caps'],     label:'Caps',    x:0,           y:R3_Y, w:U*1.75,h:KH },
  { ids:['a'],                   label:'A',       x:U*1.75+G,    y:R3_Y, w:U,     h:KH },
  { ids:['s'],                   label:'S',       x:U*1.75+G+S,  y:R3_Y, w:U,     h:KH },
  { ids:['d'],                   label:'D',       x:U*1.75+G+S*2,y:R3_Y, w:U,     h:KH },
  { ids:['f'],                   label:'F',       x:U*1.75+G+S*3,y:R3_Y, w:U,     h:KH },
  { ids:['g'],                   label:'G',       x:U*1.75+G+S*4,y:R3_Y, w:U,     h:KH },
  { ids:['h'],                   label:'H',       x:U*1.75+G+S*5,y:R3_Y, w:U,     h:KH },
  { ids:['j'],                   label:'J',       x:U*1.75+G+S*6,y:R3_Y, w:U,     h:KH },
  { ids:['k'],                   label:'K',       x:U*1.75+G+S*7,y:R3_Y, w:U,     h:KH },
  { ids:['l'],                   label:'L',       x:U*1.75+G+S*8,y:R3_Y, w:U,     h:KH },
  { ids:[';','semicolon'],       label:';',       x:U*1.75+G+S*9,y:R3_Y, w:U,     h:KH },
  { ids:["'",'quote'],           label:"'",       x:U*1.75+G+S*10,y:R3_Y,w:U,     h:KH },
  { ids:['enter','return'],      label:'Enter',   x:U*1.75+G+S*11,y:R3_Y,w:U*2.2, h:KH },

  // ─ ZXCV行 (R4) ─
  { ids:['shift','lshift','left shift'], label:'Shift', x:0,         y:R4_Y, w:U*2.25,h:KH },
  { ids:['z'],                   label:'Z',       x:U*2.25+G,    y:R4_Y, w:U,     h:KH },
  { ids:['x'],                   label:'X',       x:U*2.25+G+S,  y:R4_Y, w:U,     h:KH },
  { ids:['c'],                   label:'C',       x:U*2.25+G+S*2,y:R4_Y, w:U,     h:KH },
  { ids:['v'],                   label:'V',       x:U*2.25+G+S*3,y:R4_Y, w:U,     h:KH },
  { ids:['b'],                   label:'B',       x:U*2.25+G+S*4,y:R4_Y, w:U,     h:KH },
  { ids:['n'],                   label:'N',       x:U*2.25+G+S*5,y:R4_Y, w:U,     h:KH },
  { ids:['m'],                   label:'M',       x:U*2.25+G+S*6,y:R4_Y, w:U,     h:KH },
  { ids:[',','comma'],           label:',',       x:U*2.25+G+S*7,y:R4_Y, w:U,     h:KH },
  { ids:['.','period'],          label:'.',       x:U*2.25+G+S*8,y:R4_Y, w:U,     h:KH },
  { ids:['/','slash'],           label:'/',       x:U*2.25+G+S*9,y:R4_Y, w:U,     h:KH },
  { ids:['rshift','right shift'],label:'Shift',   x:U*2.25+G+S*10,y:R4_Y,w:U*2.75,h:KH },

  // ─ スペース行 (R5) ─
  { ids:['ctrl','control','lctrl','⌘','cmd','command'], label:'Ctrl/⌘', x:0,       y:R5_Y, w:U*1.5, h:KH },
  { ids:['win','windows','super'],label:'Win',    x:S*1.5,       y:R5_Y, w:U,     h:KH },
  { ids:['alt','option','⌥'],    label:'Alt/⌥',  x:S*1.5+S,     y:R5_Y, w:U*1.5, h:KH },
  { ids:['space',' ','spacebar'], label:'Space',  x:S*1.5+S+U*1.5+G, y:R5_Y, w:U*5.5, h:KH },
  { ids:['ralt','right alt'],    label:'Alt',     x:S*1.5+S+U*1.5+G+U*5.5+G, y:R5_Y, w:U*1.5, h:KH },
  { ids:['rwin'],                label:'Win',     x:S*1.5+S+U*1.5+G+U*5.5+G+U*1.5+G, y:R5_Y, w:U, h:KH },
  { ids:['rctrl'],               label:'Ctrl',    x:S*1.5+S+U*1.5+G+U*5.5+G+U*1.5+G+S, y:R5_Y, w:U*1.75, h:KH },
]

const KB_W = 760
const KB_H = R5_Y + KH + 8

// ─── キー名正規化 ─────────────────────────────────────────────────────────────
function normalizeKey(k) {
  return k.toLowerCase().trim()
    .replace(/^ctrl\+?$/i, 'ctrl')
    .replace(/^control$/i, 'ctrl')
    .replace(/^cmd$/i, '⌘')
    .replace(/^command$/i, '⌘')
    .replace(/^opt$/i, '⌥')
    .replace(/^option$/i, '⌥')
    .replace(/^del$/i, 'delete')
    .replace(/^ret$/i, 'enter')
    .replace(/^bs$/i, 'backspace')
}

function findKey(rawName) {
  const n = normalizeKey(rawName)
  return KEYS.find(k => k.ids.includes(n))
}

// ─── SVG生成 ──────────────────────────────────────────────────────────────────
export function generateKeyboardSVG(highlightKeys = []) {
  const hlSet = new Set(highlightKeys.map(k => normalizeKey(k)))

  const keySvg = KEYS.map(key => {
    const isHighlight = key.ids.some(id => hlSet.has(id))
    const fill     = isHighlight ? '#dc2626' : '#f3f4f6'
    const stroke   = isHighlight ? '#991b1b' : '#d1d5db'
    const textFill = isHighlight ? '#ffffff' : '#374151'
    const strokeW  = isHighlight ? 2 : 1
    const fontSize = key.w > 55 ? 11 : key.w > 42 ? 10 : 9

    return `  <g>
    <rect x="${key.x.toFixed(1)}" y="${key.y}" width="${key.w.toFixed(1)}" height="${key.h}"
      rx="4" ry="4" fill="${fill}" stroke="${stroke}" stroke-width="${strokeW}"/>
    <text x="${(key.x + key.w/2).toFixed(1)}" y="${(key.y + key.h/2 + 4).toFixed(1)}"
      font-family="'Segoe UI',Arial,sans-serif" font-size="${fontSize}" font-weight="${isHighlight ? '700' : '500'}"
      fill="${textFill}" text-anchor="middle">${key.label}</text>
  </g>`
  }).join('\n')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${KB_W} ${KB_H}"
  width="${KB_W}" height="${KB_H}" role="img"
  aria-label="キーボード図: ${highlightKeys.join('+')}">
  <rect width="${KB_W}" height="${KB_H}" rx="10" ry="10" fill="#e5e7eb"/>
${keySvg}
</svg>`
}

// ─── ショートカット説明用の表示 ──────────────────────────────────────────────
export function generateKeyBadgesHTML(keys) {
  return keys.map(k =>
    `<kbd style="display:inline-block;background:#f3f4f6;border:1px solid #d1d5db;border-bottom-width:2px;border-radius:5px;padding:2px 10px;font-family:monospace;font-size:0.95rem;color:#111">${k}</kbd>`
  ).join('<span style="margin:0 4px;color:#9ca3af;font-size:0.85rem">+</span>')
}
