import { expect, test } from '@jest/globals'
import * as GetTopHeight from '../src/parts/GetTopHeight/GetTopHeight.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('getTopHeight - no flags', () => {
  expect(GetTopHeight.getTopHeight(0)).toBe(61)
})

test('getTopHeight - replace expanded', () => {
  expect(GetTopHeight.getTopHeight(SearchFlags.ReplaceExpanded)).toBe(93)
})

test('getTopHeight - details expanded', () => {
  expect(GetTopHeight.getTopHeight(SearchFlags.DetailsExpanded)).toBe(158)
})

test('getTopHeight - both replace and details expanded', () => {
  expect(GetTopHeight.getTopHeight(SearchFlags.ReplaceExpanded | SearchFlags.DetailsExpanded)).toBe(190)
})
