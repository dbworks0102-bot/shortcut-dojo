/**
 * ビルド後に tips/ の生成済みサブディレクトリを dist/tips/ にコピーする
 * Usage: node scripts/copy-tips.mjs
 */
import { readdirSync, existsSync, mkdirSync, copyFileSync, statSync } from 'fs'
import { resolve, join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root      = resolve(__dirname, '..')
const TIPS_SRC  = resolve(root, 'tips')
const TIPS_DIST = resolve(root, 'dist', 'tips')

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true })
  for (const entry of readdirSync(src)) {
    const srcPath  = join(src, entry)
    const destPath = join(dest, entry)
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      copyFileSync(srcPath, destPath)
    }
  }
}

if (!existsSync(TIPS_SRC)) {
  console.log('tips/ ディレクトリが存在しません。スキップします。')
  process.exit(0)
}

// tips/ 内のサブディレクトリ（記事ページ）のみコピー
// index.html は vite build で処理済みなので上書きしない
let count = 0
for (const entry of readdirSync(TIPS_SRC)) {
  const src = join(TIPS_SRC, entry)
  if (statSync(src).isDirectory()) {
    copyDir(src, join(TIPS_DIST, entry))
    count++
  }
}

console.log(`✅  tips サブディレクトリ ${count} 件を dist/tips/ にコピーしました。`)
