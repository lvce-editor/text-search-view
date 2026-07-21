import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { noop } from '../src/parts/Noop/Noop.ts'

test('noop returns the state unchanged', () => {
  const state = CreateDefaultState.createDefaultState()
  const result = noop(state)
  expect(result).toBe(state)
})
