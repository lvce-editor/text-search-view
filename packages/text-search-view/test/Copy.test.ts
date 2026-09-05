import { expect, test } from '@jest/globals'
import { ClipBoardWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Copy from '../src/parts/Copy/Copy.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('copy - no focused item returns same state', async () => {
  using mockRpc = ClipBoardWorker.registerMockRpc({})

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: -1,
    items: [],
  }

  const result = await Copy.copy(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('copy - copies text from focused item', async () => {
  using mockRpc = ClipBoardWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items: [{ end: 0, lineNumber: 0, start: 0, text: 'test text', type: 0 }],
  }

  const result = await Copy.copy(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'test text']])
})
