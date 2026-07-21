import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderIncremental from '../src/parts/RenderIncremental/RenderIncremental.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('renderIncremental - returns non-empty patches when dom changes', () => {
  const oldState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    initial: false,
    uid: 1,
  }

  const newState: SearchState = {
    ...oldState,
    fileCount: 1,
    items: [{ end: 0, lineNumber: 0, start: 0, text: 'item1', type: TextSearchResultType.File }],
    listItems: [{ end: 0, lineNumber: 0, start: 0, text: 'item1', type: TextSearchResultType.File }],
    maxLineY: 10,
  }

  const result = RenderIncremental.renderIncremental(oldState, newState)
  expect(result[0]).toBe('Viewlet.setPatches')
  expect(result[1]).toBe(1)
  expect(Array.isArray(result[2])).toBe(true)
  expect(result[2].length).toBeGreaterThan(0)
})
