import { expect, test } from '@jest/globals'
import { RendererWorker, TextMeasurementWorker, TextSearchWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'
import { submit } from '../src/parts/Submit/Submit.ts'

test('submit appends the query to history and resets history navigation', async () => {
  using _mockRendererWorker = RendererWorker.registerMockRpc({ 'GetActiveEditor.getOpenEditorUris': () => [] })
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({ 'TextSearch.search': () => ({ limitHit: false, results: [] }) })
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({ 'TextMeasurement.measureTextBlockHeight': () => 13 })
  const state = {
    ...CreateDefaultState.createDefaultState(),
    history: ['first'],
    historyIndex: 0,
    uid: 40,
    value: 'second',
  }
  SearchViewStates.set(state.uid, state, state)

  const result = await submit(state)

  expect(result).toMatchObject({
    history: ['first', 'second'],
    historyIndex: -1,
    value: 'second',
  })
})
