import { RendererWorker } from '@lvce-editor/rpc-registry'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIndex from '../GetFileIndex/GetFileIndex.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const selectIndexPreview = async (state: SearchState, searchResult: SearchResult, index: number): Promise<SearchState> => {
  const { listItems, workspacePath } = state
  const fileIndex = GetFileIndex.getFileIndex(listItems, index)
  if (fileIndex === -1) {
    throw new Error('Search result is missing file')
  }
  const { end, endColumnIndex = end, lineNumber, rowIndex = lineNumber, start, startColumnIndex = start } = searchResult
  const fileResult = listItems[fileIndex]
  const relativePath = Workspace.getRelativePath(fileResult.text)
  const absolutePath = `${workspacePath}${relativePath}`
  await RendererWorker.openUri2({
    focus: true,
    selections: new Uint32Array([rowIndex, startColumnIndex, rowIndex, endColumnIndex]),
    uri: absolutePath,
  })
  return {
    ...state,
    focus: WhenExpression.FocusSearchResults,
    focusSource: InputSource.Script,
    listFocused: false,
    listFocusedIndex: index,
  }
}
