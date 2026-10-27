import { expect, test } from '@jest/globals'
import { TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getSearchMessageLayout } from '../src/parts/GetSearchMessageLayout/GetSearchMessageLayout.ts'

test('passes search message measurement properties from state', async () => {
  using mockRpc = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 40,
  })
  const state = {
    ...createDefaultState(),
    headerHeight: 100,
    messageHeight: 30,
    searchMessageCollapsedHorizontalSpace: 80,
    searchMessageExpandedHorizontalSpace: 60,
    searchMessageFontFamily: 'monospace',
    searchMessageFontSize: 18,
    searchMessageLineHeight: 20,
    width: 200,
  }

  expect(await getSearchMessageLayout(state, 'message')).toEqual({
    headerHeight: 123,
    messageHeight: 53,
  })
  expect(mockRpc.invocations).toEqual([['TextMeasurement.measureTextBlockHeight', 'message', 'monospace', 18, 20, 120]])
})
