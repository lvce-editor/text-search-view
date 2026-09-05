import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIndex from '../GetFileIndex/GetFileIndex.ts'
import * as JoinWorkspaceUri from '../JoinWorkspaceUri/JoinWorkspaceUri.ts'

export const getFileUri = (state: SearchState, index: number): string => {
  const { items, workspaceUri } = state
  if (index < 0 || index >= items.length) {
    return ''
  }
  const fileIndex = GetFileIndex.getFileIndex(items, index)
  if (fileIndex === -1) {
    return ''
  }
  return JoinWorkspaceUri.joinWorkspaceUri(workspaceUri, items[fileIndex].text)
}
