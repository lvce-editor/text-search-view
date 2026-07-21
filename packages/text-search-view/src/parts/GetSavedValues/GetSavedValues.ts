import { hasProperty } from '../HasProperty/HasProperty.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const getSavedValue = (savedState: unknown): string => {
  if (hasProperty(savedState, 'value') && typeof savedState.value === 'string') {
    return savedState.value
  }
  return ''
}

export const getSavedReplacement = (savedState: unknown): string => {
  if (hasProperty(savedState, 'replacement') && typeof savedState.replacement === 'string') {
    return savedState.replacement
  }
  return ''
}

export const getSavedFlags = (savedState: unknown): number => {
  if (hasProperty(savedState, 'flags') && typeof savedState.flags === 'number') {
    return savedState.flags
  }
  return SearchFlags.UseIgnoreFiles
}

export const getSavedIncludeValue = (savedState: unknown): string => {
  if (hasProperty(savedState, 'includeValue') && typeof savedState.includeValue === 'string') {
    return savedState.includeValue
  }
  return ''
}

export const getSavedExcludeValue = (savedState: unknown): string => {
  if (hasProperty(savedState, 'excludeValue') && typeof savedState.excludeValue === 'string') {
    return savedState.excludeValue
  }
  return ''
}

export const getSavedCollapsedPaths = (savedState: unknown): readonly string[] => {
  if (
    hasProperty(savedState, 'collapsedPaths') &&
    Array.isArray(savedState.collapsedPaths) &&
    savedState.collapsedPaths.every((item) => typeof item === 'string')
  ) {
    return savedState.collapsedPaths
  }
  return []
}
