import { expect, test } from '@jest/globals'
import { RendererWorker, TextSearchWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

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

  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'() {
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

test('loadContent loads enabled search exclude settings', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => ({
      '**/*.tmp': false,
      '**/excluded': true,
    }),
  })
  const state = CreateDefaultState.createDefaultState()

  const result = await loadContent(state, undefined)

  expect(result.defaultExcludes).toEqual(['**/excluded'])
  expect(mockRpc.invocations).toEqual([
    ['Preferences.get', 'search.exclude'],
    ['Preferences.get', 'Search.usePullBasedSearch'],
  ])
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
