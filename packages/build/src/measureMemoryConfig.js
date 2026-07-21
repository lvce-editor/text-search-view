import { join } from 'node:path'
import { root } from './root.js'

export const threshold = 590_000

export const instantiations = 200_000

export const instantiationsPath = join(root, 'packages', 'text-search-worker')

export const workerPath = join(root, '.tmp', 'dist', 'dist', 'textSearchWorkerMain.js')

export const playwrightPath = new URL('../../../node_modules/playwright/index.mjs', import.meta.url).toString()
