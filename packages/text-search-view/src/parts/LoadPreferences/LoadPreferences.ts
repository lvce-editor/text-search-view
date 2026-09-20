import { getSearchExcludes } from '../GetSearchExcludes/GetSearchExcludes.ts'
import { getShowOpenInEditorLink } from '../GetShowOpenInEditorLink/GetShowOpenInEditorLink.ts'
import { getUsePullBasedSearch } from '../GetUsePullBasedSearch/GetUsePullBasedSearch.ts'

interface Preferences {
  readonly defaultExcludes: readonly string[]
  readonly showOpenInEditorLink: boolean
  readonly usePullBasedSearch: boolean
}

export const loadPreferences = async (currentDefaultExcludes: readonly string[]): Promise<Preferences> => {
  const [defaultExcludes, showOpenInEditorLink, usePullBasedSearch] = await Promise.all([
    getSearchExcludes(currentDefaultExcludes),
    getShowOpenInEditorLink(),
    getUsePullBasedSearch(),
  ])
  return {
    defaultExcludes,
    showOpenInEditorLink,
    usePullBasedSearch,
  }
}
