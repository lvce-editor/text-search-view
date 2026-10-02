import type { SearchResult } from '../SearchResult/SearchResult.ts'

export const createListItem = (result: SearchResult, overrides: Pick<Partial<SearchResult>, 'depth' | 'isDirectory' | 'text'> = {}): SearchResult => {
  return {
    depth: overrides.depth ?? result.depth,
    end: result.end,
    endColumnIndex: result.endColumnIndex,
    isDirectory: overrides.isDirectory ?? result.isDirectory,
    lineNumber: result.lineNumber,
    rowIndex: result.rowIndex,
    start: result.start,
    startColumnIndex: result.startColumnIndex,
    text: overrides.text ?? result.text,
    type: result.type,
  }
}
