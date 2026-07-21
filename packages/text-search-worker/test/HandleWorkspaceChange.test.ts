import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleWorkspaceChange from '../src/parts/HandleWorkspaceChange/HandleWorkspaceChange.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('handleWorkspaceChange - clears search, replace, and search results', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 10,
    items: [{ end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File }],
    listItems: [{ end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File }],
    matchCount: 1,
    maxLineY: 20,
    message: '1 result in 1 file',
    minLineY: 5,
    replacement: 'replace-me',
    value: 'search-me',
    workspacePath: 'test',
  }

  const result = HandleWorkspaceChange.handleWorkspaceChange(state)

  expect(result).toEqual({
    ...state,
    deltaY: 0,
    items: [],
    listItems: [],
    matchCount: 0,
    maxLineY: 0,
    message: '',
    minLineY: 0,
    replacement: '',
    value: '',
  })
})
