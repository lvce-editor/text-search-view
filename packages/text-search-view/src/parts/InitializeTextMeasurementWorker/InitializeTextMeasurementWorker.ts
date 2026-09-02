import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TextMeasurementWorker from '../TextMeasurementWorker/TextMeasurementWorker.ts'

const send = (port: MessagePort): Promise<void> => {
  return RendererWorker.sendMessagePortToTextMeasurementWorker(port)
}

export const initializeTextMeasurementWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  TextMeasurementWorker.set(rpc)
}
