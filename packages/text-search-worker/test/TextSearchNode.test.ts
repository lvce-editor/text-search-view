import { expect, test, jest } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TextSearchNode from '../src/parts/TextSearchNode/TextSearchNode.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('textSearch - error', async () => {
  RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => {
      throw new TypeError('x is not a function')
    },
  })

  await expect(TextSearchNode.textSearch('', '/test', 'abc', {} as any)).rejects.toThrow(new TypeError('x is not a function'))
})

test('textSearch', async () => {
  const handler = jest.fn(() => ({
    limitHit: false,
    results: [
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: './index.txt',
        type: TextSearchResultType.File,
      },
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: '    <title>Document</title>\n',
        type: TextSearchResultType.Match,
      },
    ],
  }))
  using mockRpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': handler,
  })

  expect(await TextSearchNode.textSearch('', '/test', 'abc', {} as any)).toEqual({
    limitHit: false,
    results: [
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: './index.txt',
        type: TextSearchResultType.File,
      },
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: '    <title>Document</title>\n',
        type: TextSearchResultType.Match,
      },
    ],
  })
  expect(mockRpc.invocations).toEqual([
    [
      'SearchProcess.invoke',
      'TextSearch.search',
      {
        ripGrepArgs: [
          '--hidden',
          '--no-require-git',
          '--smart-case',
          '--stats',
          '--json',
          '--threads',
          'undefined',
          '--ignore-case',
          '--fixed-strings',
          '--',
          'abc',
          '.',
        ],
        searchDir: '/test',
      },
    ],
  ])
})

test('textSearch - pull based (file scheme)', async () => {
  const handler = jest.fn(() => undefined)
  using mockRpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': handler,
  })

  const result = await TextSearchNode.textSearch(
    'file',
    '/test',
    'abc',
    {
      defaultExcludes: [],
      exclude: '',
      isCaseSensitive: false,
      threads: 1,
      usePullBasedSearch: true,
      useRegularExpression: false,
    } as any,
    undefined,
    undefined,
    'search-1',
  )

  expect(result).toEqual({
    limitHit: false,
    results: [],
  })
  expect(mockRpc.invocations).toEqual([
    [
      'SearchProcess.invoke',
      'TextSearch.searchPull',
      {
        ripGrepArgs: [
          '--hidden',
          '--no-require-git',
          '--smart-case',
          '--stats',
          '--json',
          '--threads',
          '1',
          '--ignore-case',
          '--fixed-strings',
          '--',
          'abc',
          '.',
        ],
        searchDir: '/test',
        searchId: 'search-1',
      },
    ],
  ])
})
