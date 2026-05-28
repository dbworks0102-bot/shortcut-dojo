// =========================================================
//  shortcuts.js — Excelショートカットデータ
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
  { op: "形式を選択して貼り付け",         keys: ["Ctrl","Alt","V"],         cat: "基本操作",         lv: 3 },

  // ─── 移動・選択 ───
  { op: "先頭セル（A1）に移動",           keys: ["Ctrl","Home"],            cat: "移動・選択",       lv: 1 },
  { op: "最終セルに移動",                 keys: ["Ctrl","End"],             cat: "移動・選択",       lv: 1 },
  { op: "データ端のセルに移動",           keys: ["Ctrl","→"],               cat: "移動・選択",       lv: 1 },
  { op: "行の選択",                       keys: ["Shift","Space"],          cat: "移動・選択",       lv: 2 },
  { op: "列の選択",                       keys: ["Ctrl","Space"],           cat: "移動・選択",       lv: 2 },
  { op: "範囲を選択しながら移動",         keys: ["Shift","→"],              cat: "移動・選択",       lv: 1 },
  { op: "データ端まで選択",               keys: ["Ctrl","Shift","→"],       cat: "移動・選択",       lv: 2 },
  { op: "シート全体を選択",               keys: ["Ctrl","A"],               cat: "移動・選択",       lv: 1 },
  { op: "次のシートに移動",               keys: ["Ctrl","PgDn"],            cat: "移動・選択",       lv: 2 },
  { op: "前のシートに移動",               keys: ["Ctrl","PgUp"],            cat: "移動・選択",       lv: 2 },
  { op: "名前ボックスに移動",             keys: ["Ctrl","G"],               cat: "移動・選択",       lv: 3 },
  { op: "セル範囲を指定して移動",         keys: ["F5"],                     cat: "移動・選択",       lv: 3 },
  { op: "使用範囲全体を選択",             keys: ["Ctrl","Shift","End"],     cat: "移動・選択",       lv: 3 },

  // ─── セル入力・編集 ───
  { op: "セルを編集状態にする",           keys: ["F2"],                     cat: "セル入力・編集",   lv: 1 },
  { op: "入力を確定して下に移動",         keys: ["Enter"],                  cat: "セル入力・編集",   lv: 1 },
  { op: "入力を確定して右に移動",         keys: ["Tab"],                    cat: "セル入力・編集",   lv: 1 },
  { op: "入力をキャンセル",               keys: ["Esc"],                    cat: "セル入力・編集",   lv: 1 },
  { op: "セルの内容を削除",               keys: ["Delete"],                 cat: "セル入力・編集",   lv: 1 },
  { op: "セル内で改行",                   keys: ["Alt","Enter"],            cat: "セル入力・編集",   lv: 2 },
  { op: "上のセルをコピーして下に貼付",   keys: ["Ctrl","D"],               cat: "セル入力・編集",   lv: 2 },
  { op: "左のセルをコピーして右に貼付",   keys: ["Ctrl","R"],               cat: "セル入力・編集",   lv: 2 },
  { op: "複数セルに同じ内容を一括入力",   keys: ["Ctrl","Enter"],           cat: "セル入力・編集",   lv: 2 },
  { op: "今日の日付を入力",               keys: ["Ctrl",";"],               cat: "セル入力・編集",   lv: 2 },
  { op: "現在の時刻を入力",               keys: ["Ctrl","Shift",":"],       cat: "セル入力・編集",   lv: 3 },
  { op: "真上のセルの値をコピー",         keys: ["Ctrl","'"],               cat: "セル入力・編集",   lv: 3 },
  { op: "コメントを挿入",                 keys: ["Shift","F2"],             cat: "セル入力・編集",   lv: 3 },
  { op: "ドロップダウンリストを表示",     keys: ["Alt","↓"],                cat: "セル入力・編集",   lv: 3 },

  // ─── 書式設定 ───
  { op: "太字にする",                     keys: ["Ctrl","B"],               cat: "書式設定",         lv: 1 },
  { op: "斜体にする",                     keys: ["Ctrl","I"],               cat: "書式設定",         lv: 1 },
  { op: "下線を引く",                     keys: ["Ctrl","U"],               cat: "書式設定",         lv: 1 },
  { op: "セルの書式設定ダイアログ",       keys: ["Ctrl","1"],               cat: "書式設定",         lv: 2 },
  { op: "数値の書式を適用（桁区切り）",   keys: ["Ctrl","Shift","1"],       cat: "書式設定",         lv: 2 },
  { op: "通貨の書式を適用",               keys: ["Ctrl","Shift","4"],       cat: "書式設定",         lv: 2 },
  { op: "パーセントの書式を適用",         keys: ["Ctrl","Shift","5"],       cat: "書式設定",         lv: 2 },
  { op: "日付の書式を適用",               keys: ["Ctrl","Shift","3"],       cat: "書式設定",         lv: 3 },
  { op: "時刻の書式を適用",               keys: ["Ctrl","Shift","2"],       cat: "書式設定",         lv: 3 },
  { op: "標準の書式に戻す",               keys: ["Ctrl","Shift","~"],       cat: "書式設定",         lv: 3 },
  { op: "取り消し線を引く",               keys: ["Ctrl","5"],               cat: "書式設定",         lv: 3 },
  { op: "罫線を引く（外枠）",             keys: ["Ctrl","Shift","&"],       cat: "書式設定",         lv: 3 },
  { op: "罫線を削除",                     keys: ["Ctrl","Shift","_"],       cat: "書式設定",         lv: 3 },

  // ─── 行・列操作 ───
  { op: "行を挿入",                       keys: ["Ctrl","+"],               cat: "行・列操作",       lv: 2 },
  { op: "行・列を削除",                   keys: ["Ctrl","-"],               cat: "行・列操作",       lv: 2 },
  { op: "選択行を非表示",                 keys: ["Ctrl","9"],               cat: "行・列操作",       lv: 3 },
  { op: "選択列を非表示",                 keys: ["Ctrl","0"],               cat: "行・列操作",       lv: 3 },
  { op: "非表示行を再表示",               keys: ["Ctrl","Shift","9"],       cat: "行・列操作",       lv: 3 },
  { op: "非表示列を再表示",               keys: ["Ctrl","Shift","0"],       cat: "行・列操作",       lv: 3 },
  { op: "行の高さを自動調整",             keys: ["Alt","H","O","A"],        cat: "行・列操作",       lv: 3 },
  { op: "列幅を自動調整",                 keys: ["Alt","H","O","I"],        cat: "行・列操作",       lv: 3 },

  // ─── 関数・数式 ───
  { op: "オートSUM（合計）を挿入",        keys: ["Alt","="],                cat: "関数・数式",       lv: 1 },
  { op: "絶対参照に切り替え",             keys: ["F4"],                     cat: "関数・数式",       lv: 2 },
  { op: "関数の挿入ダイアログ",           keys: ["Shift","F3"],             cat: "関数・数式",       lv: 2 },
  { op: "数式の表示・非表示を切替",       keys: ["Ctrl","`"],               cat: "関数・数式",       lv: 3 },
  { op: "手動で再計算を実行",             keys: ["F9"],                     cat: "関数・数式",       lv: 3 },
  { op: "現在のシートのみ再計算",         keys: ["Shift","F9"],             cat: "関数・数式",       lv: 3 },
  { op: "参照元のトレース",               keys: ["Alt","M","P"],            cat: "関数・数式",       lv: 3 },

  // ─── フィルター・並び替え ───
  { op: "フィルターを付ける・外す",       keys: ["Ctrl","Shift","L"],       cat: "フィルター",       lv: 1 },
  { op: "フィルターメニューを開く",       keys: ["Alt","↓"],                cat: "フィルター",       lv: 2 },
  { op: "テーブルとして書式設定",         keys: ["Ctrl","T"],               cat: "フィルター",       lv: 2 },
  { op: "並び替えダイアログを開く",       keys: ["Alt","A","S","S"],        cat: "フィルター",       lv: 3 },

  // ─── シート操作 ───
  { op: "新しいシートを追加",             keys: ["Shift","F11"],            cat: "シート操作",       lv: 2 },
  { op: "シートを削除",                   keys: ["Alt","H","D","S"],        cat: "シート操作",       lv: 3 },
  { op: "シート名を変更",                 keys: ["Alt","H","O","R"],        cat: "シート操作",       lv: 3 },
  { op: "シートを移動・コピー",           keys: ["Alt","H","O","M"],        cat: "シート操作",       lv: 3 },

  // ─── ウィンドウ・表示 ───
  { op: "ウィンドウを最大化",             keys: ["Alt","F10"],              cat: "ウィンドウ",       lv: 2 },
  { op: "ウィンドウの分割",               keys: ["Alt","W","S"],            cat: "ウィンドウ",       lv: 3 },
  { op: "ウィンドウ枠の固定",             keys: ["Alt","W","F","F"],        cat: "ウィンドウ",       lv: 3 },
  { op: "ズームダイアログを開く",         keys: ["Alt","W","Q"],            cat: "ウィンドウ",       lv: 3 },
  { op: "全画面表示",                     keys: ["Alt","W","F","F"],        cat: "ウィンドウ",       lv: 3 },
]

export const DIFF_CFG = {
  easy:   { lvs: [1],     dur: 10, base:  80, label: "かんたん 🌱" },
  medium: { lvs: [1,2],   dur:  7, base: 100, label: "ふつう 🔥"  },
  hard:   { lvs: [1,2,3], dur:  4, base: 120, label: "むずかしい ⚡" },
}

export const EMOJIS_CORRECT = ["📊","📈","✅","⭐","✨","🎊","💚","🟢"]
export const EMOJIS_FIRE    = ["🔥","💥","⚡","🌟","🎉"]
