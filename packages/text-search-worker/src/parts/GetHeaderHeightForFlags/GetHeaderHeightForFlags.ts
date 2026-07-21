import * as GetTopHeight from '../GetTopHeight/GetTopHeight.ts'

export const getHeaderHeightForFlags = (headerHeight: number, oldFlags: number, newFlags: number): number => {
  const oldTopHeight = GetTopHeight.getTopHeight(oldFlags)
  const newTopHeight = GetTopHeight.getTopHeight(newFlags)
  const warningHeight = Math.max(headerHeight - oldTopHeight, 0)
  return newTopHeight + warningHeight
}
