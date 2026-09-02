import type { DisposableMockRpc, Rpc } from '@lvce-editor/rpc-registry'
import { createMockRpc } from '@lvce-editor/rpc'
import { get, remove, RpcId, set as setRpc } from '@lvce-editor/rpc-registry'

export const invoke = (method: string, ...params: readonly any[]): Promise<any> => {
  return get(RpcId.TextMeasurementWorker).invoke(method, ...params)
}

export const registerMockRpc = (commandMap: Record<string, any>): DisposableMockRpc => {
  const mockRpc = createMockRpc({ commandMap })
  setRpc(RpcId.TextMeasurementWorker, mockRpc)
  return Object.assign(mockRpc, {
    [Symbol.dispose]() {
      remove(RpcId.TextMeasurementWorker)
    },
  })
}

export const set = (rpc: Rpc): void => {
  setRpc(RpcId.TextMeasurementWorker, rpc)
}
