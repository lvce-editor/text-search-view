import { expect, test } from '@jest/globals'
import * as GetHeaderHeightForFlags from '../src/parts/GetHeaderHeightForFlags/GetHeaderHeightForFlags.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('getHeaderHeightForFlags preserves warning height when expanding replace', () => {
  const currentHeaderHeight = 85
  const oldFlags = 0
  const newFlags = SearchFlags.ReplaceExpanded

  const result = GetHeaderHeightForFlags.getHeaderHeightForFlags(currentHeaderHeight, oldFlags, newFlags)

  expect(result).toBe(117)
})

test('getHeaderHeightForFlags preserves warning height when collapsing details', () => {
  const currentHeaderHeight = 184
  const oldFlags = SearchFlags.DetailsExpanded
  const newFlags = 0

  const result = GetHeaderHeightForFlags.getHeaderHeightForFlags(currentHeaderHeight, oldFlags, newFlags)

  expect(result).toBe(87)
})
