import { expect, test } from '@jest/globals'
import { TextMeasurementWorker, TextSearchWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { toggleContextLines } from '../src/parts/ToggleContextLines/ToggleContextLines.ts'

test('toggleContextLines', async () => {
  const state = CreateDefaultState.createDefaultState()
  const newState = await toggleContextLines(state)
  expect(newState.contextLinesEnabled).toBe(true)
})

test('toggleContextLines - reruns the search with context enabled', async () => {
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 13,
  })
  let receivedOptions: any
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'(_root: string, _query: string, options: any) {
      receivedOptions = options
      return { limitHit: false, results: [] }
    },
  })
  const state = {
    ...CreateDefaultState.createDefaultState(),
    contextLines: 2,
    uid: 202,
    value: 'needle',
    workspaceUri: 'file:///test',
  }

  await toggleContextLines(state)

  expect(receivedOptions.contextLines).toBe(2)
})
