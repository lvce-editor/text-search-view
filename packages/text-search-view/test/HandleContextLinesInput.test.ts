import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleContextLinesInput } from '../src/parts/HandleContextLinesInput/HandleContextLinesInput.ts'

test('handleContextLinesInput - updates context lines', async () => {
  const state = CreateDefaultState.createDefaultState()
  const newState = await handleContextLinesInput(state, '3')
  expect(newState.contextLines).toBe(3)
})

test('handleContextLinesInput - clamps negative values', async () => {
  const state = CreateDefaultState.createDefaultState()
  const newState = await handleContextLinesInput(state, '-1')
  expect(newState.contextLines).toBe(0)
})

test('handleContextLinesInput - treats an empty value as zero', async () => {
  const state = CreateDefaultState.createDefaultState()
  const newState = await handleContextLinesInput(state, '')
  expect(newState.contextLines).toBe(0)
})

test('handleContextLinesInput - ignores invalid values', async () => {
  const state = CreateDefaultState.createDefaultState()
  const newState = await handleContextLinesInput(state, 'invalid')
  expect(newState).toBe(state)
})
