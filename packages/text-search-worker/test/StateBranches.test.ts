import { expect, test } from '@jest/globals'
import { MouseEventType } from '@lvce-editor/constants'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleHeaderFocusOut } from '../src/parts/HandleHeaderFocusOut/HandleHeaderFocusOut.ts'
import { handleListFocus } from '../src/parts/HandleListFocus/HandleListFocus.ts'
import { handleListPointerDown } from '../src/parts/ListHandlePointerDown/ListHandlePointerDown.ts'
import { removeCurrent } from '../src/parts/RemoveCurrent/RemoveCurrent.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('handleHeaderFocusOut preserves an unfocused state', () => {
  const state = createDefaultState()
  expect(handleHeaderFocusOut(state)).toBe(state)
})

test('handleHeaderFocusOut clears header focus', () => {
  const state = {
    ...createDefaultState(),
    focus: 1,
    focused: true,
  }
  expect(handleHeaderFocusOut(state)).toEqual({
    ...state,
    focus: 0,
    focused: false,
  })
})

test('handleListFocus preserves an already focused list', async () => {
  const state = {
    ...createDefaultState(),
    listFocused: true,
  }
  expect(await handleListFocus(state)).toBe(state)
})

test('handleListFocus focuses the list', async () => {
  const state = createDefaultState()
  expect(await handleListFocus(state)).toEqual({
    ...state,
    listFocused: true,
  })
})

test('handleListPointerDown ignores named targets and non-left clicks', async () => {
  const state = createDefaultState()
  expect(await handleListPointerDown(state, MouseEventType.LeftClick, 'Remove')).toBe(state)
  expect(await handleListPointerDown(state, 1)).toBe(state)
})

test('handleListPointerDown focuses the list on a left click', async () => {
  const state = createDefaultState()
  expect(await handleListPointerDown(state, MouseEventType.LeftClick)).toEqual({
    ...state,
    listFocused: true,
  })
})

test('removeCurrent preserves state when neither focus index is set', async () => {
  const state = createDefaultState()
  expect(await removeCurrent(state)).toBe(state)
})

test('removeCurrent falls back to the list focus index', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => [],
  })
  const state = {
    ...createDefaultState(),
    fileCount: 1,
    items: [{ end: 0, lineNumber: 0, start: 0, text: 'file.txt', type: TextSearchResultType.File }],
    listFocusedIndex: 0,
    listItems: [{ end: 0, lineNumber: 0, start: 0, text: 'file.txt', type: TextSearchResultType.File }],
  }

  const result = await removeCurrent(state)

  expect(result.items).toEqual([])
  expect(result.fileCount).toBe(0)
  expect(mockRpc.invocations).toEqual([])
})

test('removeCurrent prefers the focused index', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => [],
  })
  const items = [
    { end: 0, lineNumber: 0, start: 0, text: 'one.txt', type: TextSearchResultType.File },
    { end: 0, lineNumber: 1, start: 0, text: 'two.txt', type: TextSearchResultType.File },
  ]
  const state = {
    ...createDefaultState(),
    fileCount: 2,
    focusedIndex: 1,
    items,
    listFocusedIndex: 0,
    listItems: items,
  }

  const result = await removeCurrent(state)

  expect(result.items).toEqual([items[0]])
  expect(mockRpc.invocations).toEqual([])
})
