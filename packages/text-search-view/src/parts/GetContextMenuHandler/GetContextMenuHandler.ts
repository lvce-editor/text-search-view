import type { SearchState } from '../SearchState/SearchState.ts'
import * as MouseEventType from '../MouseEventType/MouseEventType.ts'
import * as ViewletSearchHandleContextMenuKeyBoard from '../ViewletSearchHandleContextMenuKeyBoard/ViewletSearchHandleContextMenuKeyBoard.ts'
import * as ViewletSearchHandleContextMenuMouseAt from '../ViewletSearchHandleContextMenuMouseAt/ViewletSearchHandleContextMenuMouseAt.ts'

export interface ContextMenuHandler {
  (state: SearchState, x: number, y: number): Promise<SearchState>
}

export const getContextMenuHandler = (button: number): ContextMenuHandler => {
  switch (button) {
    case MouseEventType.Keyboard:
      return ViewletSearchHandleContextMenuKeyBoard.handleContextMenuKeyboard
    default:
      return ViewletSearchHandleContextMenuMouseAt.handleContextMenuMouseAt
  }
}
