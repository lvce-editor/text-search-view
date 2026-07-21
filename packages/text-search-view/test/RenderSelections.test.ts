import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderSelections } from '../src/parts/RenderSelections/RenderSelections.ts'

test('renderSelections - returns empty array when states are the same', () => {
  const oldState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
  }

  const newState: SearchState = {
    ...oldState,
  }

  const result = renderSelections(oldState, newState)
  expect(result).toEqual([])
})

test('renderSelections - returns empty array when SearchValue selection changes', () => {
  const oldState: SearchState = {
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

  const newState: SearchState = {
    ...oldState,
    selections: {
      ...oldState.selections,
      SearchValue: {
        end: 10,
        start: 5,
      },
    },
  }

  const result = renderSelections(oldState, newState)
  expect(result).toEqual([])
})

test('renderSelections - returns empty array when ReplaceValue selection changes', () => {
  const oldState: SearchState = {
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

  const newState: SearchState = {
    ...oldState,
    selections: {
      ...oldState.selections,
      ReplaceValue: {
        end: 8,
        start: 2,
      },
    },
  }

  const result = renderSelections(oldState, newState)
  expect(result).toEqual([])
})

test('renderSelections - returns empty array when FilesToInclude selection changes', () => {
  const oldState: SearchState = {
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

  const newState: SearchState = {
    ...oldState,
    selections: {
      ...oldState.selections,
      FilesToInclude: {
        end: 5,
        start: 1,
      },
    },
  }

  const result = renderSelections(oldState, newState)
  expect(result).toEqual([])
})

test('renderSelections - returns empty array when FilesToExclude selection changes', () => {
  const oldState: SearchState = {
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

  const newState: SearchState = {
    ...oldState,
    selections: {
      ...oldState.selections,
      FilesToExclude: {
        end: 7,
        start: 3,
      },
    },
  }

  const result = renderSelections(oldState, newState)
  expect(result).toEqual([])
})

test('renderSelections - returns empty array when multiple selections change', () => {
  const oldState: SearchState = {
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

  const newState: SearchState = {
    ...oldState,
    selections: {
      FilesToExclude: {
        end: 10,
        start: 5,
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
        end: 3,
        start: 1,
      },
    },
  }

  const result = renderSelections(oldState, newState)
  expect(result).toEqual([])
})
