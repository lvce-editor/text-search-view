import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setDeltaY } from '../src/parts/SetDeltaY/SetDeltaY.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const createItems = (): readonly SearchResult[] =>
  Array.from({ length: 100 }, (_value, index) => ({
    end: 0,
    lineNumber: index,
    start: 0,
    text: `match-${index}`,
    type: TextSearchResultType.Match,
  }))

test('setDeltaY - no change when same deltaY', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 100,
    finalDeltaY: 200,
    headerHeight: 40,
    height: 500,
    itemHeight: 20,
    listItems: createItems(),
  }

  const result = await setDeltaY(state, 100)
  expect(result).toBe(state)
})

test('setDeltaY - updates state with new deltaY', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    finalDeltaY: 200,
    headerHeight: 40,
    height: 500,
    itemHeight: 20,
    listItems: createItems(),
    maxLineY: 23,
    minLineY: 0,
  }

  const result = await setDeltaY(state, 100)

  expect(result).not.toBe(state)
  expect(result.deltaY).toBe(100)
  expect(result.minLineY).toBe(5) // 100/20
  expect(result.maxLineY).toBe(29) // minLineY + visible items (23)
})

test('setDeltaY - clamps value within bounds', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    finalDeltaY: 200,
    headerHeight: 40,
    height: 500,
    itemHeight: 20,
    listItems: createItems(),
    maxLineY: 23,
    minLineY: 0,
  }

  const result = await setDeltaY(state, 1000)

  expect(result).not.toBe(state)
  expect(result.deltaY).toBe(200)
  expect(result.minLineY).toBe(10) // 200/20
  expect(result.maxLineY).toBe(34) // minLineY + visible items (23)
})
