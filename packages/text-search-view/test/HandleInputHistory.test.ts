import { expect, test } from '@jest/globals'
import { RendererWorker, TextMeasurementWorker, TextSearchWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleInput } from '../src/parts/HandleInput/HandleInput.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

test('handleInput resets history navigation when the user edits the query', async () => {
  using _mockRendererWorker = RendererWorker.registerMockRpc({ 'GetActiveEditor.getOpenEditorUris': () => [] })
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({ 'TextSearch.search': () => ({ limitHit: false, results: [] }) })
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({ 'TextMeasurement.measureTextBlockHeight': () => 13 })
  const state = {
    ...CreateDefaultState.createDefaultState(),
    history: ['first', 'second'],
    historyIndex: 1,
    uid: 30,
    value: 'second',
  }
  SearchViewStates.set(state.uid, state, state)

  const result = await handleInput(state, 'edited', InputSource.User)

  expect(result).toMatchObject({
    historyIndex: -1,
    value: 'edited',
  })
})
