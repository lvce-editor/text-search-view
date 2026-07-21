import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleInputContextMenu from '../src/parts/HandleInputContextMenu/HandleInputContextMenu.ts'

test('handleInputContextMenu calls ContextMenu.show2 with correct parameters', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    x: 100,
    y: 200,
  }
  const name = 'searchInput'
  const button = 2
  const x = 150
  const y = 250

  const result = await HandleInputContextMenu.handleInputContextMenu(state, name, button, x, y)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.uid,
      MenuEntryId.InputContextMenu,
      x,
      y,
      {
        inputName: name,
        menuId: MenuEntryId.InputContextMenu,
      },
    ],
  ])
})

test('handleInputContextMenu works with different input name', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    x: 50,
    y: 75,
  }
  const name = 'replaceInput'
  const button = 0
  const x = 300
  const y = 400

  const result = await HandleInputContextMenu.handleInputContextMenu(state, name, button, x, y)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.uid,
      MenuEntryId.InputContextMenu,
      x,
      y,
      {
        inputName: name,
        menuId: MenuEntryId.InputContextMenu,
      },
    ],
  ])
})

test('handleInputContextMenu returns state unchanged', async () => {
  RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    x: 0,
    y: 0,
  }
  const name = 'testInput'
  const button = 1
  const x = 500
  const y = 600

  const result = await HandleInputContextMenu.handleInputContextMenu(state, name, button, x, y)

  expect(result).toBe(state)
})
