import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { toggleContextLines } from '../src/parts/ToggleContextLines/ToggleContextLines.ts'

test('toggleContextLines', async () => {
  const state = CreateDefaultState.createDefaultState()
  const newState = await toggleContextLines(state)
  expect(newState.contextLinesEnabled).toBe(true)
})
