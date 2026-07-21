import { hasProperty } from '../HasProperty/HasProperty.ts'

export const getSavedFocus = (savedState: unknown): number => {
  if (hasProperty(savedState, 'focus') && typeof savedState.focus === 'number') {
    return savedState.focus
  }
  return 0
}

export const getSavedListFocus = (savedState: unknown): boolean => {
  if (hasProperty(savedState, 'listFocused') && typeof savedState.listFocused === 'boolean') {
    return savedState.listFocused
  }
  return false
}
