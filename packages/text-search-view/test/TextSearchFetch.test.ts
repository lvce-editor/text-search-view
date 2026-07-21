import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TextSearchFetch from '../src/parts/TextSearchFetch/TextSearchFetch.ts'

test('textSearch - calls ParentRpc with correct arguments', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostTextSearch.textSearchFetch': () => [
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: './index.txt',
        type: 1,
      },
    ],
  })

  const scheme = 'fetch'
  const root = 'fetch://example.com'
  const query = 'test'
  const options = { includePattern: '*.txt' } as any
  const assetDir = '/assets'

  const result = await TextSearchFetch.textSearch(scheme, root, query, options, assetDir)

  expect(result).toEqual({
    limitHit: false,
    results: [
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: './index.txt',
        type: 1,
      },
    ],
  })
  expect(mockRpc.invocations).toEqual([['ExtensionHostTextSearch.textSearchFetch', scheme, root, query, options, assetDir]])
})

test('textSearch - handles error from ParentRpc', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostTextSearch.textSearchFetch': () => {
      throw new Error('Network error')
    },
  })

  const scheme = 'fetch'
  const root = 'fetch://example.com'
  const query = 'test'
  const options = {} as any
  const assetDir = '/assets'

  await expect(TextSearchFetch.textSearch(scheme, root, query, options, assetDir)).rejects.toThrow('Network error')
  expect(mockRpc.invocations).toEqual([['ExtensionHostTextSearch.textSearchFetch', scheme, root, query, options, assetDir]])
})
