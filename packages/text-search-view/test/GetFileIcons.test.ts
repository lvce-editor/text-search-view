import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as GetFileIcons from '../src/parts/GetFileIcons/GetFileIcons.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test.skip('GetFileIcons', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => 'file-icon',
  })

  const mockFiles: readonly SearchResult[] = [
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: 'file1.txt',
      type: TextSearchResultType.File,
    },
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: 'file2.js',
      type: TextSearchResultType.Match,
    },
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: 'file3.css',
      type: TextSearchResultType.File,
    },
  ]

  const result = await GetFileIcons.getFileIcons(mockFiles, {})

  expect(result).toEqual(['file-icon', '', 'file-icon'])
  expect(mockRpc.invocations).toEqual([
    ['IconTheme.getFileIcon', { name: 'file1.txt' }],
    ['IconTheme.getFileIcon', { name: 'file3.css' }],
  ])
})
