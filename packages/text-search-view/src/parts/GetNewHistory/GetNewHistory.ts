export const getNewHistory = (history: readonly string[], newValue: string): readonly string[] => {
  const newHistory = [...history, newValue]
  const maxHistoryLength = 100
  const cutHistory = newHistory.slice(0, maxHistoryLength)
  return cutHistory
}
