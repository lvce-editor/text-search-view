import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletSearchHandleContextMenuKeyBoard from '../src/parts/ViewletSearchHandleContextMenuKeyBoard/ViewletSearchHandleContextMenuKeyBoard.ts'

test('handleContextMenuKeyboard uses the focused index', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 2,
    x: 100,
    y: 200,
  }

  const result = await ViewletSearchHandleContextMenuKeyBoard.handleContextMenuKeyboard(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', state.uid, 18, 100, 200, { index: 2, menuId: 18 }]])
})

test('handleContextMenuKeyboard falls back to the list-focused index', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    listFocusedIndex: 3,
    x: 100,
    y: 200,
  }

  const result = await ViewletSearchHandleContextMenuKeyBoard.handleContextMenuKeyboard(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', state.uid, 18, 100, 200, { index: 3, menuId: 18 }]])
})
