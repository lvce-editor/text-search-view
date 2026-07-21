import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { patchRendererWorker } from './patchRendererWorker.js'
import { root } from './root.js'

const sharedProcessPath = join(root, 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/text-search-view'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
  testPath: 'packages/e2e',
})

const rendererWorkerPath = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')
const textSearchWorkerPath = join(root, 'dist', commitHash, 'packages', 'text-search-view', 'dist', 'textsearchViewMain.js')
const extensionHostWorkerTestsPath = join(root, 'dist', commitHash, 'packages', 'extension-host-worker-tests')
const serverStaticPath = join(root, 'node_modules', '@lvce-editor', 'static-server', 'static', commitHash)
const serverRendererWorkerPath = join(serverStaticPath, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')
const serverTextSearchWorkerPath = join(serverStaticPath, 'packages', 'text-search-view', 'dist', 'textsearchViewMain.js')
const serverExtensionHostWorkerTestsPath = join(serverStaticPath, 'packages', 'extension-host-worker-tests')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const workerPath = join(root, '.tmp', 'dist', 'dist', 'textsearchViewMain.js')
const remoteUrl = getRemoteUrl(workerPath)

const patchRendererWorkerPath = async (path, useRemoteUrl) => {
  const content = await readFile(path, 'utf8')
  const newContent = patchRendererWorker(content, remoteUrl, useRemoteUrl)

  if (newContent !== content) {
    await writeFile(path, newContent)
  }
}

await patchRendererWorkerPath(rendererWorkerPath, false)
await patchRendererWorkerPath(serverRendererWorkerPath, false)

await cp(workerPath, textSearchWorkerPath)
await cp(workerPath, serverTextSearchWorkerPath)
await cp(extensionHostWorkerTestsPath, serverExtensionHostWorkerTestsPath, { recursive: true })

const staticPath = join(root, '.tmp', 'static')
const staticPrefixPath = join(staticPath, 'text-search-view')
const serverMainPath = join(root, 'node_modules', '@lvce-editor', 'server', 'src', 'server.js')

const patchServerStaticPrefix = async () => {
  const content = await readFile(serverMainPath, 'utf-8')
  const occurrence = `  if (url.startsWith('/995dbd2')) {
    return true
  }`
  const replacement = `  if (url.startsWith('/995dbd2')) {
    return true
  }
  if (url.startsWith('/text-search-view')) {
    return true
  }`
  const newContent = content.includes("url.startsWith('/text-search-view')") ? content : content.replace(occurrence, replacement)

  if (newContent !== content) {
    await writeFile(serverMainPath, newContent)
  }
}

await cp(join(root, 'dist'), staticPath, { recursive: true })
await mkdir(staticPrefixPath, { recursive: true })
await cp(join(staticPath, commitHash), join(staticPrefixPath, commitHash), { recursive: true })
await cp(join(staticPath, 'favicon.ico'), join(staticPrefixPath, 'favicon.ico'))
await patchServerStaticPrefix()
