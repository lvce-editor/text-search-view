import type { Rpc } from '@lvce-editor/rpc'
import { LazyWebSocketRpcParent2 } from '@lvce-editor/rpc'

export const launchSearchProcessNode = async (): Promise<Rpc> => {
  const rpc = await LazyWebSocketRpcParent2.create({
    commandMap: {},
    // @ts-ignore
    type: 'search-process',
  })
  return rpc
}
