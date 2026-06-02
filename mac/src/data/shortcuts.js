// =========================================================
//  shortcuts.js — Macショートカットデータ
//  lv 1: かんたん  lv 2: ふつう  lv 3: むずかしい
// =========================================================

export const SHORTCUTS = [
  // ─── 基本操作 ───
  { op: "コピー",                         keys: ["⌘","C"],                  cat: "基本操作",         lv: 1 },
  { op: "貼り付け",                       keys: ["⌘","V"],                  cat: "基本操作",         lv: 1 },
  { op: "切り取り",                       keys: ["⌘","X"],                  cat: "基本操作",         lv: 1 },
  { op: "元に戻す",                       keys: ["⌘","Z"],                  cat: "基本操作",         lv: 1 },
  { op: "やり直す",                       keys: ["⌘","Shift","Z"],          cat: "基本操作",         lv: 1 },
  { op: "すべて選択",                     keys: ["⌘","A"],                  cat: "基本操作",         lv: 1 },
  { op: "保存",                           keys: ["⌘","S"],                  cat: "基本操作",         lv: 1 },
  { op: "名前を付けて保存",               keys: ["⌘","Shift","S"],          cat: "基本操作",         lv: 2 },
  { op: "印刷",                           keys: ["⌘","P"],                  cat: "基本操作",         lv: 1 },
  { op: "検索",                           keys: ["⌘","F"],                  cat: "基本操作",         lv: 1 },
  { op: "新規作成",                       keys: ["⌘","N"],                  cat: "基本操作",         lv: 1 },
  { op: "ファイルを開く",                 keys: ["⌘","O"],                  cat: "基本操作",         lv: 1 },
  { op: "ウィンドウを閉じる",             keys: ["⌘","W"],                  cat: "基本操作",         lv: 1 },
  { op: "アプリを終了",                   keys: ["⌘","Q"],                  cat: "基本操作",         lv: 1 },
  { op: "環境設定を開く",                 keys: ["⌘",","],                  cat: "基本操作",         lv: 2 },
  { op: "書式をペースト",                 keys: ["⌘","Option","V"],         cat: "基本操作",         lv: 3 },

  // ─── ウィンドウ・アプリ切替 ───
  { op: "アプリを切り替える",             keys: ["⌘","Tab"],                cat: "ウィンドウ",       lv: 1 },
  { op: "同じアプリのウィンドウを切替",   keys: ["⌘","`"],                  cat: "ウィンドウ",       lv: 2 },
  { op: "ウィンドウを最小化",             keys: ["⌘","M"],                  cat: "ウィンドウ",       lv: 1 },
  { op: "フルスクリーン切り替え",         keys: ["⌘","Ctrl","F"],           cat: "ウィンドウ",       lv: 2 },
  { op: "Mission Controlを開く",          keys: ["Ctrl","↑"],               cat: "ウィンドウ",       lv: 2 },
  { op: "デスクトップを表示",             keys: ["⌘","F3"],                 cat: "ウィンドウ",       lv: 2 },
  { op: "Spotlight検索",                  keys: ["⌘","Space"],              cat: "ウィンドウ",       lv: 1 },
  { op: "アプリのウィンドウをすべて表示", keys: ["Ctrl","↓"],               cat: "ウィンドウ",       lv: 3 },
  { op: "ウィンドウを隠す",               keys: ["⌘","H"],                  cat: "ウィンドウ",       lv: 2 },
  { op: "他のウィンドウをすべて隠す",     keys: ["⌘","Option","H"],         cat: "ウィンドウ",       lv: 3 },

  // ─── スクリーンショット ───
  { op: "全画面スクリーンショット",       keys: ["⌘","Shift","3"],          cat: "スクリーンショット", lv: 1 },
  { op: "範囲選択スクリーンショット",     keys: ["⌘","Shift","4"],          cat: "スクリーンショット", lv: 1 },
  { op: "ウィンドウのスクリーンショット", keys: ["⌘","Shift","4","Space"],  cat: "スクリーンショット", lv: 2 },
  { op: "スクリーンショットツールバー",   keys: ["⌘","Shift","5"],          cat: "スクリーンショット", lv: 2 },
  { op: "クリップボードにコピー",         keys: ["⌘","Shift","Ctrl","3"],   cat: "スクリーンショット", lv: 3 },

  // ─── Finder操作 ───
  { op: "Finderを開く",                   keys: ["⌘","Option","Space"],     cat: "Finder",           lv: 2 },
  { op: "新しいFinderウィンドウを開く",   keys: ["⌘","N"],                  cat: "Finder",           lv: 1 },
  { op: "新しいフォルダを作成",           keys: ["⌘","Shift","N"],          cat: "Finder",           lv: 1 },
  { op: "ファイルをゴミ箱に移動",         keys: ["⌘","Delete"],             cat: "Finder",           lv: 1 },
  { op: "ゴミ箱を空にする",               keys: ["⌘","Shift","Delete"],     cat: "Finder",           lv: 2 },
  { op: "ファイル名を変更",               keys: ["Return"],                 cat: "Finder",           lv: 2 },
  { op: "情報を見る",                     keys: ["⌘","I"],                  cat: "Finder",           lv: 2 },
  { op: "クイックルック",                 keys: ["Space"],                  cat: "Finder",           lv: 2 },
  { op: "隠しファイルの表示切り替え",     keys: ["⌘","Shift","."],          cat: "Finder",           lv: 3 },
  { op: "フォルダに移動",                 keys: ["⌘","Shift","G"],          cat: "Finder",           lv: 3 },

  // ─── テキスト編集 ───
  { op: "行頭に移動",                     keys: ["⌘","←"],                  cat: "テキスト",         lv: 2 },
  { op: "行末に移動",                     keys: ["⌘","→"],                  cat: "テキスト",         lv: 2 },
  { op: "文書先頭に移動",                 keys: ["⌘","↑"],                  cat: "テキスト",         lv: 2 },
  { op: "文書末尾に移動",                 keys: ["⌘","↓"],                  cat: "テキスト",         lv: 2 },
  { op: "単語単位で移動",                 keys: ["Option","←"],             cat: "テキスト",         lv: 3 },
  { op: "カーソル左の文字を削除",         keys: ["Delete"],                 cat: "テキスト",         lv: 1 },
  { op: "カーソル右の文字を削除",         keys: ["Fn","Delete"],            cat: "テキスト",         lv: 2 },
  { op: "行末まで削除",                   keys: ["⌘","Delete"],             cat: "テキスト",         lv: 3 },
  { op: "絵文字・記号を入力",             keys: ["⌘","Ctrl","Space"],       cat: "テキスト",         lv: 2 },
]

export const DIFF_CFG = {
  easy:   { label: '🌱 かんたん', lvs: [1],    dur: 8  },
  medium: { label: '🔥 ふつう',   lvs: [1, 2], dur: 6  },
  hard:   { label: '⚡ むずかしい', lvs: [2, 3], dur: 5  },
}

export const EMOJIS_CORRECT = ['🍎','✅','⭐','✨','🎊','⬛','🩶','💻']
export const EMOJIS_FIRE    = ['🔥','⚡','💥','🌟','🎉']
