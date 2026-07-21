interface CutTextResult {
  readonly cutText: string
  readonly newText: string
}

export const getNewTextCut = (currentText: string, selectionStart: number, selectionEnd: number): CutTextResult => {
  const pre = currentText.slice(0, selectionStart)
  const middle = currentText.slice(selectionStart, selectionEnd)
  const post = currentText.slice(selectionEnd)
  return {
    cutText: middle,
    newText: pre + post,
  }
}
