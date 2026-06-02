// =========================================================
//  shortcuts-list.js — ショートカット一覧画面
// =========================================================
import { SHORTCUTS } from '../data/shortcuts.js'
import { showScreen, goTitle } from './screens.js'
import { escHtml } from '../utils/helpers.js'

// 難易度フィルター設定
const FILTER_LVS = {
  all:    [1, 2, 3],
  easy:   [1],
  medium: [2],
  hard:   [3],
}

let currentFilter = 'all'

// =========================================================
//  画面表示
// =========================================================
export function showShortcutsList() {
  showScreen('shortcuts')
  _updateTabs(currentFilter)
  renderShortcuts(currentFilter)
}

export function shortcutsBack() {
  goTitle()
}

// =========================================================
//  フィルター切替
// =========================================================
export function filterShortcuts(filter) {
  currentFilter = filter
  _updateTabs(filter)
  renderShortcuts(filter)
}

function _updateTabs(filter) {
  document.querySelectorAll('.sc-tab').forEach(t => t.classList.remove('active'))
  document.querySelector('.sc-tab.' + filter)?.classList.add('active')
}

// =========================================================
//  一覧レンダリング（カテゴリー別グループ）
// =========================================================
export function renderShortcuts(filter) {
  const wrap  = document.getElementById('shortcuts-content')
  const lvs   = FILTER_LVS[filter] ?? [1, 2, 3]
  const items = SHORTCUTS.filter(s => lvs.includes(s.lv))

  // カテゴリー順（登場順を維持）
  const categoryOrder = []
  const byCategory    = {}
  items.forEach(s => {
    if (!byCategory[s.cat]) {
      categoryOrder.push(s.cat)
      byCategory[s.cat] = []
    }
    byCategory[s.cat].push(s)
  })

  const LV_BADGE = { 1: { label: 'かんたん', cls: 'lv-easy' }, 2: { label: 'ふつう', cls: 'lv-medium' }, 3: { label: 'むずかしい', cls: 'lv-hard' } }

  let html = `<div class="sc-count">📚 ${items.length} 件のショートカット</div>`

  categoryOrder.forEach(cat => {
    const shortcuts = byCategory[cat]
    html += `<div class="sc-cat-heading">${escHtml(cat)}<span class="sc-cat-count">${shortcuts.length}</span></div>`
    shortcuts.forEach(s => {
      const keys   = s.keys.map(k => `<span class="kc">${escHtml(k)}</span>`).join('<span class="kc-plus">+</span>')
      const badge  = filter === 'all' ? `<span class="sc-lv-badge ${LV_BADGE[s.lv].cls}">${LV_BADGE[s.lv].label}</span>` : ''
      html += `
        <div class="sc-row">
          <span class="sc-op">${escHtml(s.op)}</span>
          <span class="sc-right">
            <span class="key-chips">${keys}</span>
            ${badge}
          </span>
        </div>`
    })
  })

  wrap.innerHTML = html
}
