import { expect, test } from '@jest/globals'
import * as GetSearchResultClassName from '../src/parts/GetSearchResultClassName/GetSearchResultClassName.ts'

test('getSearchResultClassName - not focused', () => {
  expect(GetSearchResultClassName.getSearchResultClassName(false)).toBe('TreeItem')
})

test('getSearchResultClassName - focused', () => {
  expect(GetSearchResultClassName.getSearchResultClassName(true)).toBe('TreeItem TreeItemActive')
})
