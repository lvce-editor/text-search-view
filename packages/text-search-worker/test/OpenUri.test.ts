import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as OpenUri from '../src/parts/OpenUri/OpenUri.ts'

test('openUri - without options', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })

  await OpenUri.openUri('/test/file.txt')
  expect(mockRpc.invocations).toEqual([['Main.openUri', '/test/file.txt', true, {}]])
})

test('openUri - with preview', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })

  await OpenUri.openUri('/test/file.txt', true)
  expect(mockRpc.invocations).toEqual([['Main.openUri', '/test/file.txt', true, {}]])
})

test('openUri - with options', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })

  const options = {
    selections: new Uint32Array([1, 0, 1, 0]),
  }
  await OpenUri.openUri('/test/file.txt', false, options)
  expect(mockRpc.invocations).toEqual([['Main.openUri', '/test/file.txt', false, options]])
})

test('openUri - error', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => {
      throw new Error('Failed to open file')
    },
  })

  await expect(OpenUri.openUri('/test/file.txt')).rejects.toThrow('Failed to open file')
  expect(mockRpc.invocations).toEqual([['Main.openUri', '/test/file.txt', true, {}]])
})
