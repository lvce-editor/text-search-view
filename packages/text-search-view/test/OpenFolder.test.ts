import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as OpenFolder from '../src/parts/OpenFolder/OpenFolder.ts'

test('openFolder', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Dialog.openFolder': () => undefined,
  })

  await OpenFolder.openFolder()

  expect(mockRpc.invocations).toEqual([['Dialog.openFolder']])
})
