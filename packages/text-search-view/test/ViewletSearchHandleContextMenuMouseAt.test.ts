import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'
import * as ViewletSearchHandleContextMenuMouseAt from '../src/parts/ViewletSearchHandleContextMenuMouseAt/ViewletSearchHandleContextMenuMouseAt.ts'

test('handleContextMenuMouseAt - shows context menu and returns same state', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    x: 100,
    y: 200,
  }
  SearchViewStates.set(state.uid, state, state)
  const x = 100
  const y = 200

  const result = await ViewletSearchHandleContextMenuMouseAt.handleContextMenuMouseAt(state, x, y)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', state.uid, MenuEntryId.Search, x, y, { index: -1, menuId: MenuEntryId.Search }]])
})

test('handleContextMenuMouseAt - calls show with correct coordinates', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    x: 150,
    y: 250,
  }
  SearchViewStates.set(state.uid, state, state)
  const x = 350
  const y = 450

  await ViewletSearchHandleContextMenuMouseAt.handleContextMenuMouseAt(state, x, y)

  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', state.uid, MenuEntryId.Search, x, y, { index: -1, menuId: MenuEntryId.Search }]])
})
