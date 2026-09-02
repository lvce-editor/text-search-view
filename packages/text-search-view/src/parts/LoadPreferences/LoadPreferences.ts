import { getSearchExcludes } from '../GetSearchExcludes/GetSearchExcludes.ts'
import { getUsePullBasedSearch } from '../GetUsePullBasedSearch/GetUsePullBasedSearch.ts'

interface Preferences {
  readonly defaultExcludes: readonly string[]
  readonly usePullBasedSearch: boolean
}

export const loadPreferences = async (currentDefaultExcludes: readonly string[]): Promise<Preferences> => {
  const [defaultExcludes, usePullBasedSearch] = await Promise.all([getSearchExcludes(currentDefaultExcludes), getUsePullBasedSearch()])
  return {
    defaultExcludes,
    usePullBasedSearch,
  }
}
