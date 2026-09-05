import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const root = join(__dirname, '..', '..', '..')

const nodeModulesPath = join(root, 'node_modules')

const serverMainPath = join(nodeModulesPath, '@lvce-editor', 'server', 'src', 'server.js')

const serverContent = await readFile(serverMainPath, 'utf-8')
const staticPrefixSnippet = `  if (url.startsWith('/995dbd2')) {
    return true
  }`
const staticPrefixReplacement = `  if (url.startsWith('/995dbd2')) {
    return true
  }
  if (url.startsWith('/text-search-view')) {
    return true
  }`
const newServerContent = serverContent.includes("url.startsWith('/text-search-view')")
  ? serverContent
  : serverContent.replace(staticPrefixSnippet, staticPrefixReplacement)

if (newServerContent !== serverContent) {
  await writeFile(serverMainPath, newServerContent)
}
