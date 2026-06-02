// =========================================================
//  shortcuts.js — Outlookショートカットデータ
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
  { op: "検索",                           keys: ["Ctrl","E"],               cat: "基本操作",         lv: 1 },
  { op: "ヘルプを表示",                   keys: ["F1"],                     cat: "基本操作",         lv: 1 },
  { op: "アイテムを削除",                 keys: ["Delete"],                 cat: "基本操作",         lv: 1 },
  { op: "やり直す（Redo）",               keys: ["Ctrl","Y"],               cat: "基本操作",         lv: 2 },
  { op: "アプリケーション終了",           keys: ["Alt","F4"],               cat: "基本操作",         lv: 2 },
  { op: "スペルチェック",                 keys: ["F7"],                     cat: "基本操作",         lv: 2 },
  { op: "ハイパーリンクを挿入",           keys: ["Ctrl","K"],               cat: "基本操作",         lv: 3 },

  // ─── メール操作 ───
  { op: "新しいメールを作成",             keys: ["Ctrl","N"],               cat: "メール操作",       lv: 1 },
  { op: "メールを送信",                   keys: ["Ctrl","Enter"],           cat: "メール操作",       lv: 1 },
  { op: "返信",                           keys: ["Ctrl","R"],               cat: "メール操作",       lv: 1 },
  { op: "全員に返信",                     keys: ["Ctrl","Shift","R"],       cat: "メール操作",       lv: 1 },
  { op: "転送",                           keys: ["Ctrl","F"],               cat: "メール操作",       lv: 1 },
  { op: "メールを開く",                   keys: ["Enter"],                  cat: "メール操作",       lv: 1 },
  { op: "未読にする",                     keys: ["Ctrl","U"],               cat: "メール操作",       lv: 2 },
  { op: "既読にする",                     keys: ["Ctrl","Q"],               cat: "メール操作",       lv: 2 },
  { op: "フォルダーに移動",               keys: ["Ctrl","Shift","V"],       cat: "メール操作",       lv: 2 },
  { op: "フラグを設定",                   keys: ["Ctrl","Shift","G"],       cat: "メール操作",       lv: 2 },
  { op: "受信トレイに移動",               keys: ["Ctrl","Shift","I"],       cat: "メール操作",       lv: 2 },
  { op: "迷惑メールとして報告",           keys: ["Ctrl","Alt","J"],         cat: "メール操作",       lv: 3 },
  { op: "送信済みアイテムに移動",         keys: ["Ctrl","Shift","O"],       cat: "メール操作",       lv: 3 },

  // ─── 画面切替 ───
  { op: "メールに切り替え",               keys: ["Ctrl","1"],               cat: "画面切替",         lv: 1 },
  { op: "予定表に切り替え",               keys: ["Ctrl","2"],               cat: "画面切替",         lv: 1 },
  { op: "連絡先に切り替え",               keys: ["Ctrl","3"],               cat: "画面切替",         lv: 2 },
  { op: "タスクに切り替え",               keys: ["Ctrl","4"],               cat: "画面切替",         lv: 2 },
  { op: "メモに切り替え",                 keys: ["Ctrl","5"],               cat: "画面切替",         lv: 3 },
  { op: "フォルダー一覧に切り替え",       keys: ["Ctrl","6"],               cat: "画面切替",         lv: 3 },
  { op: "次のウィンドウに移動",           keys: ["Ctrl","Tab"],             cat: "画面切替",         lv: 2 },

  // ─── 予定表 ───
  { op: "新しい予定を作成",               keys: ["Ctrl","Shift","A"],       cat: "予定表",           lv: 1 },
  { op: "新しい会議出席依頼を作成",       keys: ["Ctrl","Shift","Q"],       cat: "予定表",           lv: 2 },
  { op: "日表示",                         keys: ["Ctrl","Alt","1"],         cat: "予定表",           lv: 2 },
  { op: "週表示",                         keys: ["Ctrl","Alt","2"],         cat: "予定表",           lv: 2 },
  { op: "月表示",                         keys: ["Ctrl","Alt","4"],         cat: "予定表",           lv: 3 },
  { op: "今日に移動",                     keys: ["Ctrl","T"],               cat: "予定表",           lv: 2 },
  { op: "次の期間へ移動",                 keys: ["Alt","→"],               cat: "予定表",           lv: 3 },
  { op: "前の期間へ移動",                 keys: ["Alt","←"],               cat: "予定表",           lv: 3 },

  // ─── 連絡先・タスク ───
  { op: "新しい連絡先を作成",             keys: ["Ctrl","Shift","C"],       cat: "連絡先・タスク",   lv: 2 },
  { op: "新しいタスクを作成",             keys: ["Ctrl","Shift","K"],       cat: "連絡先・タスク",   lv: 2 },
  { op: "新しいメモを作成",               keys: ["Ctrl","Shift","N"],       cat: "連絡先・タスク",   lv: 3 },
]

export const DIFF_CFG = {
  easy:   { label: '🌱 かんたん', lvs: [1],    dur: 8  },
  medium: { label: '🔥 ふつう',   lvs: [1, 2], dur: 6  },
  hard:   { label: '⚡ むずかしい', lvs: [2, 3], dur: 5  },
}

export const EMOJIS_CORRECT = ['📧','✅','⭐','✨','🎊','💙','🔵','📨']
export const EMOJIS_FIRE    = ['🔥','⚡','💥','🌟','🎉']
