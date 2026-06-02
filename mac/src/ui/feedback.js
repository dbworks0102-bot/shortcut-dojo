// =========================================================
//  feedback.js — リクエスト送信画面
// =========================================================
import { showScreen, goTitle } from './screens.js'
import { submitFeedback }      from '../utils/supabase.js'
import { showShortcutsList }   from './shortcuts-list.js'

let _prevScreen  = 'title'
let _currentType = '追加'

// =========================================================
//  画面表示 / 戻る
// =========================================================
export function showFeedback(from = 'title') {
  _prevScreen  = from
  _currentType = '追加'
  showScreen('feedback')

  // フォームをリセット
  document.getElementById('fb-form')?.reset()
  _syncTypeBtns()
  document.getElementById('fb-result').style.display = 'none'
  document.getElementById('fb-form').style.display   = ''
  document.getElementById('fb-error').textContent    = ''
}

export function feedbackBack() {
  if (_prevScreen === 'shortcuts') showShortcutsList()
  else                              goTitle()
}

// =========================================================
//  種類ボタン切替
// =========================================================
export function setFeedbackType(type) {
  _currentType = type
  _syncTypeBtns()
}

function _syncTypeBtns() {
  document.querySelectorAll('.fb-type-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.type === _currentType)
  )
}

// =========================================================
//  フォーム送信
// =========================================================
export async function submitFeedbackForm(e) {
  e.preventDefault()

  const opName  = document.getElementById('fb-op').value.trim()
  const keys    = document.getElementById('fb-keys').value.trim()
  const message = document.getElementById('fb-message').value.trim()
  const name    = document.getElementById('fb-name').value.trim()

  // バリデーション
  if (!opName && !message) {
    document.getElementById('fb-error').textContent = '操作名または詳細メッセージを入力してください'
    return
  }
  document.getElementById('fb-error').textContent = ''

  const btn = document.getElementById('fb-submit')
  btn.disabled    = true
  btn.textContent = '⏳ 送信中…'

  const ok = await submitFeedback({
    type:        _currentType,
    op_name:     opName  || null,
    keys:        keys    || null,
    message:     message || null,
    sender_name: name    || null,
  })

  btn.disabled    = false
  btn.textContent = '📨 送信する'

  if (ok) {
    document.getElementById('fb-form').style.display   = 'none'
    document.getElementById('fb-result').style.display = ''
  } else {
    document.getElementById('fb-error').textContent = '送信に失敗しました。通信環境を確認してもう一度お試しください。'
  }
}
