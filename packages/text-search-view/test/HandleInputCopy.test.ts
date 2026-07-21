import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleInputCopy } from '../src/parts/HandleInputCopy/HandleInputCopy.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('handleInputCopy - returns state unchanged when name is not a selection key', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test value',
  }

  const result = await handleInputCopy(state, 'InvalidName')

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('handleInputCopy - copies selected text from SearchValue', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    selections: {
      ...CreateDefaultState.createDefaultState().selections,
      SearchValue: {
        end: 5,
        start: 0,
      },
    },
    value: 'hello world',
  }

  const result = await handleInputCopy(state, InputName.SearchValue)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'hello']])
})

test('handleInputCopy - copies selected text from ReplaceValue', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    replacement: 'replace text',
    selections: {
      ...CreateDefaultState.createDefaultState().selections,
      ReplaceValue: {
        end: 7,
        start: 0,
      },
    },
  }

  const result = await handleInputCopy(state, InputName.ReplaceValue)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'replace']])
})

test('handleInputCopy - copies selected text from FilesToInclude', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    includeValue: '*.ts,*.js',
    selections: {
      ...CreateDefaultState.createDefaultState().selections,
      FilesToInclude: {
        end: 4,
        start: 0,
      },
    },
  }

  const result = await handleInputCopy(state, InputName.FilesToInclude)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', '*.ts']])
})

test('handleInputCopy - copies selected text from FilesToExclude', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    excludeValue: 'node_modules',
    selections: {
      ...CreateDefaultState.createDefaultState().selections,
      FilesToExclude: {
        end: 4,
        start: 0,
      },
    },
  }

  const result = await handleInputCopy(state, InputName.FilesToExclude)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'node']])
})

test('handleInputCopy - copies middle portion of text', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    selections: {
      ...CreateDefaultState.createDefaultState().selections,
      SearchValue: {
        end: 11,
        start: 6,
      },
    },
    value: 'hello world test',
  }

  const result = await handleInputCopy(state, InputName.SearchValue)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'world']])
})

test('handleInputCopy - copies empty string when selection range is empty', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    selections: {
      ...CreateDefaultState.createDefaultState().selections,
      SearchValue: {
        end: 2,
        start: 2,
      },
    },
    value: 'test',
  }

  const result = await handleInputCopy(state, InputName.SearchValue)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', '']])
})
