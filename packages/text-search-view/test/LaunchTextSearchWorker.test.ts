import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as LaunchTextSearchWorker from '../src/parts/LaunchTextSearchWorker/LaunchTextSearchWorker.ts'

test('launchTextSearchWorker - connects lazily through the renderer worker', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToTextSearchWorker': () => undefined,
  })

  const rpc = await LaunchTextSearchWorker.launchTextSearchWorker()
  expect(mockRpc.invocations).toEqual([])

  await Promise.resolve(rpc.send('TextSearch.search'))

  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToTextSearchWorker', expect.anything(), 'HandleMessagePort.handleMessagePort', 0],
  ])
  await rpc.dispose()
})
