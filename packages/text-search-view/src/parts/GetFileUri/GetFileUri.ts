import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIndex from '../GetFileIndex/GetFileIndex.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const getFileUri = (state: SearchState, index: number): string => {
  const { items, workspacePath } = state
  if (index < 0 || index >= items.length) {
    return ''
  }
  const fileIndex = GetFileIndex.getFileIndex(items, index)
  if (fileIndex === -1) {
    return ''
  }
  return `${workspacePath}${Workspace.getRelativePath(items[fileIndex].text)}`
}
