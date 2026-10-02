import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { loadPreferences } from '../src/parts/LoadPreferences/LoadPreferences.ts'

test('loads preferences in parallel', async () => {
  const { promise: pullBasedSearchRequested, resolve: notifyPullBasedSearchRequested } = Promise.withResolvers<void>()
  using mockRpc = RendererWorker.registerMockRpc({
    async 'Preferences.get'(key: string) {
      if (key === 'search.exclude') {
        await pullBasedSearchRequested
        return {
          '**/*.tmp': false,
          '**/excluded': true,
        }
      }
      if (key === 'textSearch.maxResults') {
        return 15_000
      }
      notifyPullBasedSearchRequested()
      return true
    },
  })

  const result = await loadPreferences([])

  expect(mockRpc.invocations).toHaveLength(4)
  expect(result).toEqual({
    defaultExcludes: ['**/excluded'],
    maxResults: 15_000,
    showOpenInEditorLink: true,
    usePullBasedSearch: true,
  })
  expect(mockRpc.invocations).toEqual([
    ['Preferences.get', 'search.exclude'],
    ['Preferences.get', 'textSearch.maxResults'],
    ['Preferences.get', 'Search.showOpenInEditorLink'],
    ['Preferences.get', 'Search.usePullBasedSearch'],
  ])
})
