import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { openSearchEditor } from '../src/parts/OpenSearchEditor/OpenSearchEditor.ts'

const RE_SEARCH_EDITOR_URI_42 = /^search-editor:\/\/42-[\da-f-]+\/Search$/
const RE_SEARCH_EDITOR_URI_7 = /^search-editor:\/\/7-[\da-f-]+\/Search$/

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
  expect(mockRpc.invocations).toHaveLength(1)
  expect(mockRpc.invocations[0][0]).toBe('Main.openUri')
  expect(mockRpc.invocations[0][1]).toEqual({
    collapsedPaths: [],
    excludeValue: '',
    flags: expect.any(Number),
    focus: true,
    history: [],
    includeValue: '',
    listFocused: false,
    replacement: '',
    uri: expect.stringMatching(RE_SEARCH_EDITOR_URI_42),
    value: '',
  })
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

  const firstUri = mockRpc.invocations[0][1].uri
  const secondUri = mockRpc.invocations[1][1].uri
  expect(firstUri).not.toBe(secondUri)
  expect(firstUri).toMatch(RE_SEARCH_EDITOR_URI_7)
  expect(secondUri).toMatch(RE_SEARCH_EDITOR_URI_7)
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
