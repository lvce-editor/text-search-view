import type { BulkReplacementEdit } from '../BulkReplacementEdit/BulkReplacementEdit.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { TextEdit } from '../TextEdit/TextEdit.ts'
import * as GetFileName from '../GetFilePath/GetFilePath.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getReplaceElements = (items: readonly SearchResult[], workspacePath: string, replacement: string): readonly BulkReplacementEdit[] => {
  const bulkChanges: BulkReplacementEdit[] = []
  let changes: TextEdit[] = []
  // TODO simplify code by first matching files with their elements, then creating bulk edits
  for (const match of items) {
    const { end, lineNumber, start, text, type } = match
    if (type === TextSearchResultType.File) {
      changes = []
      const fileName = GetFileName.getFilePath(text)
      const absolutePath = `${workspacePath}/${fileName}`
      bulkChanges.push({
        changes,
        uri: absolutePath,
      })
    } else {
      changes.push({
        endColumnIndex: end,
        endRowIndex: lineNumber,
        startColumnIndex: start,
        startRowIndex: lineNumber - 1,
        text: replacement,
      })
    }
  }
  return bulkChanges
}
