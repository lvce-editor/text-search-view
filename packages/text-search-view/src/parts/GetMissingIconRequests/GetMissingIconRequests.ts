import { DirentType } from '@lvce-editor/constants'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { IconRequest } from '../IconRequest/IconRequest.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import { getFileName } from '../GetFileName/GetFileName.ts'
import { getFilePath } from '../GetFilePath/GetFilePath.ts'
import { isFile } from '../IsFile/IsFile.ts'

const getMissingDirents = (searchResults: readonly SearchResult[], fileIconCache: FileIconCache): readonly SearchResult[] => {
  const missingDirents: SearchResult[] = []
  const files = searchResults.filter(isFile)
  for (const file of files) {
    const uri = getFilePath(file.text)

    if (!(uri in fileIconCache)) {
      missingDirents.push(file)
    }
  }
  return missingDirents
}

const toIconRequest = (item: SearchResult): IconRequest => {
  const filePath = getFilePath(item.text)
  const fileName = getFileName(filePath)
  return {
    name: fileName,
    path: filePath,
    type: DirentType.File,
  }
}

export const getMissingIconRequests = (dirents: readonly SearchResult[], fileIconCache: FileIconCache): readonly IconRequest[] => {
  const missingRequests = getMissingDirents(dirents, fileIconCache)
  const iconRequests = missingRequests.map(toIconRequest)
  return iconRequests
}
