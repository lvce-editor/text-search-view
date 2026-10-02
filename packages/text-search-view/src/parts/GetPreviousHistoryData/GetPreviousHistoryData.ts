import type { NextHistoryData } from '../GetNextHistoryData/GetNextHistoryData.ts'

export const getPreviousHistoryData = (history: readonly string[], historyIndex: number): NextHistoryData => {
  if (history.length === 0) {
    return {
      newHistoryIndex: -1,
      newValue: '',
    }
  }
  const newHistoryIndex = historyIndex < 0 ? history.length - 1 : Math.max(historyIndex - 1, 0)
  return {
    newHistoryIndex,
    newValue: history[newHistoryIndex],
  }
}
