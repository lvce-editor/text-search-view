import { expect, test } from '@jest/globals'
import { waitForNextFrame } from '../src/parts/WaitForNextFrame/WaitForNextFrame.ts'

test('waitForNextFrame resolves after requestAnimationFrame is called', async () => {
  let rafCallback: ((timestamp: DOMHighResTimeStamp) => void) | null = null
  const mockRequestAnimationFrame = (callback: (timestamp: DOMHighResTimeStamp) => void): number => {
    rafCallback = callback
    return 1
  }
  globalThis.requestAnimationFrame = mockRequestAnimationFrame

  const promise = waitForNextFrame()
  expect(rafCallback).not.toBeNull()

  const timestamp = 123.456
  rafCallback!(timestamp)

  await promise
})

test('waitForNextFrame waits for the next frame', async () => {
  let rafCallback: ((timestamp: DOMHighResTimeStamp) => void) | null = null
  let rafCallCount = 0
  const mockRequestAnimationFrame = (callback: (timestamp: DOMHighResTimeStamp) => void): number => {
    rafCallback = callback
    rafCallCount++
    return 1
  }
  globalThis.requestAnimationFrame = mockRequestAnimationFrame

  const promise = waitForNextFrame()
  expect(rafCallCount).toBe(1)
  expect(rafCallback).not.toBeNull()

  const timestamp = 789.012
  rafCallback!(timestamp)

  await promise
  expect(rafCallCount).toBe(1)
})
