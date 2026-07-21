import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TextSearchExtension from '../src/parts/TextSearchExtension/TextSearchExtension.ts'

test('textSearch - extension search', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostTextSearch.executeTextSearchProvider': () => [
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: './index.txt',
        type: 1,
      },
      {
        end: 212,
        lineNumber: 1,
        start: 208,
        text: '    <title>Document</title>\n',
        type: 2,
      },
    ],
  })

  const mockResults = {
    limitHit: false,
    results: [
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: './index.txt',
        type: 1,
      },
      {
        end: 212,
        lineNumber: 1,
        start: 208,
        text: '    <title>Document</title>\n',
        type: 2,
      },
    ],
  }

  const result = await TextSearchExtension.textSearch('xyz', 'xyz://', 'abc')
  expect(result).toEqual(mockResults)
  expect(mockRpc.invocations).toEqual([['ExtensionHostTextSearch.executeTextSearchProvider', 'xyz', 'abc']])
})

test('textSearch - extension search error', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostTextSearch.executeTextSearchProvider': () => {
      throw new TypeError('x is not a function')
    },
  })

  await expect(TextSearchExtension.textSearch('xyz', 'xyz://', 'abc')).rejects.toThrow(new TypeError('x is not a function'))
  expect(mockRpc.invocations).toEqual([['ExtensionHostTextSearch.executeTextSearchProvider', 'xyz', 'abc']])
})
