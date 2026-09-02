import { hasProperty, hasStringProperty } from '../HasProperty/HasProperty.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const getSavedValue = (savedState: unknown): string => {
  if (hasStringProperty(savedState, 'value')) {
    return savedState.value
  }
  return ''
}

export const getSavedReplacement = (savedState: unknown): string => {
  if (hasStringProperty(savedState, 'replacement')) {
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
  if (hasStringProperty(savedState, 'includeValue')) {
    return savedState.includeValue
  }
  return ''
}

export const getSavedExcludeValue = (savedState: unknown): string => {
  if (hasStringProperty(savedState, 'excludeValue')) {
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
