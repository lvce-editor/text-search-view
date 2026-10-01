import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { submit } from '../src/parts/Submit/Submit.ts'

test('submit appends the query to history and resets history navigation', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    history: ['first'],
    historyIndex: 0,
    value: 'second',
  }

  const result = await submit(state)

  expect(result).toMatchObject({
    history: ['first', 'second'],
    historyIndex: -1,
    value: 'second',
  })
})
