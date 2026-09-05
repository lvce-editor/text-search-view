import { join } from 'node:path'
import { root } from './root.ts'

export const threshold: number = 620_000

export const instantiations: number = 200_000

export const instantiationsPath: string = join(root, 'packages', 'text-search-view')

export const workerPath: string = join(root, '.tmp', 'dist', 'dist', 'textSearchViewMain.js')

export const playwrightPath: string = new URL('../../../node_modules/playwright/index.mjs', import.meta.url).toString()
