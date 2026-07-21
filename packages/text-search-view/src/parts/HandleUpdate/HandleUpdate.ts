import type { SearchState } from '../SearchState/SearchState.ts'
import * as ErrorHandling from '../ErrorHandling/ErrorHandling.ts'
import { handleUpdateEmpty } from '../HandleUpdateEmpty/HandleUpdateEmpty.ts'
import { handleUpdateError } from '../HandleUpdateError/HandleUpdateError.ts'
import { handleUpdateFull } from '../HandleUpdateFull/HandleUpdateFull.ts'
import { handleUpdateIncremental } from '../HandleUpdateIncremental/HandleUpdateIncremental.ts'
import { handleUpdatePullBased } from '../HandleUpdatePullBased/HandleUpdatePullBased.ts'
import { handleUpdateValidationError } from '../HandleUpdateValidationError/HandleUpdateValidationError.ts'
import * as IsEmptyString from '../IsEmptyString/IsEmptyString.ts'
import * as ValidateSearchInput from '../ValidateSearchInput/ValidateSearchInput.ts'

export const handleUpdate = async (state: SearchState, update: Partial<SearchState>): Promise<SearchState> => {
  const { incrementalSearch, usePullBasedSearch } = state
  const partialNewState = { ...state, ...update }
  try {
    const { flags, value } = partialNewState
    if (IsEmptyString.isEmptyString(value)) {
      return handleUpdateEmpty(state, update)
    }
    const searchInputErrorMessage = ValidateSearchInput.validateSearchInput(value, flags)
    if (searchInputErrorMessage) {
      return handleUpdateValidationError(state, update, searchInputErrorMessage)
    }
    if (incrementalSearch) {
      return await handleUpdateIncremental(state, update)
    }
    if (usePullBasedSearch) {
      return await handleUpdatePullBased(state, update)
    }
    return await handleUpdateFull(state, update)
  } catch (error) {
    ErrorHandling.handleError(error)
    return handleUpdateError(state, update, error)
  }
}
