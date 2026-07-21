import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as GetContextMenuHandler from '../src/parts/GetContextMenuHandler/GetContextMenuHandler.ts'
import * as MouseEventType from '../src/parts/MouseEventType/MouseEventType.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'
import * as ViewletSearchHandleContextMenuKeyBoard from '../src/parts/ViewletSearchHandleContextMenuKeyBoard/ViewletSearchHandleContextMenuKeyBoard.ts'
import * as ViewletSearchHandleContextMenuMouseAt from '../src/parts/ViewletSearchHandleContextMenuMouseAt/ViewletSearchHandleContextMenuMouseAt.ts'

test('getContextMenuHandler returns keyboard handler for Keyboard button', () => {
  const handler = GetContextMenuHandler.getContextMenuHandler(MouseEventType.Keyboard)
  expect(handler).toBe(ViewletSearchHandleContextMenuKeyBoard.handleContextMenuKeyboard)
})

test('getContextMenuHandler returns mouse handler for default button', () => {
  const handler = GetContextMenuHandler.getContextMenuHandler(0)
  expect(handler).toBe(ViewletSearchHandleContextMenuMouseAt.handleContextMenuMouseAt)
})

test('getContextMenuHandler returns mouse handler for button 1', () => {
  const handler = GetContextMenuHandler.getContextMenuHandler(1)
  expect(handler).toBe(ViewletSearchHandleContextMenuMouseAt.handleContextMenuMouseAt)
})

test('getContextMenuHandler returns mouse handler for button 2', () => {
  const handler = GetContextMenuHandler.getContextMenuHandler(2)
  expect(handler).toBe(ViewletSearchHandleContextMenuMouseAt.handleContextMenuMouseAt)
})

test('keyboard handler works correctly', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    x: 100,
    y: 200,
  }

  const handler = GetContextMenuHandler.getContextMenuHandler(MouseEventType.Keyboard)
  const result = await handler(state, 100, 200)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    ['ContextMenu.show2', state.uid, MenuEntryId.Search, state.x, state.y, { index: 0, menuId: MenuEntryId.Search }],
  ])
})

test('mouse handler works correctly', async () => {
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

  const handler = GetContextMenuHandler.getContextMenuHandler(0)
  const result = await handler(state, x, y)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', state.uid, MenuEntryId.Search, x, y, { index: -1, menuId: MenuEntryId.Search }]])
})
