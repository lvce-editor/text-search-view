import type { RestoredState } from '../RestoredState/RestoredState.ts'
import { getSavedFocus, getSavedListFocus } from '../GetSavedFocus/GetSavedFocus.ts'
import { getSavedHistory } from '../GetSavedHistory/GetSavedHistory.ts'
import {
  getSavedValue,
  getSavedReplacement,
  getSavedFlags,
  getSavedIncludeValue,
  getSavedExcludeValue,
  getSavedCollapsedPaths,
} from '../GetSavedValues/GetSavedValues.ts'

export const restoreState = (savedState: unknown): RestoredState => {
  return {
    excludeValue: getSavedExcludeValue(savedState),
    flags: getSavedFlags(savedState),
    focus: getSavedFocus(savedState),
    history: getSavedHistory(savedState),
    includeValue: getSavedIncludeValue(savedState),
    listFocused: getSavedListFocus(savedState),
    replacement: getSavedReplacement(savedState),
    savedCollapsedPaths: getSavedCollapsedPaths(savedState),
    savedValue: getSavedValue(savedState),
    threads: 1,
  }
}
