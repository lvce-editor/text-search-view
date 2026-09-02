import { LazyTransferMessagePortRpcParent, WebWorkerRpcClient } from '@lvce-editor/rpc'
import { DialogWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { initializeTextMeasurementWorker } from '../InitializeTextMeasurementWorker/InitializeTextMeasurementWorker.ts'
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
    initializeTextMeasurementWorker(),
  ])
  DialogWorker.set(dialogRpc)
}
