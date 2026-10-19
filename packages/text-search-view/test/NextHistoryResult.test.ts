import { expect, test } from '@jest/globals'
import { RendererWorker, TextMeasurementWorker, TextSearchWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import { nextHistoryResult } from '../src/parts/NextHistoryResult/NextHistoryResult.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

const createState = (history: readonly string[], historyIndex: number, value: string, uid = 0): SearchState => ({
  ...CreateDefaultState.createDefaultState(),
  history,
  historyIndex,
  uid,
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
  using _mockRendererWorker = RendererWorker.registerMockRpc({ 'GetActiveEditor.getOpenEditorUris': () => [] })
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({ 'TextSearch.search': () => ({ limitHit: false, results: [] }) })
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({ 'TextMeasurement.measureTextBlockHeight': () => 13 })
  const state = createState(['first', 'second'], 0, 'first', 20)
  SearchViewStates.set(state.uid, state, state)
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
