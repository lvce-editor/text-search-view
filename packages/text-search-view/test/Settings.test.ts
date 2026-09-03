import { expect, test } from '@jest/globals'
import { readFile } from 'node:fs/promises'

interface Setting {
  readonly id?: string
}

const loadSettings = async (): Promise<readonly Setting[]> => {
  const content = await readFile(new URL('../settings.json', import.meta.url), 'utf8')
  return JSON.parse(content) as readonly Setting[]
}

test('contains all text search settings', async () => {
  const settings = await loadSettings()

  expect(settings.map((setting) => setting.id)).toEqual(['search.exclude', 'search.threads', 'Search.usePullBasedSearch'])
})

test('search.exclude has an array default', async () => {
  const settings = await loadSettings()
  const searchExclude = settings.find((setting) => setting.id === 'search.exclude')

  expect(searchExclude).toEqual(
    expect.objectContaining({
      type: 'array',
      value: [],
    }),
  )
})
