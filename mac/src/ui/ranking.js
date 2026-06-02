// =========================================================
//  ランキング画面（ローカル + オンライン対応）
// =========================================================
import { G } from '../core/state.js'
import { getRankings, clearRankings, getPlayerName } from '../core/storage.js'
import { escHtml } from '../utils/helpers.js'
import { showModal } from './modal.js'
import { showScreen, goTitle } from './screens.js'
import { getOnlineRankings, isOnlineEnabled } from '../utils/supabase.js'

export let currentRankDiff = 'easy'
let rankMode = 'online'  // 'online' | 'local'  ← グローバルをデフォルトに

// =========================================================
//  画面表示
// =========================================================
export function showRanking(diff) {
  currentRankDiff = diff || 'easy'
  G.rankFrom      = G.rankFrom || 'title'
  showScreen('ranking')
  document.querySelectorAll('.rank-tab').forEach(t => t.classList.remove('active'))
  document.querySelector('.rank-tab.' + currentRankDiff).classList.add('active')

  // Supabase未設定の場合はローカルに強制フォールバック
  if (!isOnlineEnabled()) rankMode = 'local'

  // ボタン表示・アクティブ状態を更新
  const onlineBtn = document.getElementById('rmt-online')
  const localBtn  = document.getElementById('rmt-local')
  if (onlineBtn) {
    onlineBtn.style.display = isOnlineEnabled() ? '' : 'none'
    onlineBtn.classList.toggle('active', rankMode === 'online')
  }
  if (localBtn) {
    localBtn.classList.toggle('active', rankMode === 'local')
  }

  renderRankTable(currentRankDiff)
}

export function showRankTab(diff) {
  currentRankDiff = diff
  document.querySelectorAll('.rank-tab').forEach(t => t.classList.remove('active'))
  document.querySelector('.rank-tab.' + diff).classList.add('active')
  renderRankTable(diff)
}

export function rankBack() {
  if (G.rankFrom === 'result') {
    showScreen('result')
  } else {
    goTitle()
  }
}

// =========================================================
//  ローカル / オンライン モード切替
// =========================================================
export function setRankMode(mode) {
  rankMode = mode
  document.getElementById('rmt-local')?.classList.toggle('active',  mode === 'local')
  document.getElementById('rmt-online')?.classList.toggle('active', mode === 'online')
  renderRankTable(currentRankDiff)
}

// =========================================================
//  テーブル描画（ローカル or オンライン）
// =========================================================
export async function renderRankTable(diff) {
  const wrap = document.getElementById('rank-table-wrap')

  if (rankMode === 'online') {
    // ローディング表示
    wrap.innerHTML = `
      <div class="rank-empty">
        <div class="rank-empty-icon">⏳</div>
        オンラインランキング読み込み中…
      </div>`

    const ranks  = await getOnlineRankings(diff, 'mac')
    const myName = getPlayerName() || 'ゲスト'
    _renderRows(wrap, ranks, myName, '🌐 グローバルランキング（上位50名）')
  } else {
    const ranks  = getRankings(diff)
    const myName = getPlayerName() || 'ゲスト'
    _renderRows(wrap, ranks, myName, null)
  }
}

function _renderRows(wrap, ranks, myName, subtitle) {
  if (ranks.length === 0) {
    wrap.innerHTML = `
      <div class="rank-empty">
        <div class="rank-empty-icon">📋</div>
        まだ記録がありません<br>
        <small>${rankMode === 'online' ? 'インターネット接続を確認してください' : 'ゲームをプレイしてランキングに登録しよう！'}</small>
      </div>`
    return
  }

  const medals = { 0: '🥇', 1: '🥈', 2: '🥉' }
  let html = subtitle
    ? `<div class="rank-subtitle">${subtitle}</div>`
    : ''

  html += `
    <div class="rank-row-header">
      <span>順位</span>
      <span>名前</span>
      <span style="text-align:right">スコア</span>
      <span style="text-align:right">正解率</span>
      <span class="rank-col-combo" style="text-align:right">最大コンボ</span>
      <span class="rank-col-date"  style="text-align:right">日付</span>
    </div>`

  ranks.slice(0, 50).forEach((r, i) => {
    const posIcon = medals[i] ?? (i + 1)
    const isMine  = r.name === myName
    const rowCls  = isMine ? 'rank-row mine' : i < 3 ? `rank-row top${i + 1}` : 'rank-row'
    const youTag  = isMine ? '<span class="you-tag">YOU</span>' : ''
    html += `
      <div class="${rowCls}">
        <span class="rank-pos">${posIcon}</span>
        <span class="rank-name">${escHtml(r.name)}${youTag}</span>
        <span class="rank-score">${r.score.toLocaleString()}</span>
        <span class="rank-acc">${r.acc}%</span>
        <span class="rank-combo rank-col-combo">${r.maxCombo}</span>
        <span class="rank-date  rank-col-date">${r.date}</span>
      </div>`
  })
  wrap.innerHTML = html
}

// =========================================================
//  ランキングクリア
// =========================================================
export function confirmClearRanks() {
  showModal(
    '🗑', 'ランキングをクリア',
    '全難易度のランキングデータを\n削除します。よろしいですか？',
    '全削除する',
    () => { clearRankings(); renderRankTable(currentRankDiff) }
  )
}
