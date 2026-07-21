import { beforeEach, expect, test } from '@jest/globals'
import * as TextSearchWeb from '../src/parts/TextSearchWeb/TextSearchWeb.ts'
import { textSearch } from '../src/parts/TextSearchWeb/TextSearchWeb.ts'

beforeEach(() => {})

test.skip('textSearch', () => {
  expect(TextSearchWeb.textSearch('', '', 'val')).toEqual([
    [
      './index.txt',
      [
        {
          absoluteOffset: 0,
          preview: 'value',
        },
      ],
    ],
  ])
})

test('textSearch returns empty array for empty object', async () => {
  const result = await textSearch('web', '/root', 'test')
  expect(result).toEqual({
    limitHit: false,
    results: [],
  })
})

test('textSearch with different parameters', async () => {
  const result = await textSearch('web', '/different', 'query')
  expect(result).toEqual({
    limitHit: false,
    results: [],
  })
})
