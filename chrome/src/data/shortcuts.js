// =========================================================
//  shortcuts.js — Chromeショートカットデータ
//  lv 1: かんたん  lv 2: ふつう  lv 3: むずかしい
// =========================================================

export const SHORTCUTS = [
  // ─── タブ操作 ───
  { op: "新しいタブを開く",               keys: ["Ctrl","T"],               cat: "タブ操作",         lv: 1 },
  { op: "タブを閉じる",                   keys: ["Ctrl","W"],               cat: "タブ操作",         lv: 1 },
  { op: "閉じたタブを元に戻す",           keys: ["Ctrl","Shift","T"],       cat: "タブ操作",         lv: 1 },
  { op: "次のタブに切り替え",             keys: ["Ctrl","Tab"],             cat: "タブ操作",         lv: 1 },
  { op: "前のタブに切り替え",             keys: ["Ctrl","Shift","Tab"],     cat: "タブ操作",         lv: 2 },
  { op: "1番目のタブに切り替え",          keys: ["Ctrl","1"],               cat: "タブ操作",         lv: 2 },
  { op: "最後のタブに切り替え",           keys: ["Ctrl","9"],               cat: "タブ操作",         lv: 2 },
  { op: "タブをピン留め",                 keys: ["Alt","P"],                cat: "タブ操作",         lv: 3 },
  { op: "タブをミュート",                 keys: ["Ctrl","M"],               cat: "タブ操作",         lv: 3 },
  { op: "リンクを新しいタブで開く",       keys: ["Ctrl","クリック"],        cat: "タブ操作",         lv: 2 },
  { op: "リンクをバックグラウンドで開く", keys: ["Ctrl","Shift","クリック"],cat: "タブ操作",         lv: 3 },

  // ─── ウィンドウ操作 ───
  { op: "新しいウィンドウを開く",         keys: ["Ctrl","N"],               cat: "ウィンドウ操作",   lv: 1 },
  { op: "シークレットウィンドウを開く",   keys: ["Ctrl","Shift","N"],       cat: "ウィンドウ操作",   lv: 1 },
  { op: "ウィンドウを閉じる",             keys: ["Alt","F4"],               cat: "ウィンドウ操作",   lv: 2 },
  { op: "Chromeを終了",                   keys: ["Ctrl","Shift","Q"],       cat: "ウィンドウ操作",   lv: 3 },
  { op: "全画面表示の切り替え",           keys: ["F11"],                    cat: "ウィンドウ操作",   lv: 2 },

  // ─── ページ操作 ───
  { op: "ページを更新",                   keys: ["Ctrl","R"],               cat: "ページ操作",       lv: 1 },
  { op: "キャッシュを無視して更新",       keys: ["Ctrl","Shift","R"],       cat: "ページ操作",       lv: 2 },
  { op: "前のページに戻る",               keys: ["Alt","←"],               cat: "ページ操作",       lv: 1 },
  { op: "次のページに進む",               keys: ["Alt","→"],               cat: "ページ操作",       lv: 1 },
  { op: "ページ内を検索",                 keys: ["Ctrl","F"],               cat: "ページ操作",       lv: 1 },
  { op: "ページを印刷",                   keys: ["Ctrl","P"],               cat: "ページ操作",       lv: 1 },
  { op: "ページを保存",                   keys: ["Ctrl","S"],               cat: "ページ操作",       lv: 1 },
  { op: "ページ先頭に移動",               keys: ["Ctrl","Home"],            cat: "ページ操作",       lv: 2 },
  { op: "ページ末尾に移動",               keys: ["Ctrl","End"],             cat: "ページ操作",       lv: 2 },
  { op: "ページを拡大",                   keys: ["Ctrl","+"],               cat: "ページ操作",       lv: 1 },
  { op: "ページを縮小",                   keys: ["Ctrl","-"],               cat: "ページ操作",       lv: 1 },
  { op: "表示倍率をリセット",             keys: ["Ctrl","0"],               cat: "ページ操作",       lv: 2 },
  { op: "ページのソースを表示",           keys: ["Ctrl","U"],               cat: "ページ操作",       lv: 3 },

  // ─── アドレスバー・検索 ───
  { op: "アドレスバーにフォーカス",       keys: ["Ctrl","L"],               cat: "アドレスバー",     lv: 1 },
  { op: "アドレスバーで検索",             keys: ["Ctrl","K"],               cat: "アドレスバー",     lv: 2 },
  { op: "現在のURLをコピー",              keys: ["Ctrl","L","Ctrl","C"],    cat: "アドレスバー",     lv: 2 },

  // ─── 開発・ツール ───
  { op: "デベロッパーツールを開く",       keys: ["F12"],                    cat: "ツール",           lv: 2 },
  { op: "タスクマネージャーを開く",       keys: ["Shift","Esc"],            cat: "ツール",           lv: 3 },
  { op: "ダウンロードを表示",             keys: ["Ctrl","J"],               cat: "ツール",           lv: 2 },
  { op: "履歴を表示",                     keys: ["Ctrl","H"],               cat: "ツール",           lv: 1 },
  { op: "ブックマーク マネージャー",      keys: ["Ctrl","Shift","O"],       cat: "ツール",           lv: 2 },
  { op: "ブックマークに追加",             keys: ["Ctrl","D"],               cat: "ツール",           lv: 1 },
  { op: "全ページをブックマーク追加",     keys: ["Ctrl","Shift","D"],       cat: "ツール",           lv: 3 },
  { op: "設定を開く",                     keys: ["Alt","E","S"],            cat: "ツール",           lv: 3 },
  { op: "拡張機能を管理",                 keys: ["Alt","E","E"],            cat: "ツール",           lv: 3 },

  // ─── 基本操作 ───
  { op: "コピー",                         keys: ["Ctrl","C"],               cat: "基本操作",         lv: 1 },
  { op: "貼り付け",                       keys: ["Ctrl","V"],               cat: "基本操作",         lv: 1 },
  { op: "切り取り",                       keys: ["Ctrl","X"],               cat: "基本操作",         lv: 1 },
  { op: "すべて選択",                     keys: ["Ctrl","A"],               cat: "基本操作",         lv: 1 },
  { op: "元に戻す",                       keys: ["Ctrl","Z"],               cat: "基本操作",         lv: 1 },
]

export const DIFF_CFG = {
  easy:   { label: '🌱 かんたん', lvs: [1],    dur: 8  },
  medium: { label: '🔥 ふつう',   lvs: [1, 2], dur: 6  },
  hard:   { label: '⚡ むずかしい', lvs: [2, 3], dur: 5  },
}

export const EMOJIS_CORRECT = ['🌐','✅','⭐','✨','🎊','🟡','🔴','💚']
export const EMOJIS_FIRE    = ['🔥','⚡','💥','🌟','🎉']
