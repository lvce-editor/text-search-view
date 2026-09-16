import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import { getIconsCached } from '../src/parts/GetFileIconsCached/GetFileIconsCached.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const createFile = (text: string): SearchResult => ({
  end: 0,
  lineNumber: 0,
  start: 0,
  text,
  type: TextSearchResultType.File,
})

const createDirectory = (text: string): SearchResult => ({
  ...createFile(text),
  isDirectory: true,
})

test('getIconsCached returns cached icons for files and directories', () => {
  expect(
    getIconsCached([createDirectory('src'), createFile('src/file.ts'), { ...createFile('match'), type: TextSearchResultType.Match }], {
      src: 'folder-icon',
      'src/file.ts': 'file-icon',
    }),
  ).toEqual(['folder-icon', 'file-icon', ''])
})
