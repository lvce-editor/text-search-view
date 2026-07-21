import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'
import * as KeyCode from '../KeyCode/KeyCode.ts'
import * as KeyModifier from '../KeyModifier/KeyModifier.ts'

export const getSearchResultKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      command: 'Search.focusNext',
      key: KeyCode.DownArrow,
      when: WhenExpression.FocusSearchResults,
    },
    {
      command: 'Search.focusPrevious',
      key: KeyCode.UpArrow,
      when: WhenExpression.FocusSearchResults,
    },
    {
      command: 'Search.collapseCurrent',
      key: KeyCode.LeftArrow,
      when: WhenExpression.FocusSearchResults,
    },
    {
      command: 'Search.expandCurrent',
      key: KeyCode.RightArrow,
      when: WhenExpression.FocusSearchResults,
    },
    {
      command: 'Search.dismissItem',
      key: KeyCode.Delete,
      when: WhenExpression.FocusSearchResults,
    },
    {
      command: 'Search.focusFirst',
      key: KeyCode.Home,
      when: WhenExpression.FocusSearchResults,
    },
    {
      command: 'Search.focusLast',
      key: KeyCode.End,
      when: WhenExpression.FocusSearchResults,
    },
    {
      command: 'Search.copy',
      key: KeyModifier.CtrlCmd | KeyCode.KeyC,
      when: WhenExpression.FocusSearchResults,
    },
    {
      command: 'Search.removeCurrent',
      key: KeyCode.Delete,
      when: WhenExpression.FocusSearchResults,
    },
  ]
}
