import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ReplaceAllAndPrompt from '../src/parts/ReplaceAllAndPrompt/ReplaceAllAndPrompt.ts'

test('replaceAllAndPrompt - user cancels prompt', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => false,
  })

  const result = await ReplaceAllAndPrompt.replaceAllAndPrompt('/test/workspace', [{ text: 'test.txt', type: 'file' }], 'replacement', 5, 2)

  expect(result).toBe(false)
  expect(mockRpc.invocations).toEqual([
    [
      'ConfirmPrompt.prompt',
      "Replace 5 occurrences across 2 files with 'replacement'",
      {
        confirmMessage: 'Replace',
        title: 'Replace All',
      },
    ],
  ])
})

test('replaceAllAndPrompt - user confirms prompt', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => true,
  })

  const result = await ReplaceAllAndPrompt.replaceAllAndPrompt('/test/workspace', [{ text: 'test.txt', type: 'file' }], 'replacement', 5, 2)

  expect(result).toBe(true)
  expect(mockRpc.invocations).toEqual([
    [
      'ConfirmPrompt.prompt',
      "Replace 5 occurrences across 2 files with 'replacement'",
      {
        confirmMessage: 'Replace',
        title: 'Replace All',
      },
    ],
  ])
})

test('replaceAllAndPrompt - validates input parameters', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})

  await expect(ReplaceAllAndPrompt.replaceAllAndPrompt(123 as any, [], 'replacement', 5, 2)).rejects.toThrow()
  expect(mockRpc.invocations).toEqual([])
})
