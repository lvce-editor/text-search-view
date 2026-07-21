export const getNewText = (currentText: string, selectionStart: number, selectionEnd: number, insertedText: string): string => {
  const pre = currentText.slice(0, selectionStart)
  const post = currentText.slice(selectionEnd)
  const merged = pre + insertedText + post
  return merged
}
