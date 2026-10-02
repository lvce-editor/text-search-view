import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as CreateListItem from '../CreateListItem/CreateListItem.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getTreeListItems = (results: readonly SearchResult[]): readonly SearchResult[] => {
  const listItems: SearchResult[] = []
  const directories = new Set<string>()
  let matchDepth = 0
  for (const result of results) {
    if (result.type !== TextSearchResultType.File) {
      listItems.push(CreateListItem.createListItem(result, { depth: matchDepth }))
      continue
    }
    const path = result.text.startsWith('./') ? result.text.slice(2) : result.text
    const parts = path.split('/')
    let directory = ''
    for (let i = 0; i < parts.length - 1; i++) {
      directory = directory ? `${directory}/${parts[i]}` : parts[i]
      if (!directories.has(directory)) {
        directories.add(directory)
        listItems.push(
          CreateListItem.createListItem(
            { end: 0, lineNumber: 0, start: 0, text: directory, type: TextSearchResultType.File },
            { depth: i, isDirectory: true },
          ),
        )
      }
    }
    matchDepth = parts.length
    listItems.push(CreateListItem.createListItem(result, { depth: matchDepth - 1, text: path }))
  }
  return listItems
}
