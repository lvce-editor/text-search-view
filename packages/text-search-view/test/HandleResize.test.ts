import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleResize } from '../src/parts/HandleResize/HandleResize.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const createMatchItem = (text: string): SearchResult => {
  return {
    end: 0,
    lineNumber: 0,
    start: 0,
    text,
    type: TextSearchResultType.Match,
  }
}

test('handleResize - clamps delta and computes visible items when content overflows', async () => {
  const listItems = [
    createMatchItem('match-0'),
    createMatchItem('match-1'),
    createMatchItem('match-2'),
    createMatchItem('match-3'),
    createMatchItem('match-4'),
    createMatchItem('match-5'),
    createMatchItem('match-6'),
    createMatchItem('match-7'),
    createMatchItem('match-8'),
    createMatchItem('match-9'),
  ]
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 999,
    fileIconCache: {},
    headerHeight: 40,
    itemHeight: 20,
    listItems,
    minimumSliderSize: 20,
  }

  const result = await handleResize(state, 10, 20, 300, 140)

  expect(result.deltaY).toBe(100)
  expect(result.finalDeltaY).toBe(100)
  expect(result.minLineY).toBe(5)
  expect(result.maxLineY).toBe(10)
  expect(result.scrollBarHeight).toBe(98)
  expect(result.scrollBarY).toBe(2)
  expect(result.icons).toEqual(['', '', '', '', ''])
  expect(result.fileIconCache).toBe(state.fileIconCache)
  expect(result.x).toBe(10)
  expect(result.y).toBe(20)
  expect(result.width).toBe(300)
  expect(result.height).toBe(140)
})

test('handleResize - sets scrollBarY to 0 when content fits in viewport', async () => {
  const listItems = [createMatchItem('match-0'), createMatchItem('match-1'), createMatchItem('match-2')]
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 50,
    fileIconCache: {},
    headerHeight: 40,
    itemHeight: 20,
    listItems,
    minimumSliderSize: 20,
  }

  const result = await handleResize(state, 0, 0, 200, 140)

  expect(result.deltaY).toBe(0)
  expect(result.finalDeltaY).toBe(0)
  expect(result.minLineY).toBe(0)
  expect(result.maxLineY).toBe(3)
  expect(result.scrollBarHeight).toBe(0)
  expect(result.scrollBarY).toBe(0)
  expect(result.icons).toEqual(['', '', ''])
})
