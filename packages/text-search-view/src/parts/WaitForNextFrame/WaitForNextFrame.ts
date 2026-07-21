export const waitForNextFrame = async (): Promise<void> => {
  const { promise, resolve } = Promise.withResolvers() as {
    promise: Promise<DOMHighResTimeStamp>
    resolve: (value: DOMHighResTimeStamp | PromiseLike<DOMHighResTimeStamp>) => void
    reject: (reason?: unknown) => void
  }
  requestAnimationFrame(resolve)
  await promise
}
