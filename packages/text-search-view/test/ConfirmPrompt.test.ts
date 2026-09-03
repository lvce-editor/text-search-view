import { expect, test } from '@jest/globals'
import { DialogWorker } from '@lvce-editor/rpc-registry'
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
