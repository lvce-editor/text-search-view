import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as RenderValue from '../src/parts/RenderValue/RenderValue.ts'

test('renderValue - returns correct command structure', () => {
  const oldState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: '',
  }

  const newState: SearchState = {
    ...oldState,
    uid: 1,
    value: 'test search',
  }

  const result = RenderValue.renderValue(oldState, newState)
  expect(result).toEqual([ViewletCommand.SetValueByName, 1, InputName.SearchValue, 'test search'])
})

test('renderReplacement - returns correct command structure', () => {
  const oldState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    replacement: '',
  }

  const newState: SearchState = {
    ...oldState,
    replacement: 'test replacement',
    uid: 1,
  }

  const result = RenderValue.renderReplacement(oldState, newState)
  expect(result).toEqual([ViewletCommand.SetValueByName, 1, InputName.ReplaceValue, 'test replacement'])
})

test('renderIncludeValue - returns correct command structure', () => {
  const oldState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    includeValue: '',
  }

  const newState: SearchState = {
    ...oldState,
    includeValue: '*.ts',
    uid: 1,
  }

  const result = RenderValue.renderIncludeValue(oldState, newState)
  expect(result).toEqual([ViewletCommand.SetValueByName, 1, InputName.FilesToInclude, '*.ts'])
})

test('renderExcludeValue - returns correct command structure', () => {
  const oldState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    excludeValue: '',
  }

  const newState: SearchState = {
    ...oldState,
    excludeValue: 'node_modules',
    uid: 1,
  }

  const result = RenderValue.renderExcludeValue(oldState, newState)
  expect(result).toEqual([ViewletCommand.SetValueByName, 1, InputName.FilesToExclude, 'node_modules'])
})
