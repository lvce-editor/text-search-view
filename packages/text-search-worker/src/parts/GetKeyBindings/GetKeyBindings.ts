import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'
import * as GetSearchHeaderKeyBindings from '../GetSearchHeaderKeyBindings/GetSearchHeaderKeyBindings.ts'
import * as GetSearchResultsKeyBindings from '../GetSearchResultsKeyBindings/GetSearchResultsKeyBindings.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [...GetSearchHeaderKeyBindings.getSearchHeaderKeyBindings(), ...GetSearchResultsKeyBindings.getSearchResultKeyBindings()]
}
