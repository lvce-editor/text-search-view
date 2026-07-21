import { expect, test } from '@jest/globals'

test.skip('invoke - forwards call to rpc', async () => {
  // @ts-ignore
  const result = await SearchProcess.invoke('test.method', 'arg1', 'arg2')
  expect(result).toBe('test result')
})
