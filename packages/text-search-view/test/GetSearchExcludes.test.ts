import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetSearchExcludes from '../src/parts/GetSearchExcludes/GetSearchExcludes.ts'

test('getSearchExcludes - returns enabled search exclude patterns', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => ({
      '**/*.tmp': false,
      '**/excluded': true,
      '**/result.txt': true,
    }),
  })

  await expect(GetSearchExcludes.getSearchExcludes()).resolves.toEqual(['**/excluded', '**/result.txt'])
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'search.exclude']])
})

test('getSearchExcludes - returns no patterns for invalid values', async () => {
  const values = [undefined, null, '', [], true]
  for (const value of values) {
    using mockRpc = RendererWorker.registerMockRpc({
      'Preferences.get': () => value,
    })

    await expect(GetSearchExcludes.getSearchExcludes()).resolves.toEqual([])
    expect(mockRpc.invocations).toEqual([['Preferences.get', 'search.exclude']])
  }
})

test('getSearchExcludes - returns fallback when preferences are unavailable', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})

  await expect(GetSearchExcludes.getSearchExcludes(['.git', 'node_modules'])).resolves.toEqual(['.git', 'node_modules'])
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'search.exclude']])
})
