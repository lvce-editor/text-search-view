export const waitForNextFrame = async (): Promise<void> => {
  const { promise, resolve } = Promise.withResolvers<DOMHighResTimeStamp>()
  requestAnimationFrame(resolve)
  await promise
}
