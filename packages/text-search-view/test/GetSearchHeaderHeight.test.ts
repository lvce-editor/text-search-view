import { expect, test } from '@jest/globals'
import { getSearchHeaderHeight } from '../src/parts/GetSearchHeaderHeight/GetSearchHeaderHeight.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('adds message growth and warning height to the fixed header controls', () => {
  expect(getSearchHeaderHeight(SearchFlags.ReplaceExpanded, 65, 18)).toBe(146)
})
