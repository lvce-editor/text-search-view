import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { FileIconsResult } from '../FileIconsRequest/FileIconsResult.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as GetFileIconsCached from '../GetFileIconsCached/GetFileIconsCached.ts'
import * as GetMissingIconRequests from '../GetMissingIconRequests/GetMissingIconRequests.ts'
import * as RequestFileIcons from '../RequestFileIcons/RequestFileIcons.ts'
import * as UpdateIconCache from '../UpdateIconCache/UpdateIconCache.ts'

export const getFileIcons = async (items: readonly SearchResult[], fileIconCache: FileIconCache): Promise<FileIconsResult> => {
  const missingRequests = GetMissingIconRequests.getMissingIconRequests(items, fileIconCache)
  const newIcons = await RequestFileIcons.requestFileIcons(missingRequests)
  const newFileIconCache = UpdateIconCache.updateIconCache(fileIconCache, missingRequests, newIcons)
  const icons = GetFileIconsCached.getIconsCached(items, newFileIconCache)
  return {
    icons,
    newFileIconCache,
  }
}
