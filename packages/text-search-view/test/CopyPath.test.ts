import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CopyPath from '../src/parts/CopyPath/CopyPath.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('copyPath - no focused item returns same state', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: -1,
    items: [],
  }

  const result = await CopyPath.copyPath(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('copyPath - copies text from focused item', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items: [{ end: 0, lineNumber: 0, start: 0, text: 'test text', type: 0 }],
  }

  const result = await CopyPath.copyPath(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'test text']])
})
