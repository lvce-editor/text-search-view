import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setDeltaY } from '../src/parts/SetDeltaY/SetDeltaY.ts'

test('setDeltaY - no change when same deltaY', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 100,
    finalDeltaY: 200,
    headerHeight: 40,
    height: 500,
    itemHeight: 20,
    listItems: Array.from({ length: 100 }),
  }

  const result = setDeltaY(state, 100)
  expect(result).toBe(state)
})

test('setDeltaY - updates state with new deltaY', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    finalDeltaY: 200,
    headerHeight: 40,
    height: 500,
    itemHeight: 20,
    listItems: Array.from({ length: 100 }),
    maxLineY: 23,
    minLineY: 0,
  }

  const result = setDeltaY(state, 100)

  expect(result).not.toBe(state)
  expect(result.deltaY).toBe(100)
  expect(result.minLineY).toBe(5) // 100/20
  expect(result.maxLineY).toBe(29) // minLineY + visible items (23)
})

test('setDeltaY - clamps value within bounds', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    finalDeltaY: 200,
    headerHeight: 40,
    height: 500,
    itemHeight: 20,
    listItems: Array.from({ length: 100 }),
    maxLineY: 23,
    minLineY: 0,
  }

  const result = setDeltaY(state, 1000)

  expect(result).not.toBe(state)
  expect(result.deltaY).toBe(200)
  expect(result.minLineY).toBe(10) // 200/20
  expect(result.maxLineY).toBe(34) // minLineY + visible items (23)
})
