import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleOpenFolderClick from '../src/parts/HandleOpenFolderClick/HandleOpenFolderClick.ts'

test('handleOpenFolderClick', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Dialog.openFolder': () => undefined,
  })
  const state = createDefaultState()

  const result = await HandleOpenFolderClick.handleOpenFolderClick(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Dialog.openFolder']])
})
