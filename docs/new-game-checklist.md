# 新ゲーム作成チェックリスト

新しいショートカット道場ゲームを追加する際の標準手順。

---

## 1. ゲームディレクトリの作成

```
shortcut-dojo/
└── [game]/              # 例: outlook / chrome / teams / mac
    ├── index.html
    ├── shortcuts/
    │   └── index.html
    ├── manifest.json
    └── src/
        ├── data/
        │   └── shortcuts.js
        ├── core/
        │   ├── game.js
        │   └── ...
        └── ui/
            ├── ranking.js
            └── ...
```

**手順:** `excel/` ディレクトリをまるごとコピーして名前変更。

---

## 2. ショートカットデータの作成

`[game]/src/data/shortcuts.js` を編集：

- [ ] `export const SHORTCUTS` — ゲーム専用ショートカット（最低40問推奨）
- [ ] `export const EMOJIS_CORRECT` — 正解時のエモジ配列（必須）
- [ ] `export const EMOJIS_FIRE` — コンボ時のエモジ配列（必須）
- [ ] `DIFF_CFG` — 難易度設定（easy/normal/hard のレベル割り振り）
- [ ] テーマカラー変数（CSS で参照される）

---

## 3. ゲームロジックの更新

`[game]/src/core/game.js`:
- [ ] `saveOnlineScore({ ..., game: '[gamename]' })` の `game` 識別子を変更

`[game]/src/ui/ranking.js`:
- [ ] `getOnlineRankings(diff, '[gamename]')` の第2引数を変更

---

## 4. index.html の SEO 設定（最重要）

`[game]/index.html` の `<head>` を編集：

### 4-1. 基本メタタグ
- [ ] `<title>` — 検索キーワードを含む（例: `Outlook ショートカットキー 練習ゲーム | Outlook道場`）
- [ ] `<meta name="description">` — 120〜160文字、具体的なショートカット名を含む
- [ ] `<meta name="keywords">` — ゲーム名・ツール名・「ショートカットキー」「練習」「無料」等
- [ ] `<meta name="theme-color">` — ゲームのテーマカラー（例: `#0078D4`）
- [ ] `<link rel="canonical">` — `https://shortcut-dojo.com/[game]/`

### 4-2. JSON-LD 構造化データ
- [ ] `SoftwareApplication` — name/url/description をゲームに合わせて更新
- [ ] `BreadcrumbList` — position 2 の name/item をゲームに合わせて更新
- [ ] `FAQPage` — **必ずゲーム固有の Q&A に書き換える**（コピー元の Excel/PPT の内容を残さない）
  - Q1〜Q6: ゲーム特有のショートカットキーに関する質問
  - Q7: 「[ゲーム名]のショートカットキーを効率よく練習する方法は？」

### 4-3. OGP / Twitter Card
- [ ] `og:url` — `https://shortcut-dojo.com/[game]/`
- [ ] `og:title` / `twitter:title` — `[ゲーム名]道場 〜[ツール名]操作ゲーム〜`
- [ ] `og:description` / `twitter:description` — ゲーム説明文
- [ ] `og:image` / `twitter:image` — `https://shortcut-dojo.com/[game]/ogp.png`
- [ ] `og:site_name` — `[ゲーム名]道場`

### 4-4. PWA
- [ ] `<link rel="manifest" href="/[game]/manifest.json">`
- [ ] `apple-mobile-web-app-title` — `[ゲーム名]道場`

---

## 5. CSS テーマカラーの更新

`[game]/index.html` の `<style>` 内：
- [ ] `--primary` / `--primary-dark` をゲームのブランドカラーに変更
- [ ] `.top-bar` グラデーション色を更新

---

## 6. ゲームタイトル・サブタイトルの更新

`[game]/index.html` の `<body>` 内：
- [ ] ゲームタイトル（例: `🥋 Outlook道場`）
- [ ] サブタイトル（例: `Outlookのショートカットキーをマスターしよう`）
- [ ] `manifest.json` の `name` / `short_name` / `theme_color`

---

## 7. クロスゲームナビゲーションの追加

全ゲームのタイトル画面に他ゲームへのリンクを追加：

```html
<div class="other-games">
  <a href="/ppt/">PPT</a>
  <a href="/excel/">Excel</a>
  <a href="/word/">Word</a>
  <a href="/outlook/">Outlook</a>
  <a href="/chrome/">Chrome</a>
  <a href="/teams/">Teams</a>
  <a href="/mac/">Mac</a>
</div>
```

- [ ] 新ゲームの HTML に上記ナビを追加
- [ ] **既存の全ゲーム**（ppt/excel/word/outlook/chrome/teams/mac）のナビに新ゲームのリンクを追加

---

## 8. vite.config.js への登録

`shortcut-dojo/vite.config.js` の `rollupOptions.input` に追加：

```js
[game]:          resolve(__dirname, '[game]/index.html'),
[game]Shortcuts: resolve(__dirname, '[game]/shortcuts/index.html'),
```

---

## 9. shortcut-dojo.com トップページへのカード追加

`shortcut-dojo/index.html` を編集：

- [ ] `.cards` 内に新ゲームのカード HTML を追加
  ```html
  <a class="card" href="/[game]/" style="--card-color: #XXXXXX;">
    <span class="card-badge badge-live">● LIVE</span>
    <span class="card-icon">[アイコン]</span>
    <div class="card-title">[ゲーム名]道場</div>
    <div class="card-desc">説明文</div>
    <div class="card-tags">...</div>
  </a>
  ```
- [ ] `<footer>` のリンク一覧に追加
- [ ] `<meta name="description">` / `keywords` にゲーム名を追加
- [ ] JSON-LD `ItemList` に新ゲームの `ListItem` を追加（position 番号を連番で）

---

## 10. ショートカット記事ページの生成

`scripts/gen-shortcut-articles.mjs` にゲーム設定を追加して実行：

```js
// GAMES 配列に追加
{
  id:       '[game]',
  name:     '[英語名]',
  nameJP:   '[読み方]',
  icon:     '[絵文字]',
  color:    '#XXXXXX',
  colorL:   '#XXXXXX',   // 薄い背景色
  tool:     '[フルネーム（[読み方]）]',
  toolShort:'[英語名]',
  ctaLabel: '[絵文字] [ゲーム名]道場でゲーム練習する',
  faq: [
    { q: '...',  a: '...' },  // 4問
  ],
  related: [
    // 他ゲームへのリンク + トップへのリンク
  ],
}
```

```bash
node scripts/gen-shortcut-articles.mjs
```

- [ ] `[game]/shortcuts/index.html` が生成されることを確認
- [ ] **既存ゲーム** (ppt/excel/word 等) の `shortcuts/index.html` の Related リンク・フッターに新ゲームを追加

---

## 11. ビルド & デプロイ

```bash
# ビルド（エラーゼロを確認）
npm run build

# Vercel へデプロイ
npx vercel --prod
```

- [ ] ビルドエラーゼロを確認
- [ ] デプロイ後、本番 URL (`shortcut-dojo.com/[game]/`) で動作確認
- [ ] トップページのカードリンクが正しく遷移することを確認
- [ ] ランキング画面でオンライン/ローカルが正常動作することを確認

---

## ゲーム一覧（現在）

| ゲーム | パス | カラー | 状態 |
|--------|------|--------|------|
| PPT道場 | `/ppt/` | `#e63946` | ✅ LIVE |
| Excel道場 | `/excel/` | `#217346` | ✅ LIVE |
| Word道場 | `/word/` | `#2b579a` | ✅ LIVE |
| Outlook道場 | `/outlook/` | `#0078D4` | ✅ LIVE |
| Chrome道場 | `/chrome/` | `#4285F4` | ✅ LIVE |
| Teams道場 | `/teams/` | `#6264A7` | ✅ LIVE |
| Mac道場 | `/mac/` | `#555555` | ✅ LIVE |
