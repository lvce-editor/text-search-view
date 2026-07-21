import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { patchRendererWorker } from './patchRendererWorker.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const root = join(__dirname, '..', '..', '..')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const nodeModulesPath = join(root, 'node_modules')

const textSearchWorkerPath = join(root, '.tmp', 'dist', 'dist', 'textSearchWorkerMain.js')

const serverStaticPath = join(nodeModulesPath, '@lvce-editor', 'static-server', 'static')
const serverMainPath = join(nodeModulesPath, '@lvce-editor', 'server', 'src', 'server.js')

const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}

const dirents = await readdir(serverStaticPath)
const commitHash = dirents.find(isCommitHash) || ''
const rendererWorkerMainPath = join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

const content = await readFile(rendererWorkerMainPath, 'utf-8')
const remoteUrl = getRemoteUrl(textSearchWorkerPath)
const newContent = patchRendererWorker(content, remoteUrl, true)

if (newContent !== content) {
  await writeFile(rendererWorkerMainPath, newContent)
}

const serverContent = await readFile(serverMainPath, 'utf-8')
const staticPrefixSnippet = `  if (url.startsWith('/995dbd2')) {
    return true
  }`
const staticPrefixReplacement = `  if (url.startsWith('/995dbd2')) {
    return true
  }
  if (url.startsWith('/text-search-worker')) {
    return true
  }`
const newServerContent = serverContent.includes("url.startsWith('/text-search-worker')")
  ? serverContent
  : serverContent.replace(staticPrefixSnippet, staticPrefixReplacement)

if (newServerContent !== serverContent) {
  await writeFile(serverMainPath, newServerContent)
}
