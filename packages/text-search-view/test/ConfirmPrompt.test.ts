import { expect, test } from '@jest/globals'
import { DialogWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { prompt } from '../src/parts/ConfirmPrompt/ConfirmPrompt.ts'

const options = {
  confirmMessage: 'Replace',
  title: 'Replace All',
}

test('prompt - uses dialog worker', async () => {
  using mockDialogRpc = DialogWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => true,
  })

  await expect(prompt('Replace all?', options)).resolves.toBe(true)
  expect(mockDialogRpc.invocations).toEqual([['ConfirmPrompt.prompt', 'Replace all?', options]])
})

test('prompt - falls back when dialog worker relay is unavailable', async () => {
  using mockDialogRpc = DialogWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => {
      throw new Error('Command "SendMessagePortToExtensionHostWorker.sendMessagePortToDialogWorker" not found (renderer worker)')
    },
  })
  using mockRendererRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => true,
  })

  await expect(prompt('Replace all?', options)).resolves.toBe(true)
  expect(mockDialogRpc.invocations).toEqual([['ConfirmPrompt.prompt', 'Replace all?', options]])
  expect(mockRendererRpc.invocations).toEqual([['ConfirmPrompt.prompt', 'Replace all?', options]])
})

test('prompt - rethrows unrelated errors', async () => {
  const error = new Error('dialog worker failed')
  using mockDialogRpc = DialogWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => {
      throw error
    },
  })
  using mockRendererRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => true,
  })

  await expect(prompt('Replace all?', options)).rejects.toBe(error)
  expect(mockDialogRpc.invocations).toEqual([['ConfirmPrompt.prompt', 'Replace all?', options]])
  expect(mockRendererRpc.invocations).toEqual([])
})
