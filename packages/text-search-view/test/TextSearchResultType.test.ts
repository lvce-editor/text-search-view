import { expect, test } from '@jest/globals'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('File', () => {
  expect(TextSearchResultType.File).toBe(1)
})

test('Match', () => {
  expect(TextSearchResultType.Match).toBe(2)
})

test('Context', () => {
  expect(TextSearchResultType.Context).toBe(3)
})
