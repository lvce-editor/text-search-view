import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as CreateListItem from '../CreateListItem/CreateListItem.ts'

export const createListItems = (results: readonly SearchResult[]): readonly SearchResult[] => {
  return results.map((result) => CreateListItem.createListItem(result))
}
