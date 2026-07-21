import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import { SearchState } from '../SearchState/SearchState.ts'

export const { get, getCommandIds, registerCommands, set, wrapAsyncCommand, wrapCommand, wrapGetter } = ViewletRegistry.create<SearchState>()
