import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const countOccurrences = (value: string, search: string): number => {
  return value.split(search).length - 1
}

test('renderCss - returns SetCss command with generated css', () => {
  const uid = 42
  const oldState = {
    ...CreateDefaultState.createDefaultState(),
    uid,
  }
  const listItems: readonly SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: '/workspace/file-1.ts', type: TextSearchResultType.File },
    { end: 5, lineNumber: 1, start: 2, text: 'match 1', type: TextSearchResultType.Match },
    { end: 7, lineNumber: 2, start: 1, text: 'match 2', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 3, start: 0, text: '/workspace/file-2.ts', type: TextSearchResultType.File },
  ]
  const newState = {
    ...oldState,
    fileCount: 2,
    finalDeltaY: 10,
    height: 120,
    items: listItems,
    listItems,
    maxLineY: 4,
    value: 'match',
  }

  const result = renderCss(oldState, newState)
  expect(result).toEqual([ViewletCommand.SetCss, uid, expect.any(String)])

  const css = result[2] as string
  expect(css).toContain('--TreeItemsTop: 0px;')
  expect(css).toContain('.Indent-16 {')
  expect(css).toContain('.Indent-28 {')
  expect(css).toContain('.IndentRight-12 {')
  expect(css).toContain('.TreeItemsTop-0 {')
  expect(countOccurrences(css, '.Indent-16 {')).toBe(1)
  expect(countOccurrences(css, '.Indent-28 {')).toBe(1)
  expect(countOccurrences(css, '.IndentRight-12 {')).toBe(1)
})

test('renderCss - rounds subpixel tree items top values', () => {
  const uid = 5
  const oldState = {
    ...CreateDefaultState.createDefaultState(),
    uid,
  }
  const newState = {
    ...oldState,
    deltaY: 18.609375,
    finalDeltaY: 100,
    height: 200,
    itemHeight: 22,
  }

  const result = renderCss(oldState, newState)
  const css = result[2] as string
  expect(css).toContain('.TreeItemsTop--19 {')
  expect(css).toContain('top: -19px;')
  expect(css).not.toContain('18.609375')
})
