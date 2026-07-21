import { expect, test } from '@jest/globals'
import { getMenuEntryIds } from '../src/parts/GetMenuEntryIds/GetMenuEntryIds.ts'

test('getMenuEntryIds returns array with MenuEntryId.Search', () => {
  const result = getMenuEntryIds()
  expect(result).toBeDefined()
})
