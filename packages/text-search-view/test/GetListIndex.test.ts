import { expect, test } from '@jest/globals'
import { getListIndex } from '../src/parts/GetListIndex/GetListIndex.ts'

test('getListIndex - first item', () => {
  const eventX = 100
  const eventY = 150
  const x = 50
  const y = 100
  const deltaY = 0
  const itemHeight = 20
  const topHeight = 0
  const itemCount = 100
  const result = getListIndex(eventX, eventY, x, y, deltaY, itemHeight, topHeight, itemCount)

  expect(result).toBe(2) // (150 - 100 + 0) / 20 = 2.5 -> 2
})

test('getListIndex - with deltaY offset', () => {
  const eventX = 100
  const eventY = 150
  const x = 50
  const y = 100
  const deltaY = 30
  const itemHeight = 20
  const topHeight = 0
  const itemCount = 100

  const result = getListIndex(eventX, eventY, x, y, deltaY, itemHeight, topHeight, itemCount)

  expect(result).toBe(4) // (150 - 100 + 30) / 20 = 4
})

test('getListIndex - negative index not possible', () => {
  const eventX = 100
  const eventY = 50
  const x = 50
  const y = 100
  const deltaY = 0
  const itemHeight = 20
  const topHeight = 0
  const itemCount = 100

  const result = getListIndex(eventX, eventY, x, y, deltaY, itemHeight, topHeight, itemCount)

  expect(result).toBe(-1) // (50 - 100 + 0) / 20 = -2.5 -> -2
})

test('getListIndex - eventX does not affect result', () => {
  const eventX = 999
  const eventY = 150
  const x = 50
  const y = 100
  const deltaY = 0
  const itemHeight = 20
  const topHeight = 0
  const itemCount = 100

  const result = getListIndex(eventX, eventY, x, y, deltaY, itemHeight, topHeight, itemCount)

  expect(result).toBe(2) // (50 - 100 + 0) / 20 = -2.5 -> -2
})
