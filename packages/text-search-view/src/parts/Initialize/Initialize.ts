import { initializeIconThemeWorker } from '../InitializeIconThemeWorker/InitializeIconThemeWorker.ts'
import { initializeTextSearchWorker } from '../InitializeTextSearchWorker/InitializeTextSearchWorker.ts'

export const initialize = async (): Promise<void> => {
  await Promise.all([initializeTextSearchWorker(), initializeIconThemeWorker()])
}
