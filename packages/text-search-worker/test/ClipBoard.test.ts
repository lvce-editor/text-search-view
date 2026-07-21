import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ClipBoard from '../src/parts/ClipBoard/ClipBoard.ts'

test('writeText - writes text to clipboard', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  await ClipBoard.writeText('test text')

  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'test text']])
})

test('writeText - writes empty string to clipboard', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  await ClipBoard.writeText('')

  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', '']])
})

test('readText - reads text from clipboard', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readText': () => 'clipboard content',
  })

  const result = await ClipBoard.readText()

  expect(result).toBe('clipboard content')
  expect(mockRpc.invocations).toEqual([['ClipBoard.readText']])
})

test('readText - reads empty string from clipboard', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readText': () => '',
  })

  const result = await ClipBoard.readText()

  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([['ClipBoard.readText']])
})
