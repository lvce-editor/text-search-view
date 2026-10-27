import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { initializeIconThemeWorker } from '../InitializeIconThemeWorker/InitializeIconThemeWorker.ts'
import { initializeTextSearchWorker } from '../InitializeTextSearchWorker/InitializeTextSearchWorker.ts'
import { registerCommands } from '../SearchViewStates/SearchViewStates.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  await RendererWorker.initializeRendererWorkerForWorker(CommandMap.commandMap)
  await Promise.all([
    RendererWorker.initializeClipBoardWorker(),
    RendererWorker.initializeDialogWorker(),
    initializeIconThemeWorker(),
    RendererWorker.initializeTextMeasurementWorker(),
    initializeTextSearchWorker(),
  ])
}
