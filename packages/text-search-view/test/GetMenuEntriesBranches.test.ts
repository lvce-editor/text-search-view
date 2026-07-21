import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../src/parts/ContextMenuProps/ContextMenuProps.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntries } from '../src/parts/GetMenuEntries/GetMenuEntries.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const file = {
  end: 0,
  lineNumber: 0,
  start: 0,
  text: 'file.txt',
  type: TextSearchResultType.File,
}

const match = {
  end: 5,
  lineNumber: 1,
  start: 0,
  text: 'match',
  type: TextSearchResultType.Match,
}

test('returns input entries for an input context menu', () => {
  const entries = getMenuEntries(createDefaultState(), {
    inputName: 'SearchValue',
    menuId: MenuEntryId.InputContextMenu,
  })

  expect(entries.map(({ id }) => id)).toEqual(['cut', 'copy', 'paste', 'separator', 'selectAll'])
})

test('returns no input entries when the input name is empty', () => {
  expect(
    getMenuEntries(createDefaultState(), {
      inputName: '',
      menuId: MenuEntryId.InputContextMenu,
    }),
  ).toEqual([])
})

test('returns file entries for a file result', () => {
  const state = {
    ...createDefaultState(),
    items: [file],
  }

  expect(getMenuEntries(state, { index: 0, menuId: MenuEntryId.Search }).map(({ id }) => id)).toEqual([
    'replaceAll',
    'dismiss',
    'copy',
    'copyPath',
    'copyAll',
  ])
})

test('returns match entries for a match result', () => {
  const state = {
    ...createDefaultState(),
    items: [match],
  }

  expect(getMenuEntries(state, { index: 0, menuId: MenuEntryId.Search }).map(({ id }) => id)).toEqual(['dismiss', 'copy', 'copyAll'])
})

test('returns no entries for a missing or unknown result', () => {
  const state = {
    ...createDefaultState(),
    items: [{ ...file, type: 99 }],
  }

  expect(getMenuEntries(state, { index: 1, menuId: MenuEntryId.Search })).toEqual([])
  expect(getMenuEntries(state, { index: 0, menuId: MenuEntryId.Search })).toEqual([])
})

test('returns no entries for an unknown menu', () => {
  expect(getMenuEntries(createDefaultState(), { menuId: 99 } as unknown as ContextMenuProps)).toEqual([])
})
