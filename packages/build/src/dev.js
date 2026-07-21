import { execa } from 'execa'
import { root } from './root.js'

const watchArgs = [
  'exec',
  '--workspace=packages/build',
  '--',
  'esbuild',
  '--format=esm',
  '--bundle',
  '--external:node:buffer',
  '--external:electron',
  '--external:ws',
  '--external:node:worker_threads',
  '--watch',
  '../text-search-view/src/textSearchWorkerMain.ts',
  '--outfile=../../.tmp/dist/dist/textSearchWorkerMain.js',
]

const main = async () => {
  execa('npm', watchArgs, {
    cwd: root,
    stdio: 'inherit',
  })
  execa('node', ['node_modules/@lvce-editor/server/bin/server.js', '--only-extension=packages/e2e/extension', '--test-path=packages/e2e'], {
    cwd: root,
    stdio: 'inherit',
  })
}

main()
