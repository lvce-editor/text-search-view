import { getSearchExcludes } from '../GetSearchExcludes/GetSearchExcludes.ts'
import { getMaxResults } from '../GetMaxResults/GetMaxResults.ts'
import { getShowOpenInEditorLink } from '../GetShowOpenInEditorLink/GetShowOpenInEditorLink.ts'
import { getUsePullBasedSearch } from '../GetUsePullBasedSearch/GetUsePullBasedSearch.ts'

interface Preferences {
  readonly defaultExcludes: readonly string[]
  readonly maxResults: number
  readonly showOpenInEditorLink: boolean
  readonly usePullBasedSearch: boolean
}

export const loadPreferences = async (currentDefaultExcludes: readonly string[]): Promise<Preferences> => {
  const [defaultExcludes, maxResults, showOpenInEditorLink, usePullBasedSearch] = await Promise.all([
    getSearchExcludes(currentDefaultExcludes),
    getMaxResults(),
    getShowOpenInEditorLink(),
    getUsePullBasedSearch(),
  ])
  return {
    defaultExcludes,
    maxResults,
    showOpenInEditorLink,
    usePullBasedSearch,
  }
}
