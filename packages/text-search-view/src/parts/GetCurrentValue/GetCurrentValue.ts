import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputName from '../InputName/InputName.ts'

export const getCurrentValue = (state: SearchState, name: string): string => {
  const { excludeValue, includeValue, replacement, value } = state
  switch (name) {
    case InputName.FilesToExclude:
      return excludeValue
    case InputName.FilesToInclude:
      return includeValue
    case InputName.ReplaceValue:
      return replacement
    case InputName.SearchValue:
      return value
    default:
      return ''
  }
}
