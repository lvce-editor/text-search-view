import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffCss from '../src/parts/DiffCss/DiffCss.ts'

test('diffCss - equal when css inputs are unchanged', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = { ...oldState }
  expect(DiffCss.isEqual(oldState, newState)).toBe(true)
})

test('diffCss - not equal when tree items top class changes', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...oldState,
    deltaY: 1,
  }
  expect(DiffCss.isEqual(oldState, newState)).toBe(false)
})

test('diffCss - not equal when items change', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const oldItems = oldState.items
  const newItems = [...oldItems]
  const newState = {
    ...oldState,
    items: newItems,
  }
  expect(DiffCss.isEqual(oldState, newState)).toBe(false)
})
