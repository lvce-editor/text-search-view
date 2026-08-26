import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MouseEventType from '../src/parts/MouseEventType/MouseEventType.ts'
import { handleContextMenu } from '../src/parts/ViewletSearchHandleContextMenu/ViewletSearchHandleContextMenu.ts'

test('handleContextMenu - keyboard event shows context menu for the focused item', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    x: 0,
    y: 0,
  }
  const button = MouseEventType.Keyboard
  const x = 100
  const y = 200

  const result = await handleContextMenu(state, button, x, y)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', state.uid, 18, 0, 0, { index: 0, menuId: 18 }]])
})
