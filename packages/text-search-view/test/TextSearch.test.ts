import { expect, test } from '@jest/globals'
import { TextSearchWorker } from '@lvce-editor/rpc-registry'
import type { TextSearchOptions } from '../src/parts/TextSearchOptions/TextSearchOptions.ts'
import { textSearch } from '../src/parts/TextSearch/TextSearch.ts'

test('textSearch - delegates searching to the text search worker', async () => {
  const completion = {
    limitHit: false,
    results: [{ end: 0, lineNumber: 0, start: 0, text: 'result', type: 1 }],
  }
  using mockRpc = TextSearchWorker.registerMockRpc({
    'TextSearch.search': () => completion,
  })
  const options = {
    assetDir: '/assets',
    exclude: '',
    flags: 0,
    include: '*.ts',
    isCaseSensitive: false,
    limit: 20_000,
    matchWholeWord: false,
    query: 'search term',
    root: 'file:///workspace',
    scheme: 'file',
    threads: 1,
    useIgnoreFiles: true,
    usePullBasedSearch: false,
    useRegularExpression: false,
  } satisfies TextSearchOptions

  const result = await textSearch('file:///workspace', 'search term', options, '/assets', 1, 'search-1', 42)

  expect(result).toEqual(completion)
  expect(mockRpc.invocations).toEqual([['TextSearch.search', 'file:///workspace', 'search term', options, '/assets', 1, 'search-1', 42]])
})
