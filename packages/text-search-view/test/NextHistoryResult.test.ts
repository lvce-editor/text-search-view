import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import { nextHistoryResult } from '../src/parts/NextHistoryResult/NextHistoryResult.ts'

const createState = (history: readonly string[], historyIndex: number, value: string): SearchState => ({
  ...CreateDefaultState.createDefaultState(),
  history,
  historyIndex,
  value,
})

test('nextHistoryResult does nothing while the current input is not browsing history', async () => {
  const state = createState(['first', 'second'], -1, 'draft')
  expect(await nextHistoryResult(state)).toBe(state)
})

test('nextHistoryResult does nothing with empty history', async () => {
  const state = createState([], -1, 'draft')
  expect(await nextHistoryResult(state)).toBe(state)
})

test('nextHistoryResult moves toward newer history entries', async () => {
  const state = createState(['first', 'second'], 0, 'first')
  expect(await nextHistoryResult(state)).toMatchObject({
    historyIndex: 1,
    inputSource: InputSource.Script,
    value: 'second',
  })
})

test('nextHistoryResult returns to an empty input after the newest entry', async () => {
  const state = createState(['first', 'second'], 1, 'second')
  expect(await nextHistoryResult(state)).toMatchObject({
    historyIndex: -1,
    inputSource: InputSource.Script,
    value: '',
  })
})

test('nextHistoryResult stays at the blank input when already at the newest boundary', async () => {
  const state = createState(['first', 'second'], -1, '')
  expect(await nextHistoryResult(state)).toBe(state)
})
