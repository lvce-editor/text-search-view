import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import { nextHistoryResult } from '../src/parts/NextHistoryResult/NextHistoryResult.ts'

test('nextHistoryResult - returns state unchanged when newValue equals current value', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    history: ['test1', 'test2', 'test3'],
    historyIndex: 0,
    value: 'test1',
  }

  const result = await nextHistoryResult(state)

  expect(result).toBe(state)
})

test('nextHistoryResult - with empty history and empty value returns state unchanged', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    history: [],
    historyIndex: 0,
    value: '',
  }

  const result = await nextHistoryResult(state)

  expect(result).toBe(state)
})

test('nextHistoryResult - with historyIndex -1 and empty value returns state unchanged', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    history: ['test1', 'test2', 'test3'],
    historyIndex: -1,
    value: '',
  }

  const result = await nextHistoryResult(state)

  expect(result).toBe(state)
})

test('nextHistoryResult - calls handleUpdate when newValue differs from current value', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    history: ['test1', 'test2', 'test3'],
    historyIndex: 0,
    value: 'current',
  }

  const result = await nextHistoryResult(state)

  expect(result).toMatchObject({
    historyIndex: 1,
    inputSource: InputSource.Script,
    value: 'test1',
  })
})

test('nextHistoryResult - with empty history calls handleUpdate with empty value', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    history: [],
    historyIndex: 0,
    value: 'current',
  }

  const result = await nextHistoryResult(state)

  expect(result).toMatchObject({
    historyIndex: -1,
    inputSource: InputSource.Script,
    loaded: true,
    value: '',
  })
})

test('nextHistoryResult - with historyIndex -1 calls handleUpdate with empty value', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    history: ['test1', 'test2', 'test3'],
    historyIndex: -1,
    value: 'current',
  }

  const result = await nextHistoryResult(state)

  expect(result).toMatchObject({
    historyIndex: -1,
    inputSource: InputSource.Script,
    loaded: true,
    value: '',
  })
})

test('nextHistoryResult - with historyIndex at end of history', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    history: ['test1', 'test2'],
    historyIndex: 1,
    value: 'current',
  }

  const result = await nextHistoryResult(state)

  expect(result).toMatchObject({
    historyIndex: 2,
    inputSource: InputSource.Script,
    value: 'test2',
  })
})

test('nextHistoryResult - with historyIndex beyond history length calls handleUpdate with empty value', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    history: ['test1', 'test2'],
    historyIndex: 5,
    value: 'current',
  }

  const result = await nextHistoryResult(state)

  expect(result).toMatchObject({
    historyIndex: 6,
    inputSource: InputSource.Script,
    loaded: true,
    value: '',
  })
})

test('nextHistoryResult - updates historyIndex correctly', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    history: ['test1', 'test2', 'test3'],
    historyIndex: 1,
    value: 'different',
  }

  const result = await nextHistoryResult(state)

  expect(result).toMatchObject({
    historyIndex: 2,
    inputSource: InputSource.Script,
    value: 'test2',
  })
})
