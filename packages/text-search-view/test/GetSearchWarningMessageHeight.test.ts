import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getSearchWarningMessageHeight } from '../src/parts/GetSearchWarningMessageHeight/GetSearchWarningMessageHeight.ts'

test('returns zero for an empty warning', async () => {
  expect(await getSearchWarningMessageHeight('', 200, 'custom-font', 14, 20, 12, 9)).toBe(0)
})

test('uses the provided font and padding values', async () => {
  using mockRendererWorker = RendererWorker.registerMockRpc({
    'MeasureTextHeight.measureTextBlockHeight': () => 40,
  })

  expect(await getSearchWarningMessageHeight('warning', 200, 'custom-font', 14, 20, 12, 9)).toBe(49)
  expect(mockRendererWorker.invocations).toEqual([['MeasureTextHeight.measureTextBlockHeight', 'warning', 'custom-font', 14, '20px', 188]])
})

test('uses a minimum available width of one', async () => {
  using mockRendererWorker = RendererWorker.registerMockRpc({
    'MeasureTextHeight.measureTextBlockHeight': () => 20,
  })

  expect(await getSearchWarningMessageHeight('warning', 5, 'custom-font', 14, 20, 12, 9)).toBe(29)
  expect(mockRendererWorker.invocations).toEqual([['MeasureTextHeight.measureTextBlockHeight', 'warning', 'custom-font', 14, '20px', 1]])
})
