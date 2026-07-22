import { handlePullResultsFound } from '../HandlePullResultsFound/HandlePullResultsFound.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export const commandMap = {
  'TextSearch.handlePullResultsFound': SearchViewStates.wrapCommand(handlePullResultsFound),
}
