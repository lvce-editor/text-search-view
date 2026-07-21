import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { Tree } from '../Tree/Tree.ts'
import { join2 } from '../Path/Path.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const treeToList = (map: Tree, root: string): readonly SearchResult[] => {
  const items: SearchResult[] = []
  const processChildren = (path: string, depth: number): void => {
    const children = map[path]
    if (!children) {
      return
    }
    const count = children.length
    for (let i = 0; i < count; i++) {
      const child = children[i]
      if (child.type === TextSearchResultType.Match) {
        items.push(child)
      } else {
        const childPath = join2(path, child.text)
        const absolutePath = `${root}${childPath}`
        items.push({
          ...child,
          text: absolutePath,
        })
        processChildren(childPath, depth + 1)
      }
    }
  }
  processChildren('', 0)
  return items
}
