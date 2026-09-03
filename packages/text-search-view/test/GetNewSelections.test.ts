import { expect, test } from '@jest/globals'
import type { SelectionState } from '../src/parts/SelectionState/SelectionState.ts'
import * as GetNewSelections from '../src/parts/GetNewSelections/GetNewSelections.ts'

const selections: SelectionState = {
  FilesToExclude: {
    end: 2,
    start: 1,
  },
  FilesToInclude: {
    end: 4,
    start: 3,
  },
  ReplaceValue: {
    end: 6,
    start: 5,
  },
  SearchValue: {
    end: 8,
    start: 7,
  },
}

test('getNewSelections moves the named selection to the end of the new value', () => {
  const result = GetNewSelections.getNewSelections(selections, 'SearchValue', 'new value')

  expect(result).toEqual({
    ...selections,
    SearchValue: {
      end: 9,
      start: 9,
    },
  })
  expect(result.FilesToExclude).toBe(selections.FilesToExclude)
})

test('getNewSelections returns the existing selections when the cursor is already at the end', () => {
  const selectionsAtEnd: SelectionState = {
    ...selections,
    SearchValue: {
      end: 8,
      start: 8,
    },
  }
  const result = GetNewSelections.getNewSelections(selectionsAtEnd, 'SearchValue', '12345678')

  expect(result).toBe(selectionsAtEnd)
})

test('getNewSelections returns the existing selections for an unknown input name', () => {
  const result = GetNewSelections.getNewSelections(selections, 'UnknownInput', 'new value')

  expect(result).toBe(selections)
})
