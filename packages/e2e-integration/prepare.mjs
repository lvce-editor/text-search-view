import { cp, mkdir, readdir, readFile, realpath, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const owner = resolve(here, '../..')
if (!process.argv[2]) throw new Error('Pass the path to a disposable LVCE checkout')
const application = resolve(process.argv[2])
const manifest = JSON.parse(await readFile(join(application, 'package.json'), 'utf8'))
if (manifest.name !== 'lvce-editor') throw new Error('Expected an LVCE application checkout')
const config = JSON.parse(await readFile(join(here, 'config.json'), 'utf8'))
const tests = join(application, 'packages/extension-host-worker-tests')
// Keep the application's runner and replace only its test inventory.
for (const name of await readdir(join(tests, 'src'))) {
  if (name !== '_all.js') await rm(join(tests, 'src', name), { recursive: true })
}
await cp(join(here, 'src'), join(tests, 'src'), { recursive: true })
await rm(join(tests, 'fixtures'), { recursive: true, force: true })
await mkdir(join(tests, 'fixtures'), { recursive: true })
try {
  await cp(join(here, 'fixtures'), join(tests, 'fixtures'), { recursive: true })
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}
for (const path of config.scripts) {
  await cp(join(here, 'scripts', path.split('/').at(-1)), join(application, path))
}
// Exercise this repository's build in the pinned application runtime.
for (const [from, to] of config.artifacts) {
  const target = await realpath(join(application, to)).catch((error) => {
    if (error.code !== 'ENOENT') throw error
    return join(application, to)
  })
  await cp(join(owner, from), target, { recursive: true })
}

if (process.env.MAIN_AREA_REF) {
  const target = await realpath(join(application, 'packages/renderer-worker/node_modules/@lvce-editor/main-area-worker'))
  await cp(join(owner, '.tmp/main-area-candidate/.tmp/dist'), target, { recursive: true })
}

// Native keyboard checks supplement the in-app harness, whose key events are synthetic.
await cp(join(here, 'browser-focus.mjs'), join(tests, 'browser-focus.mjs'))
const runnerPath = join(tests, 'src/_all.js')
const runner = await readFile(runnerPath, 'utf8')
const testCall = 'await testFile(page, testName, timeout)'
if (!runner.includes(testCall)) throw new Error('Application runner no longer exposes the expected test loop')
await writeFile(
  runnerPath,
  runner.replace(testCall, `${testCall}\n      await (await import('../browser-focus.mjs')).verifyNativeFocus(page, testName, expect)`),
)
