import * as GetTopHeight from '../GetTopHeight/GetTopHeight.ts'
import * as SearchMessageHeight from '../SearchMessageHeight/SearchMessageHeight.ts'

export const getSearchHeaderHeight = (flags: number, messageHeight: number, warningHeight: number): number => {
  const additionalMessageHeight = Math.max(messageHeight - SearchMessageHeight.Minimum, 0)
  return GetTopHeight.getTopHeight(flags) + additionalMessageHeight + warningHeight
}
