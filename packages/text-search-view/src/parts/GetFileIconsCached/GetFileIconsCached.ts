import { TextSearchResultType } from '@lvce-editor/constants'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import { getFilePath } from '../GetFilePath/GetFilePath.ts'

export const getIconsCached = (dirents: readonly SearchResult[], fileIconCache: FileIconCache): string[] => {
  return dirents.map((dirent) => {
    if (dirent.type === TextSearchResultType.Match) {
      return ''
    }
    const path = getFilePath(dirent.text)
    return fileIconCache[path]
  })
}
