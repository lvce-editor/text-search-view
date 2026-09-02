import { expect, test } from '@jest/globals'
import { getSearchMessageHeight } from '../src/parts/GetSearchMessageHeight/GetSearchMessageHeight.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as TextMeasurementWorker from '../src/parts/TextMeasurementWorker/TextMeasurementWorker.ts'

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
