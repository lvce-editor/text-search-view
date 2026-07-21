import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleInputPaste from '../src/parts/HandleInputPaste/HandleInputPaste.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('handleInputPaste - returns state unchanged when name is not a valid selection key', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test',
  }

  const result = await HandleInputPaste.handleInputPaste(state, 'InvalidName')

  expect(result).toBe(state)
})

test('handleInputPaste - pastes text into SearchValue at cursor position', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readText': () => 'pasted',
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    selections: {
      FilesToExclude: {
        end: 0,
        start: 0,
      },
      FilesToInclude: {
        end: 0,
        start: 0,
      },
      ReplaceValue: {
        end: 0,
        start: 0,
      },
      SearchValue: {
        end: 5,
        start: 5,
      },
    },
    value: 'hello world',
  }

  const result = await HandleInputPaste.handleInputPaste(state, InputName.SearchValue)

  expect(result.value).toBe('hellopasted world')
  expect(result.selections.SearchValue.start).toBe(17)
  expect(result.selections.SearchValue.end).toBe(17)
  expect(mockRpc.invocations).toEqual([['ClipBoard.readText']])
})

test('handleInputPaste - replaces selected text in SearchValue', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readText': () => 'new',
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    selections: {
      FilesToExclude: {
        end: 0,
        start: 0,
      },
      FilesToInclude: {
        end: 0,
        start: 0,
      },
      ReplaceValue: {
        end: 0,
        start: 0,
      },
      SearchValue: {
        end: 5,
        start: 0,
      },
    },
    value: 'hello world',
  }

  const result = await HandleInputPaste.handleInputPaste(state, InputName.SearchValue)

  expect(result.value).toBe('new world')
  expect(result.selections.SearchValue.start).toBe(9)
  expect(result.selections.SearchValue.end).toBe(9)
  expect(mockRpc.invocations).toEqual([['ClipBoard.readText']])
})

test('handleInputPaste - pastes text into ReplaceValue', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readText': () => 'replacement',
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    replacement: 'old',
    selections: {
      FilesToExclude: {
        end: 0,
        start: 0,
      },
      FilesToInclude: {
        end: 0,
        start: 0,
      },
      ReplaceValue: {
        end: 3,
        start: 3,
      },
      SearchValue: {
        end: 0,
        start: 0,
      },
    },
  }

  const result = await HandleInputPaste.handleInputPaste(state, InputName.ReplaceValue)

  expect(result.replacement).toBe('oldreplacement')
  expect(result.selections.ReplaceValue.start).toBe(14)
  expect(result.selections.ReplaceValue.end).toBe(14)
  expect(mockRpc.invocations).toEqual([['ClipBoard.readText']])
})

test('handleInputPaste - pastes text into FilesToInclude', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readText': () => '*.ts',
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    includeValue: '*.js',
    selections: {
      FilesToExclude: {
        end: 0,
        start: 0,
      },
      FilesToInclude: {
        end: 4,
        start: 4,
      },
      ReplaceValue: {
        end: 0,
        start: 0,
      },
      SearchValue: {
        end: 0,
        start: 0,
      },
    },
  }

  const result = await HandleInputPaste.handleInputPaste(state, InputName.FilesToInclude)

  expect(result.includeValue).toBe('*.js*.ts')
  expect(result.selections.FilesToInclude.start).toBe(8)
  expect(result.selections.FilesToInclude.end).toBe(8)
  expect(mockRpc.invocations).toEqual([['ClipBoard.readText']])
})

test('handleInputPaste - pastes text into FilesToExclude', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readText': () => 'node_modules',
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    excludeValue: 'dist/',
    selections: {
      FilesToExclude: {
        end: 5,
        start: 0,
      },
      FilesToInclude: {
        end: 0,
        start: 0,
      },
      ReplaceValue: {
        end: 0,
        start: 0,
      },
      SearchValue: {
        end: 0,
        start: 0,
      },
    },
  }

  const result = await HandleInputPaste.handleInputPaste(state, InputName.FilesToExclude)

  expect(result.excludeValue).toBe('node_modules')
  expect(result.selections.FilesToExclude.start).toBe(12)
  expect(result.selections.FilesToExclude.end).toBe(12)
  expect(mockRpc.invocations).toEqual([['ClipBoard.readText']])
})

test('handleInputPaste - handles empty clipboard text', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.readText': () => '',
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    selections: {
      FilesToExclude: {
        end: 0,
        start: 0,
      },
      FilesToInclude: {
        end: 0,
        start: 0,
      },
      ReplaceValue: {
        end: 0,
        start: 0,
      },
      SearchValue: {
        end: 4,
        start: 2,
      },
    },
    value: 'test',
  }

  const result = await HandleInputPaste.handleInputPaste(state, InputName.SearchValue)

  expect(result.value).toBe('te')
  expect(result.selections.SearchValue.start).toBe(2)
  expect(result.selections.SearchValue.end).toBe(2)
  expect(mockRpc.invocations).toEqual([['ClipBoard.readText']])
})
