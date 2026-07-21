import { expect, test } from '@jest/globals'
import { initializeSearchProcess } from '../src/parts/InitializeSearchProcess/InitializeSearchProcess.ts'

test('initializeSearchProcess ignores unsupported platforms', async () => {
  await expect(initializeSearchProcess(999)).resolves.toBeUndefined()
})
