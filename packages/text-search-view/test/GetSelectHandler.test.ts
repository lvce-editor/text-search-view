import { expect, test } from '@jest/globals'
import * as GetSelectHandler from '../src/parts/GetSelectHandler/GetSelectHandler.ts'
import * as SelectIndexFile from '../src/parts/SelectIndexFile/SelectIndexFile.ts'
import * as SelectIndexPreview from '../src/parts/SelectIndexPreview/SelectIndexPreview.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('getSelectHandler - file type', () => {
  const handler = GetSelectHandler.getSelectHandler(TextSearchResultType.File)
  expect(handler).toBe(SelectIndexFile.selectIndexFile)
})

test('getSelectHandler - match type', () => {
  const handler = GetSelectHandler.getSelectHandler(TextSearchResultType.Match)
  expect(handler).toBe(SelectIndexPreview.selectIndexPreview)
})

test('getSelectHandler - invalid type', () => {
  expect(() => GetSelectHandler.getSelectHandler(999)).toThrow('unexpected search result type 999')
})
