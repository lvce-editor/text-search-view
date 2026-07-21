import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getCurrentValue } from '../src/parts/GetCurrentValue/GetCurrentValue.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('getCurrentValue returns state.value for SearchValue', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test-search-value',
  }
  const result = getCurrentValue(state, InputName.SearchValue)
  expect(result).toBe('test-search-value')
})

test('getCurrentValue returns state.excludeValue for FilesToExclude', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    excludeValue: 'node_modules',
  }
  const result = getCurrentValue(state, InputName.FilesToExclude)
  expect(result).toBe('node_modules')
})

test('getCurrentValue returns state.includeValue for FilesToInclude', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    includeValue: '*.ts',
  }
  const result = getCurrentValue(state, InputName.FilesToInclude)
  expect(result).toBe('*.ts')
})

test('getCurrentValue returns state.replacement for ReplaceValue', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    replacement: 'replacement-value',
  }
  const result = getCurrentValue(state, InputName.ReplaceValue)
  expect(result).toBe('replacement-value')
})

test('getCurrentValue returns empty string for unknown input name', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
  }
  const result = getCurrentValue(state, 'UnknownInputName')
  expect(result).toBe('')
})
