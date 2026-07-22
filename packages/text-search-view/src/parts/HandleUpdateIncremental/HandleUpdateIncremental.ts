import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'
import * as TextSearchIncremental from '../TextSearchIncremental/TextSearchIncremental.ts'

export const handleUpdateIncremental = async (state: SearchState, update: Partial<SearchState>): Promise<SearchState> => {
  const { workspacePath } = state
  const partialNewState = { ...state, ...update }
  const { assetDir, excludeValue, flags, includeValue, limit, platform, threads, uid, usePullBasedSearch, value } = partialNewState
  const root = workspacePath
  const scheme = GetProtocol.getProtocol(root)
  const searchId = crypto.randomUUID() // TODO try to avoid side effect
  const latest1 = SearchViewStates.get(uid)
  const updatedState1: SearchState = {
    ...latest1.newState,
    ...partialNewState,
    searchId,
  }
  SearchViewStates.set(uid, latest1.oldState, updatedState1)

  // TODO await promise?
  void TextSearchIncremental.textSearchIncremental(
    root,
    value,
    {
      assetDir: assetDir,
      defaultExcludes: SearchFlags.hasUseIgnoreFiles(flags) ? partialNewState.defaultExcludes : [],
      exclude: excludeValue,
      flags,
      include: includeValue,
      isCaseSensitive: Boolean(flags & SearchFlags.MatchCase),
      limit,
      matchWholeWord: Boolean(flags & SearchFlags.MatchWholeWord),
      query: value,
      root,
      scheme,
      threads,
      useIgnoreFiles: SearchFlags.hasUseIgnoreFiles(flags),
      usePullBasedSearch: usePullBasedSearch,
      useRegularExpression: Boolean(flags & SearchFlags.UseRegularExpression),
    },
    assetDir,
    platform,
    searchId,
    uid,
  )
  return state
}
