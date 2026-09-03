import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { openSearchEditor } from '../src/parts/OpenSearchEditor/OpenSearchEditor.ts'

test('openSearchEditor - opens a search editor in the main area', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })
  const state = {
    ...createDefaultState(),
    uid: 42,
  }

  const result = await openSearchEditor(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Main.openUri', { focus: true, uri: expect.stringMatching(/^search-editor:\/\/42-[\da-f-]+\/Search$/) }]])
})

test('openSearchEditor - opens a new editor on every invocation', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })
  const state = {
    ...createDefaultState(),
    uid: 7,
  }

  await openSearchEditor(state)
  await openSearchEditor(state)

  const firstOptions = mockRpc.invocations[0][1] as { readonly uri: string }
  const secondOptions = mockRpc.invocations[1][1] as { readonly uri: string }
  const firstUri = firstOptions.uri
  const secondUri = secondOptions.uri
  expect(firstUri).not.toBe(secondUri)
  expect(firstUri).toMatch(/^search-editor:\/\/7-[\da-f-]+\/Search$/)
  expect(secondUri).toMatch(/^search-editor:\/\/7-[\da-f-]+\/Search$/)
})

test('openSearchEditor - forwards renderer errors', async () => {
  RendererWorker.registerMockRpc({
    'Main.openUri': () => {
      throw new Error('Failed to open search editor')
    },
  })
  const state = {
    ...createDefaultState(),
    uid: 1,
  }

  await expect(openSearchEditor(state)).rejects.toThrow('Failed to open search editor')
})
