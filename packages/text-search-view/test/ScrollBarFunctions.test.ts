import { expect, test } from '@jest/globals'
import * as ScrollBarFunctions from '../src/parts/ScrollBarFunctions/ScrollBarFunctions.ts'

test('getScrollBarSize - returns 0 when size >= contentSize', () => {
  expect(ScrollBarFunctions.getScrollBarSize(100, 100, 20)).toBe(0)
  expect(ScrollBarFunctions.getScrollBarSize(120, 100, 20)).toBe(0)
})

test('getScrollBarSize - returns minimum slider size when calculated size is smaller', () => {
  expect(ScrollBarFunctions.getScrollBarSize(10, 1000, 20)).toBe(20)
})

test('getScrollBarSize - returns calculated size when larger than minimum', () => {
  expect(ScrollBarFunctions.getScrollBarSize(100, 400, 20)).toBe(25) // (100^2)/400 = 25
})

test('getScrollBarY - calculates correct offset', () => {
  expect(ScrollBarFunctions.getScrollBarY(50, 100, 200, 40)).toBe(80) // (50/100) * (200-40)
  expect(ScrollBarFunctions.getScrollBarY(0, 100, 200, 40)).toBe(0)
  expect(ScrollBarFunctions.getScrollBarY(100, 100, 200, 40)).toBe(160)
})

test('getNewDeltaPercent - clicked at top', () => {
  const result = ScrollBarFunctions.getNewDeltaPercent(100, 20, 5)
  expect(result).toEqual({
    handleOffset: 5,
    percent: 0,
  })
})

test('getNewDeltaPercent - clicked in middle', () => {
  const result = ScrollBarFunctions.getNewDeltaPercent(100, 20, 50)
  expect(result).toEqual({
    handleOffset: 10,
    percent: 0.5,
  })
})

test('getNewDeltaPercent - clicked at bottom', () => {
  const result = ScrollBarFunctions.getNewDeltaPercent(100, 20, 91)
  expect(result).toEqual({
    handleOffset: 11,
    percent: 1,
  })
})
