import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CopyAll from '../src/parts/CopyAll/CopyAll.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('copyAll - no focused item returns same state', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: -1,
    items: [],
  }

  const result = await CopyAll.copyAll(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('copyAll - copies all matches for focused file item', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'test.css', type: TextSearchResultType.File },
      { end: 2, lineNumber: 1, start: 0, text: 'abc', type: TextSearchResultType.Match },
      { end: 2, lineNumber: 2, start: 0, text: 'abx', type: TextSearchResultType.Match },
    ],
  }

  const result = await CopyAll.copyAll(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'abc\nabx']])
})

test('copyAll - copies all matches for focused match item', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 1,
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'test.css', type: TextSearchResultType.File },
      { end: 2, lineNumber: 1, start: 0, text: 'abc', type: TextSearchResultType.Match },
      { end: 2, lineNumber: 2, start: 0, text: 'abx', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 0, start: 0, text: 'other.css', type: TextSearchResultType.File },
      { end: 2, lineNumber: 1, start: 0, text: 'aby', type: TextSearchResultType.Match },
    ],
  }

  const result = await CopyAll.copyAll(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'abc\nabx']])
})

test('copyAll - ignores an out-of-range focus index', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 1,
    items: [],
  }
  expect(await CopyAll.copyAll(state)).toBe(state)
})

test('copyAll - ignores a match without a preceding file', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items: [{ end: 2, lineNumber: 1, start: 0, text: 'abc', type: TextSearchResultType.Match }],
  }
  expect(await CopyAll.copyAll(state)).toBe(state)
})

test('copyAll - ignores a file without matches', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items: [{ end: 0, lineNumber: 0, start: 0, text: 'test.css', type: TextSearchResultType.File }],
  }
  expect(await CopyAll.copyAll(state)).toBe(state)
})
