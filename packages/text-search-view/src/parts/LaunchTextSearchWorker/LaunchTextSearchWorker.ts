import { type Rpc, LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TextSearchWorkerCommandMap from '../TextSearchWorkerCommandMap/TextSearchWorkerCommandMap.ts'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToTextSearchWorker(port, 0)
}

export const launchTextSearchWorker = async (): Promise<Rpc> => {
  return LazyTransferMessagePortRpcParent.create({
    commandMap: TextSearchWorkerCommandMap.commandMap,
    send,
  })
}
