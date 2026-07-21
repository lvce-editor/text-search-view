import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as TextSearchProviders from '../src/parts/TextSearchProviders/TextSearchProviders.ts'

test('loadContent with saved value calls handleUpdate', async () => {
  const state = CreateDefaultState.createDefaultState()
  const savedState = {
    excludeValue: 'exclude',
    flags: 1,
    includeValue: 'include',
    replacement: 'replacement',
    savedCollapsedPaths: [],
    threads: 4,
    value: 'test',
  }

  TextSearchProviders.add({
    async ''(): Promise<{ results: readonly SearchResult[]; limitHit: boolean }> {
      return {
        limitHit: false,
        results: [],
      }
    },
  })

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    excludeValue: 'exclude',
    flags: 1,
    includeValue: 'include',
    loaded: true,
    threads: 1,
    value: 'test',
  })
})

test('loadContent without saved value returns state with loaded flag', async () => {
  const state = CreateDefaultState.createDefaultState()
  const savedState = {
    excludeValue: '',
    flags: SearchFlags.UseIgnoreFiles | SearchFlags.ReplaceExpanded | SearchFlags.DetailsExpanded,
    includeValue: '',
    replacement: '',
    savedCollapsedPaths: [],
    threads: 4,
    value: '',
  }

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    flags: SearchFlags.UseIgnoreFiles | SearchFlags.ReplaceExpanded | SearchFlags.DetailsExpanded,
    headerHeight: 190,
    loaded: true,
    threads: 1,
  })
})

test('loadContent with null savedState', async () => {
  const state = CreateDefaultState.createDefaultState()
  const savedState = null

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    loaded: true,
  })
})

test('loadContent with undefined savedState', async () => {
  const state = CreateDefaultState.createDefaultState()
  const savedState = undefined

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    loaded: true,
  })
})
