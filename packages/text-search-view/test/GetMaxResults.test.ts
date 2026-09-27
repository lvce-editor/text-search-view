import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { defaultMaxResults, getMaxResults } from '../src/parts/GetMaxResults/GetMaxResults.ts'

test('getMaxResults returns configured positive safe integers', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => 25_000,
  })

  await expect(getMaxResults()).resolves.toBe(25_000)
})

test.each([undefined, null, '100', 0, -1, 1.5, Number.MAX_SAFE_INTEGER + 1])(
  'getMaxResults uses the default for invalid values: %s',
  async (value) => {
    using _mockRpc = RendererWorker.registerMockRpc({
      'Preferences.get': () => value,
    })

    await expect(getMaxResults()).resolves.toBe(defaultMaxResults)
  },
)

test('getMaxResults uses the default when preferences cannot be read', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => {
      throw new Error('preference unavailable')
    },
  })

  await expect(getMaxResults()).resolves.toBe(defaultMaxResults)
})
