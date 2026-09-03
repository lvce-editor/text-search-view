import { expect, test } from '@jest/globals'
import { readFile } from 'node:fs/promises'

test('search.exclude has an array default', async () => {
  const content = await readFile(new URL('../settings.json', import.meta.url), 'utf8')
  const settings = JSON.parse(content)
  const searchExclude = settings.find((setting: { readonly id?: string }) => setting.id === 'search.exclude')

  expect(searchExclude).toEqual(
    expect.objectContaining({
      type: 'array',
      value: [],
    }),
  )
})
