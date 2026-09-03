import { expect, test } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as GetFileIcons from '../src/parts/GetFileIcons/GetFileIcons.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('GetFileIcons', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-icon', 'css-icon'],
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

  expect(result).toEqual({
    icons: ['file-icon', '', 'css-icon'],
    newFileIconCache: {
      'file1.txt': 'file-icon',
      'file3.css': 'css-icon',
    },
  })
  expect(mockRpc.invocations).toEqual([
    [
      'IconTheme.getIcons',
      [
        { name: 'file1.txt', type: 1 },
        { name: 'file3.css', type: 1 },
      ],
    ],
  ])
})
