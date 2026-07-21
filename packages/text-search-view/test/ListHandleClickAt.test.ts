import { test, expect } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickAt } from '../src/parts/ListHandleClickAt/ListHandleClickAt.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('handleClickAt selects the correct index', async () => {
  IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-icon'],
  })

  const state = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    flags: 0,
    itemHeight: 20,
    listItems: Array.from({ length: 10 }, (_, i): any => ({
      end: 0,
      lineNumber: 0,
      start: 0,
      text: `file${i}`,
      type: TextSearchResultType.File,
    })),
    x: 0,
    y: 0,
  }
  // Click at y=101 should select index 2 (itemHeight=20, topHeight=61)
  const result = await handleClickAt(state, 10, 101, '')
  expect(result.listFocusedIndex).toBe(2)
})

test('handleClickAt with click above list', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    flags: 0,
    itemHeight: 20,
    listItems: Array.from({ length: 10 }, (_, i): any => ({
      end: 0,
      lineNumber: 0,
      start: 0,
      text: `file${i}`,
      type: TextSearchResultType.File,
    })),
    x: 0,
    y: 0,
  }
  // Click at y=50 should select index -1 (above list area)
  const result = await handleClickAt(state, 10, 50, '')
  expect(result.listFocusedIndex).toBe(-1)
})

test('handleClickAt with click below list', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    flags: 0,
    itemHeight: 20,
    listItems: Array.from({ length: 5 }, (_, i): any => ({
      end: 0,
      lineNumber: 0,
      start: 0,
      text: `file${i}`,
      type: TextSearchResultType.File,
    })),
    x: 0,
    y: 0,
  }
  // Click at y=61+5*20=161 should select index -1 (below list area)
  const result = await handleClickAt(state, 10, 161, '')
  expect(result.listFocusedIndex).toBe(-1)
})

test('handleClickAt with empty list', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    flags: 0,
    itemHeight: 20,
    listItems: [],
    x: 0,
    y: 0,
  }
  const result = await handleClickAt(state, 10, 71, '')
  expect(result.listFocusedIndex).toBe(-1)
})

test('handleClickAt delegates remove button clicks', async () => {
  const state = CreateDefaultState.createDefaultState()
  const result = await handleClickAt(state, 0, 0, 'Remove')
  expect(result).toBe(state)
})
