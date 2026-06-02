// =========================================================
//  shortcuts.js — Teamsショートカットデータ
//  lv 1: かんたん  lv 2: ふつう  lv 3: むずかしい
// =========================================================

export const SHORTCUTS = [
  // ─── 基本操作 ───
  { op: "検索を開く",                     keys: ["Ctrl","E"],               cat: "基本操作",         lv: 1 },
  { op: "設定を開く",                     keys: ["Ctrl",","],               cat: "基本操作",         lv: 1 },
  { op: "ヘルプを開く",                   keys: ["F1"],                     cat: "基本操作",         lv: 1 },
  { op: "キーボードショートカット一覧",   keys: ["Ctrl","."],               cat: "基本操作",         lv: 2 },
  { op: "コマンドを開く",                 keys: ["Ctrl","/"],               cat: "基本操作",         lv: 2 },
  { op: "拡大",                           keys: ["Ctrl","="],               cat: "基本操作",         lv: 2 },
  { op: "縮小",                           keys: ["Ctrl","-"],               cat: "基本操作",         lv: 2 },
  { op: "デフォルト倍率に戻す",           keys: ["Ctrl","0"],               cat: "基本操作",         lv: 3 },

  // ─── ナビゲーション ───
  { op: "アクティビティに移動",           keys: ["Ctrl","1"],               cat: "ナビゲーション",   lv: 1 },
  { op: "チャットに移動",                 keys: ["Ctrl","2"],               cat: "ナビゲーション",   lv: 1 },
  { op: "チームに移動",                   keys: ["Ctrl","3"],               cat: "ナビゲーション",   lv: 1 },
  { op: "カレンダーに移動",               keys: ["Ctrl","4"],               cat: "ナビゲーション",   lv: 2 },
  { op: "通話に移動",                     keys: ["Ctrl","5"],               cat: "ナビゲーション",   lv: 2 },
  { op: "ファイルに移動",                 keys: ["Ctrl","6"],               cat: "ナビゲーション",   lv: 3 },
  { op: "前のページに戻る",               keys: ["Alt","←"],               cat: "ナビゲーション",   lv: 2 },
  { op: "次のページに進む",               keys: ["Alt","→"],               cat: "ナビゲーション",   lv: 2 },
  { op: "前の未読チャンネルに移動",       keys: ["Ctrl","Shift","F6"],      cat: "ナビゲーション",   lv: 3 },

  // ─── メッセージ操作 ───
  { op: "新しいチャットを開始",           keys: ["Ctrl","N"],               cat: "メッセージ",       lv: 1 },
  { op: "メッセージを送信",               keys: ["Enter"],                  cat: "メッセージ",       lv: 1 },
  { op: "メッセージ内で改行",             keys: ["Shift","Enter"],          cat: "メッセージ",       lv: 1 },
  { op: "作成ボックスを展開",             keys: ["Ctrl","Shift","X"],       cat: "メッセージ",       lv: 2 },
  { op: "最新メッセージに返信",           keys: ["Alt","Shift","R"],        cat: "メッセージ",       lv: 2 },
  { op: "最新メッセージにリアクション",   keys: ["Alt","Shift","E"],        cat: "メッセージ",       lv: 3 },
  { op: "メッセージを編集",               keys: ["Ctrl","Shift","U"],       cat: "メッセージ",       lv: 3 },
  { op: "絵文字パネルを開く",             keys: ["Ctrl","Shift","E"],       cat: "メッセージ",       lv: 2 },
  { op: "ファイルを添付",                 keys: ["Ctrl","O"],               cat: "メッセージ",       lv: 2 },
  { op: "既読にする",                     keys: ["Ctrl","Shift","Q"],       cat: "メッセージ",       lv: 3 },

  // ─── 会議・通話 ───
  { op: "マイクのミュート切り替え",       keys: ["Ctrl","Shift","M"],       cat: "会議・通話",       lv: 1 },
  { op: "カメラのオン・オフ",             keys: ["Ctrl","Shift","O"],       cat: "会議・通話",       lv: 1 },
  { op: "画面共有の開始・停止",           keys: ["Ctrl","Shift","E"],       cat: "会議・通話",       lv: 2 },
  { op: "手を挙げる",                     keys: ["Ctrl","Shift","K"],       cat: "会議・通話",       lv: 2 },
  { op: "通話を受ける",                   keys: ["Ctrl","Shift","A"],       cat: "会議・通話",       lv: 2 },
  { op: "通話を拒否",                     keys: ["Ctrl","Shift","D"],       cat: "会議・通話",       lv: 2 },
  { op: "通話を終了",                     keys: ["Ctrl","Shift","H"],       cat: "会議・通話",       lv: 2 },
  { op: "背景のぼかし切り替え",           keys: ["Ctrl","Shift","P"],       cat: "会議・通話",       lv: 3 },
  { op: "参加者一覧を表示",               keys: ["Ctrl","Shift","B"],       cat: "会議・通話",       lv: 3 },
  { op: "スポットライトを開始",           keys: ["Ctrl","Shift","S"],       cat: "会議・通話",       lv: 3 },

  // ─── チャンネル・チーム ───
  { op: "チャンネルに移動",               keys: ["Ctrl","G"],               cat: "チャンネル",       lv: 2 },
  { op: "チームを展開・折りたたみ",       keys: ["Ctrl","Shift","←"],       cat: "チャンネル",       lv: 3 },
  { op: "未読のあるチャンネルに移動",     keys: ["Alt","Shift","↑"],        cat: "チャンネル",       lv: 3 },
]

export const DIFF_CFG = {
  easy:   { label: '🌱 かんたん', lvs: [1],    dur: 8  },
  medium: { label: '🔥 ふつう',   lvs: [1, 2], dur: 6  },
  hard:   { label: '⚡ むずかしい', lvs: [2, 3], dur: 5  },
}

export const EMOJIS_CORRECT = ['💜','✅','⭐','✨','🎊','🟣','💙','🔔']
export const EMOJIS_FIRE    = ['🔥','⚡','💥','🌟','🎉']
