export interface NextHistoryData {
  readonly newHistoryIndex: number
  readonly newValue: string
}

export const getNextHistoryData = (history: readonly string[], historyIndex: number): NextHistoryData => {
  if (historyIndex < 0 || history.length === 0 || historyIndex >= history.length - 1) {
    return {
      newHistoryIndex: -1,
      newValue: '',
    }
  }
  const newHistoryIndex = historyIndex + 1
  const item = history[newHistoryIndex]
  return {
    newHistoryIndex,
    newValue: item,
  }
}
