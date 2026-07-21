export interface NextHistoryData {
  readonly newHistoryIndex: number
  readonly newValue: string
}

export const getNextHistoryData = (history: readonly string[], historyIndex: number): NextHistoryData => {
  if (historyIndex === -1 || history.length === 0) {
    return {
      newHistoryIndex: -1,
      newValue: '',
    }
  }
  const item = history.at(historyIndex) || ''
  return {
    newHistoryIndex: historyIndex + 1,
    newValue: item,
  }
}
