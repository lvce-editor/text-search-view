import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as LaunchIconThemeWorker from '../src/parts/LaunchIconThemeWorker/LaunchIconThemeWorker.ts'

test('launchIconThemeWorker - connects lazily', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToIconThemeWorker': () => undefined,
  })

  const rpc = await LaunchIconThemeWorker.launchIconThemeWorker()

  expect(mockRpc.invocations).toEqual([])
  await Promise.resolve(rpc.send('IconTheme.test'))
  const expectedArray = ['SendMessagePortToExtensionHostWorker.sendMessagePortToIconThemeWorker', expect.anything(), 'IconTheme.handleMessagePort', 0]
  expect(mockRpc.invocations).toEqual([expectedArray])
  await rpc.dispose()
})

test('launchIconThemeWorker - handles port transfer error on first use', async () => {
  const mockError = new Error('Failed to transfer port')
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToIconThemeWorker': () => {
      throw mockError
    },
  })

  const rpc = await LaunchIconThemeWorker.launchIconThemeWorker()

  await expect(Promise.resolve(rpc.send('IconTheme.test'))).rejects.toThrow('Failed to transfer port')
  const expectedArray = ['SendMessagePortToExtensionHostWorker.sendMessagePortToIconThemeWorker', expect.anything(), 'IconTheme.handleMessagePort', 0]
  expect(mockRpc.invocations).toEqual([expectedArray])
})
