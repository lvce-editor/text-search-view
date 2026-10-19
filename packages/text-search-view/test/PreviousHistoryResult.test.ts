import { expect, test } from '@jest/globals'
import { RendererWorker, TextMeasurementWorker, TextSearchWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import { previousHistoryResult } from '../src/parts/PreviousHistoryResult/PreviousHistoryResult.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

const createState = (history: readonly string[], historyIndex: number, value: string, uid = 0): SearchState => ({
  ...CreateDefaultState.createDefaultState(),
  history,
  historyIndex,
  uid,
  value,
})

test('previousHistoryResult does nothing with empty history', async () => {
  const state = createState([], -1, 'draft')
  expect(await previousHistoryResult(state)).toBe(state)
})

test('previousHistoryResult recalls the newest entry from a draft input', async () => {
  using _mockRendererWorker = RendererWorker.registerMockRpc({ 'GetActiveEditor.getOpenEditorUris': () => [] })
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({ 'TextSearch.search': () => ({ limitHit: false, results: [] }) })
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({ 'TextMeasurement.measureTextBlockHeight': () => 13 })
  const state = createState(['first', 'second'], -1, 'draft', 10)
  SearchViewStates.set(state.uid, state, state)
  expect(await previousHistoryResult(state)).toMatchObject({
    historyIndex: 1,
    inputSource: InputSource.Script,
    value: 'second',
  })
})

test('previousHistoryResult enters history without rerunning the current query', async () => {
  const state = createState(['first', 'second'], -1, 'second')
  expect(await previousHistoryResult(state)).toMatchObject({
    historyIndex: 1,
    inputSource: InputSource.Script,
    value: 'second',
  })
})

test('previousHistoryResult moves toward older entries', async () => {
  using _mockRendererWorker = RendererWorker.registerMockRpc({ 'GetActiveEditor.getOpenEditorUris': () => [] })
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({ 'TextSearch.search': () => ({ limitHit: false, results: [] }) })
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({ 'TextMeasurement.measureTextBlockHeight': () => 13 })
  const state = createState(['first', 'second'], 1, 'second', 11)
  SearchViewStates.set(state.uid, state, state)
  expect(await previousHistoryResult(state)).toMatchObject({
    historyIndex: 0,
    inputSource: InputSource.Script,
    value: 'first',
  })
})

test('previousHistoryResult stays at the oldest entry', async () => {
  const state = createState(['first', 'second'], 0, 'first')
  expect(await previousHistoryResult(state)).toBe(state)
})
