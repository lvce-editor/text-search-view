import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { initializeDialogWorker } from '../InitializeDialogWorker/InitializeDialogWorker.ts'
import { initializeIconThemeWorker } from '../InitializeIconThemeWorker/InitializeIconThemeWorker.ts'
import { initializeTextMeasurementWorker } from '../InitializeTextMeasurementWorker/InitializeTextMeasurementWorker.ts'
import { initializeTextSearchWorker } from '../InitializeTextSearchWorker/InitializeTextSearchWorker.ts'
import { registerCommands } from '../SearchViewStates/SearchViewStates.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  RendererWorker.set(rpc)
  await Promise.all([initializeDialogWorker(), initializeIconThemeWorker(), initializeTextMeasurementWorker(), initializeTextSearchWorker()])
}
