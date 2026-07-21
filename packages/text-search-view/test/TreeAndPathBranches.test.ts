import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import { createParentFolderTree } from '../src/parts/CreateTree/CreateTree.ts'
import { mergeTrees } from '../src/parts/MergeTrees/MergeTrees.ts'
import { dirname2, join2 } from '../src/parts/Path/Path.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'
import { treeToList } from '../src/parts/TreeToList/TreeToList.ts'
import { create } from '../src/parts/VirtualList/VirtualList.ts'

const file = (text: string): SearchResult => ({
  end: 0,
  lineNumber: 0,
  start: 0,
  text,
  type: TextSearchResultType.File,
})

const match = (text: string): SearchResult => ({
  end: text.length,
  lineNumber: 1,
  start: 0,
  text,
  type: TextSearchResultType.Match,
})

test('createParentFolderTree groups files and ignores matches', () => {
  const result = createParentFolderTree([file('src/one.ts'), file('src/two.ts'), match('value')])

  expect({ ...result }).toEqual({
    src: [file('src/one.ts'), file('src/two.ts')],
  })
})

test('mergeTrees appends existing children and adds new keys', () => {
  expect(
    mergeTrees(
      {
        src: [file('one.ts')],
      },
      {
        src: [file('two.ts')],
        test: [file('one.test.ts')],
      },
    ),
  ).toEqual({
    src: [file('one.ts'), file('two.ts')],
    test: [file('one.test.ts')],
  })
})

test('treeToList handles missing roots, matches, files, and nested children', () => {
  const tree = {
    '': [file('src'), match('root match')],
    '/src': [file('index.ts'), match('source match')],
  }

  expect(treeToList({}, '/workspace')).toEqual([])
  expect(treeToList(tree, '/workspace')).toEqual([
    file('/workspace/src'),
    file('/workspace/src/index.ts'),
    match('source match'),
    match('root match'),
  ])
})

test('path helpers support paths with and without separators', () => {
  expect(dirname2('file.txt')).toBe('file.txt')
  expect(dirname2('src/file.txt')).toBe('src')
  expect(join2('src/', 'file.txt')).toBe('src/file.txt')
  expect(join2('src', 'file.txt')).toBe('src/file.txt')
})

test('virtual list uses default and explicit options', () => {
  expect(create({ itemHeight: 22 } as any)).toMatchObject({
    headerHeight: 0,
    itemHeight: 22,
    minimumSliderSize: 20,
  })
  expect(create({ headerHeight: 40, itemHeight: 18, minimumSliderSize: 10 })).toMatchObject({
    headerHeight: 40,
    itemHeight: 18,
    minimumSliderSize: 10,
  })
})
