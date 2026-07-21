import { hasProperty } from '../HasProperty/HasProperty.ts'

const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

export const getSavedHistory = (savedState: unknown): readonly string[] => {
  if (hasProperty(savedState, 'history') && Array.isArray(savedState.history) && savedState.history.every(isString)) {
    return savedState.history
  }
  return []
}
