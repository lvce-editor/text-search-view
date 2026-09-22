import { expect, test } from '@jest/globals'
import { TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { getSearchMessageHeight } from '../src/parts/GetSearchMessageHeight/GetSearchMessageHeight.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('returns the minimum height for an empty message', async () => {
  expect(await getSearchMessageHeight('', 200, 0)).toBe(30)
})

test('measures a collapsed message using the available text width', async () => {
  using mockRpc = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 52,
  })

  expect(await getSearchMessageHeight('long replacement message', 200, 0)).toBe(65)
  expect(mockRpc.invocations).toEqual([['TextMeasurement.measureTextBlockHeight', 'long replacement message', 'system-ui', 13, 13, 148]])
})

test('accounts for the expanded details padding', async () => {
  using mockRpc = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 13,
  })

  expect(await getSearchMessageHeight('message', 200, SearchFlags.DetailsExpanded)).toBe(30)
  expect(mockRpc.invocations).toEqual([['TextMeasurement.measureTextBlockHeight', 'message', 'system-ui', 13, 13, 170]])
})

test('measures the open in editor link when it is rendered', async () => {
  using mockRpc = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': (message: string) => (message.includes('Open in editor') ? 26 : 13),
  })

  expect(await getSearchMessageHeight('645 results in 56 files', 200, 0, true)).toBe(39)
  expect(mockRpc.invocations).toEqual([
    ['TextMeasurement.measureTextBlockHeight', '645 results in 56 files - Open in editor', 'system-ui', 13, 13, 148],
  ])
})
