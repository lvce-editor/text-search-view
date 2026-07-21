import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleInputSelectionChange } from '../src/parts/HandleInputSelectionChange/HandleInputSelectionChange.ts'

test('handleInputSelectionChange returns state unchanged when selection name does not exist', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
  }

  const result = await handleInputSelectionChange(state, 'NonExistent', 5, 10)

  expect(result).toBe(state)
})

test('handleInputSelectionChange returns state unchanged when selection values are the same', async () => {
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
        end: 10,
        start: 5,
      },
    },
  }

  const result = await handleInputSelectionChange(state, 'SearchValue', 5, 10)

  expect(result).toBe(state)
})

test('handleInputSelectionChange updates SearchValue selection', async () => {
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
        end: 0,
        start: 0,
      },
    },
  }

  const result = await handleInputSelectionChange(state, 'SearchValue', 5, 10)

  expect(result).not.toBe(state)
  expect(result.selections.SearchValue).toEqual({
    end: 10,
    start: 5,
  })
  expect(result.selections.ReplaceValue).toBe(state.selections.ReplaceValue)
  expect(result.selections.FilesToInclude).toBe(state.selections.FilesToInclude)
  expect(result.selections.FilesToExclude).toBe(state.selections.FilesToExclude)
})

test('handleInputSelectionChange updates ReplaceValue selection', async () => {
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
        end: 4,
        start: 2,
      },
      SearchValue: {
        end: 0,
        start: 0,
      },
    },
  }

  const result = await handleInputSelectionChange(state, 'ReplaceValue', 7, 12)

  expect(result).not.toBe(state)
  expect(result.selections.ReplaceValue).toEqual({
    end: 12,
    start: 7,
  })
  expect(result.selections.SearchValue).toBe(state.selections.SearchValue)
  expect(result.selections.FilesToInclude).toBe(state.selections.FilesToInclude)
  expect(result.selections.FilesToExclude).toBe(state.selections.FilesToExclude)
})

test('handleInputSelectionChange updates FilesToInclude selection', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    selections: {
      FilesToExclude: {
        end: 0,
        start: 0,
      },
      FilesToInclude: {
        end: 3,
        start: 1,
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

  const result = await handleInputSelectionChange(state, 'FilesToInclude', 8, 15)

  expect(result).not.toBe(state)
  expect(result.selections.FilesToInclude).toEqual({
    end: 15,
    start: 8,
  })
  expect(result.selections.SearchValue).toBe(state.selections.SearchValue)
  expect(result.selections.ReplaceValue).toBe(state.selections.ReplaceValue)
  expect(result.selections.FilesToExclude).toBe(state.selections.FilesToExclude)
})

test('handleInputSelectionChange updates FilesToExclude selection', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    selections: {
      FilesToExclude: {
        end: 6,
        start: 3,
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

  const result = await handleInputSelectionChange(state, 'FilesToExclude', 20, 25)

  expect(result).not.toBe(state)
  expect(result.selections.FilesToExclude).toEqual({
    end: 25,
    start: 20,
  })
  expect(result.selections.SearchValue).toBe(state.selections.SearchValue)
  expect(result.selections.ReplaceValue).toBe(state.selections.ReplaceValue)
  expect(result.selections.FilesToInclude).toBe(state.selections.FilesToInclude)
})

test('handleInputSelectionChange preserves other state properties', async () => {
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
        end: 0,
        start: 0,
      },
    },
    uid: 42,
    value: 'test-value',
  }

  const result = await handleInputSelectionChange(state, 'SearchValue', 1, 2)

  expect(result.value).toBe(state.value)
  expect(result.uid).toBe(state.uid)
  expect(result.selections.SearchValue).not.toBe(state.selections.SearchValue)
})
