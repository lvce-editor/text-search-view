import { expect, test } from '@jest/globals'
import * as GetNewMinMax from '../src/parts/GetNewMinMax/GetNewMinMax.ts'

test('getNewMinMax returns original values when maxLineY <= newItemsLength', () => {
  const result = GetNewMinMax.getNewMinMax(10, 2, 5, 100, 20)
  expect(result).toEqual({
    newDeltaY: 100,
    newMaxLineY: 5,
    newMinLineY: 2,
  })
})

test('getNewMinMax adjusts values when maxLineY > newItemsLength', () => {
  const result = GetNewMinMax.getNewMinMax(5, 2, 10, 100, 20)
  const diff = 10 - 2
  const expectedNewMinLineY = Math.max(5 - diff, 0)
  expect(result).toEqual({
    newDeltaY: expectedNewMinLineY * 20,
    newMaxLineY: 5,
    newMinLineY: expectedNewMinLineY,
  })
})

test('getNewMinMax handles case where newItemsLength is 0', () => {
  const result = GetNewMinMax.getNewMinMax(0, 2, 10, 100, 20)
  expect(result).toEqual({
    newDeltaY: 0,
    newMaxLineY: 0,
    newMinLineY: 0,
  })
})

test('getNewMinMax handles case where maxLineY equals newItemsLength', () => {
  const result = GetNewMinMax.getNewMinMax(10, 2, 10, 100, 20)
  expect(result).toEqual({
    newDeltaY: 100,
    newMaxLineY: 10,
    newMinLineY: 2,
  })
})

test('getNewMinMax handles case where adjustment results in minLineY at 0', () => {
  const result = GetNewMinMax.getNewMinMax(3, 5, 10, 100, 20)
  const diff = 10 - 5
  const expectedNewMinLineY = Math.max(3 - diff, 0)
  expect(result).toEqual({
    newDeltaY: expectedNewMinLineY * 20,
    newMaxLineY: 3,
    newMinLineY: expectedNewMinLineY,
  })
  expect(result.newMinLineY).toBe(0)
})

test('getNewMinMax handles different itemHeight values', () => {
  const result = GetNewMinMax.getNewMinMax(5, 2, 10, 100, 30)
  const diff = 10 - 2
  const expectedNewMinLineY = Math.max(5 - diff, 0)
  expect(result).toEqual({
    newDeltaY: expectedNewMinLineY * 30,
    newMaxLineY: 5,
    newMinLineY: expectedNewMinLineY,
  })
})

test('getNewMinMax handles case where minLineY is 0 and maxLineY > newItemsLength', () => {
  const result = GetNewMinMax.getNewMinMax(5, 0, 10, 0, 20)
  const diff = 10 - 0
  const expectedNewMinLineY = Math.max(5 - diff, 0)
  expect(result).toEqual({
    newDeltaY: expectedNewMinLineY * 20,
    newMaxLineY: 5,
    newMinLineY: expectedNewMinLineY,
  })
})
