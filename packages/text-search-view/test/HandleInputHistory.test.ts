import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleInput } from '../src/parts/HandleInput/HandleInput.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('handleInput resets history navigation when the user edits the query', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    history: ['first', 'second'],
    historyIndex: 1,
    value: 'second',
  }

  const result = await handleInput(state, 'edited', InputSource.User)

  expect(result).toMatchObject({
    historyIndex: -1,
    value: 'edited',
  })
})
