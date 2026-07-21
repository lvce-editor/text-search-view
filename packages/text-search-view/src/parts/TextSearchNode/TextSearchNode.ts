import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker, SearchProcess } from '@lvce-editor/rpc-registry'
import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as GetTextSearchRipGrepArgs from '../GetTextSearchRipGrepArgs/GetTextSearchRipGrepArgs.ts'

export const textSearch = async (
  scheme: string,
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir?: string,
  platform?: number,
  searchId?: string,
  uid?: number,
): Promise<TextSearchCompletionResult> => {
  const ripGrepArgs = GetTextSearchRipGrepArgs.getRipGrepArgs({
    ...options,
    searchString: query,
  })
  if (options.usePullBasedSearch && searchId && (scheme === '' || scheme === 'file')) {
    const pullSearchOptions = {
      ripGrepArgs,
      searchDir: root,
      searchId,
      uid,
    }
    if (platform === PlatformType.Remote || platform === PlatformType.Electron) {
      await SearchProcess.invoke('TextSearch.searchPull', pullSearchOptions)
    } else {
      await RendererWorker.invoke('SearchProcess.invoke', 'TextSearch.searchPull', pullSearchOptions)
    }
    return {
      limitHit: false,
      results: [],
    }
  }
  const actualOptions = {
    ripGrepArgs,
    searchDir: root,
  }
  if (platform === PlatformType.Remote || platform === PlatformType.Electron) {
    const result = await SearchProcess.invoke('TextSearch.search', actualOptions)
    return {
      limitHit: result.limitHit,
      results: result.results,
    }
  }
  // TODO always create search process messageport rpc to have one api, in web can send the messageport to renderer worker
  const result = await RendererWorker.invoke('SearchProcess.invoke', 'TextSearch.search', actualOptions)
  // TODO api is weird
  return {
    limitHit: result.limitHit,
    results: result.results,
  }
}
