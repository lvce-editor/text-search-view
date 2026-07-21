import { initializeIconThemeWorker } from '../InitializeIconThemeWorker/InitializeIconThemeWorker.ts'
import { initializeSearchProcess } from '../InitializeSearchProcess/InitializeSearchProcess.ts'

export const initialize = async (platform: number): Promise<void> => {
  await Promise.all([initializeSearchProcess(platform), initializeIconThemeWorker()])
}
