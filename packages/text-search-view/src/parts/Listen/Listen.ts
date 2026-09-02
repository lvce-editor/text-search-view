import { LazyTransferMessagePortRpcParent, WebWorkerRpcClient } from '@lvce-editor/rpc'
import { DialogWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
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
  const [dialogRpc] = await Promise.all([
    LazyTransferMessagePortRpcParent.create({
      commandMap: {},
      send: RendererWorker.sendMessagePortToDialogWorker,
    }),
    initializeIconThemeWorker(),
    initializeTextMeasurementWorker(),
    initializeTextSearchWorker(),
  ])
  DialogWorker.set(dialogRpc)
}
