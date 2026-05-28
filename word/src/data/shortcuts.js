// =========================================================
//  shortcuts.js — Wordショートカットデータ
//  lv 1: かんたん  lv 2: ふつう  lv 3: むずかしい
// =========================================================

export const SHORTCUTS = [
  // ─── 基本操作 ───
  { op: "上書き保存",                     keys: ["Ctrl","S"],               cat: "基本操作",         lv: 1 },
  { op: "元に戻す",                       keys: ["Ctrl","Z"],               cat: "基本操作",         lv: 1 },
  { op: "コピー",                         keys: ["Ctrl","C"],               cat: "基本操作",         lv: 1 },
  { op: "貼り付け",                       keys: ["Ctrl","V"],               cat: "基本操作",         lv: 1 },
  { op: "切り取り",                       keys: ["Ctrl","X"],               cat: "基本操作",         lv: 1 },
  { op: "すべて選択",                     keys: ["Ctrl","A"],               cat: "基本操作",         lv: 1 },
  { op: "印刷",                           keys: ["Ctrl","P"],               cat: "基本操作",         lv: 1 },
  { op: "新規作成",                       keys: ["Ctrl","N"],               cat: "基本操作",         lv: 1 },
  { op: "ファイルを開く",                 keys: ["Ctrl","O"],               cat: "基本操作",         lv: 1 },
  { op: "検索",                           keys: ["Ctrl","F"],               cat: "基本操作",         lv: 1 },
  { op: "やり直す（Redo）",               keys: ["Ctrl","Y"],               cat: "基本操作",         lv: 2 },
  { op: "名前を付けて保存",               keys: ["F12"],                    cat: "基本操作",         lv: 2 },
  { op: "ファイルを閉じる",               keys: ["Ctrl","W"],               cat: "基本操作",         lv: 2 },
  { op: "置換",                           keys: ["Ctrl","H"],               cat: "基本操作",         lv: 2 },
  { op: "ハイパーリンクを挿入",           keys: ["Ctrl","K"],               cat: "基本操作",         lv: 2 },
  { op: "操作の繰り返し",                 keys: ["F4"],                     cat: "基本操作",         lv: 2 },
  { op: "アプリケーション終了",           keys: ["Alt","F4"],               cat: "基本操作",         lv: 2 },
  { op: "スペルチェック",                 keys: ["F7"],                     cat: "基本操作",         lv: 3 },
  { op: "類義語辞典を開く",               keys: ["Shift","F7"],             cat: "基本操作",         lv: 3 },
  { op: "形式を選択して貼り付け",         keys: ["Ctrl","Alt","V"],         cat: "基本操作",         lv: 3 },

  // ─── 移動・選択 ───
  { op: "文書の先頭に移動",               keys: ["Ctrl","Home"],            cat: "移動・選択",       lv: 1 },
  { op: "文書の末尾に移動",               keys: ["Ctrl","End"],             cat: "移動・選択",       lv: 1 },
  { op: "次の単語の先頭に移動",           keys: ["Ctrl","→"],               cat: "移動・選択",       lv: 1 },
  { op: "行末に移動",                     keys: ["End"],                    cat: "移動・選択",       lv: 1 },
  { op: "行頭に移動",                     keys: ["Home"],                   cat: "移動・選択",       lv: 1 },
  { op: "選択範囲を1文字右に拡張",         keys: ["Shift","→"],              cat: "移動・選択",       lv: 1 },
  { op: "単語単位で選択",                 keys: ["Ctrl","Shift","→"],       cat: "移動・選択",       lv: 2 },
  { op: "行末まで選択",                   keys: ["Shift","End"],            cat: "移動・選択",       lv: 2 },
  { op: "行頭まで選択",                   keys: ["Shift","Home"],           cat: "移動・選択",       lv: 2 },
  { op: "段落の先頭に移動",               keys: ["Ctrl","↑"],               cat: "移動・選択",       lv: 2 },
  { op: "ジャンプ（移動）",               keys: ["Ctrl","G"],               cat: "移動・選択",       lv: 3 },
  { op: "文書全体を選択",                 keys: ["Ctrl","Shift","End"],     cat: "移動・選択",       lv: 3 },
  { op: "選択モードの開始",               keys: ["F8"],                     cat: "移動・選択",       lv: 3 },

  // ─── 文字書式 ───
  { op: "太字にする",                     keys: ["Ctrl","B"],               cat: "文字書式",         lv: 1 },
  { op: "斜体にする",                     keys: ["Ctrl","I"],               cat: "文字書式",         lv: 1 },
  { op: "下線を引く",                     keys: ["Ctrl","U"],               cat: "文字書式",         lv: 1 },
  { op: "フォントサイズを大きくする",     keys: ["Ctrl","Shift",">"],       cat: "文字書式",         lv: 2 },
  { op: "フォントサイズを小さくする",     keys: ["Ctrl","Shift","<"],       cat: "文字書式",         lv: 2 },
  { op: "フォントサイズを1pt大きく",      keys: ["Ctrl","]"],               cat: "文字書式",         lv: 2 },
  { op: "フォントサイズを1pt小さく",      keys: ["Ctrl","["],               cat: "文字書式",         lv: 2 },
  { op: "下付き文字に設定",               keys: ["Ctrl","="],               cat: "文字書式",         lv: 2 },
  { op: "上付き文字に設定",               keys: ["Ctrl","Shift","="],       cat: "文字書式",         lv: 2 },
  { op: "フォントダイアログを開く",       keys: ["Ctrl","D"],               cat: "文字書式",         lv: 3 },
  { op: "英字の大文字/小文字を切り替え",  keys: ["Shift","F3"],             cat: "文字書式",         lv: 3 },
  { op: "すべて大文字に変換",             keys: ["Ctrl","Shift","A"],       cat: "文字書式",         lv: 3 },
  { op: "単語に下線（単語のみ）",         keys: ["Ctrl","Shift","W"],       cat: "文字書式",         lv: 3 },
  { op: "二重下線を引く",                 keys: ["Ctrl","Shift","D"],       cat: "文字書式",         lv: 3 },
  { op: "文字書式をクリア",               keys: ["Ctrl","Space"],           cat: "文字書式",         lv: 3 },

  // ─── 段落書式 ───
  { op: "中央揃え",                       keys: ["Ctrl","E"],               cat: "段落書式",         lv: 1 },
  { op: "左揃え",                         keys: ["Ctrl","L"],               cat: "段落書式",         lv: 1 },
  { op: "右揃え",                         keys: ["Ctrl","R"],               cat: "段落書式",         lv: 1 },
  { op: "両端揃え",                       keys: ["Ctrl","J"],               cat: "段落書式",         lv: 2 },
  { op: "1行間隔に設定",                  keys: ["Ctrl","1"],               cat: "段落書式",         lv: 2 },
  { op: "2行間隔に設定",                  keys: ["Ctrl","2"],               cat: "段落書式",         lv: 2 },
  { op: "1.5行間隔に設定",               keys: ["Ctrl","5"],               cat: "段落書式",         lv: 2 },
  { op: "インデントを増やす",             keys: ["Ctrl","M"],               cat: "段落書式",         lv: 2 },
  { op: "インデントを減らす",             keys: ["Ctrl","Shift","M"],       cat: "段落書式",         lv: 3 },
  { op: "ぶら下げインデント",             keys: ["Ctrl","T"],               cat: "段落書式",         lv: 3 },
  { op: "段落書式をクリア",               keys: ["Ctrl","Q"],               cat: "段落書式",         lv: 3 },
  { op: "見出し1スタイルを適用",          keys: ["Ctrl","Alt","1"],         cat: "段落書式",         lv: 3 },
  { op: "見出し2スタイルを適用",          keys: ["Ctrl","Alt","2"],         cat: "段落書式",         lv: 3 },

  // ─── 編集 ───
  { op: "改ページを挿入",                 keys: ["Ctrl","Enter"],           cat: "編集",             lv: 2 },
  { op: "セクション区切りを挿入",         keys: ["Ctrl","Shift","Enter"],   cat: "編集",             lv: 3 },
  { op: "コメントを挿入",                 keys: ["Ctrl","Alt","M"],         cat: "編集",             lv: 3 },
  { op: "選択した単語を削除",             keys: ["Ctrl","Delete"],          cat: "編集",             lv: 2 },
  { op: "前の単語を削除",                 keys: ["Ctrl","BackSpace"],       cat: "編集",             lv: 2 },
  { op: "em（長い）ダッシュを挿入",       keys: ["Alt","Ctrl","-"],         cat: "編集",             lv: 3 },

  // ─── 表示 ───
  { op: "文書表示を切り替え（閲覧）",     keys: ["Alt","W","F"],            cat: "表示",             lv: 3 },
  { op: "アウトライン表示に切り替え",     keys: ["Ctrl","Alt","O"],         cat: "表示",             lv: 3 },
  { op: "下書き表示に切り替え",           keys: ["Ctrl","Alt","N"],         cat: "表示",             lv: 3 },
  { op: "印刷レイアウト表示に切り替え",   keys: ["Ctrl","Alt","P"],         cat: "表示",             lv: 3 },

  // ─── フィールド・差し込み ───
  { op: "日付フィールドを挿入",           keys: ["Alt","Shift","D"],        cat: "フィールド",       lv: 3 },
  { op: "時刻フィールドを挿入",           keys: ["Alt","Shift","T"],        cat: "フィールド",       lv: 3 },
  { op: "著作権記号（©）を挿入",         keys: ["Ctrl","Alt","C"],         cat: "フィールド",       lv: 3 },
  { op: "登録商標記号（®）を挿入",       keys: ["Ctrl","Alt","R"],         cat: "フィールド",       lv: 3 },
]

export const DIFF_CFG = {
  easy:   { lvs: [1],     dur: 10, base:  80, label: "かんたん 🌱" },
  medium: { lvs: [1,2],   dur:  7, base: 100, label: "ふつう 🔥"  },
  hard:   { lvs: [1,2,3], dur:  4, base: 120, label: "むずかしい ⚡" },
}

export const EMOJIS_CORRECT = ["📝","📄","✅","⭐","✨","🎊","💙","🔵"]
export const EMOJIS_FIRE    = ["🔥","💥","⚡","🌟","🎉"]
