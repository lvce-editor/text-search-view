import { expect, test } from '@jest/globals'
import { TextMeasurementWorker, TextSearchWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleContextLinesInput } from '../src/parts/HandleContextLinesInput/HandleContextLinesInput.ts'

test('handleContextLinesInput - updates context lines', async () => {
  const state = CreateDefaultState.createDefaultState()
  const newState = await handleContextLinesInput(state, '3')
  expect(newState.contextLines).toBe(3)
})

test('handleContextLinesInput - clamps negative values', async () => {
  const state = CreateDefaultState.createDefaultState()
  const newState = await handleContextLinesInput(state, '-1')
  expect(newState.contextLines).toBe(0)
})

test('handleContextLinesInput - treats an empty value as zero', async () => {
  const state = CreateDefaultState.createDefaultState()
  const newState = await handleContextLinesInput(state, '')
  expect(newState.contextLines).toBe(0)
})

test('handleContextLinesInput - ignores invalid values', async () => {
  const state = CreateDefaultState.createDefaultState()
  const newState = await handleContextLinesInput(state, 'invalid')
  expect(newState).toBe(state)
})

test('handleContextLinesInput - reruns the search with the new value', async () => {
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
    contextLinesEnabled: true,
    uid: 201,
    value: 'needle',
    workspaceUri: 'file:///test',
  }

  await handleContextLinesInput(state, '2')

  expect(receivedOptions.contextLines).toBe(2)
})
