import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'
import * as KeyCode from '../KeyCode/KeyCode.ts'
import * as KeyModifier from '../KeyModifier/KeyModifier.ts'

export const getSearchHeaderKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      command: 'Search.replaceAll',
      key: KeyModifier.CtrlCmd | KeyModifier.Alt | KeyCode.Enter,
      when: WhenExpression.FocusSearch,
    },
    {
      command: 'Search.focusNextInput',
      key: KeyCode.Tab,
      when: WhenExpression.FocusSearch,
    },
    {
      command: 'Search.focusPreviousInput',
      key: KeyModifier.Shift | KeyCode.Tab,
      when: WhenExpression.FocusSearch,
    },
    {
      command: 'Search.previousHistoryResult',
      key: KeyCode.UpArrow,
      when: WhenExpression.FocusSearchInput,
    },
    {
      command: 'Search.nextHistoryResult',
      key: KeyCode.DownArrow,
      when: WhenExpression.FocusSearchInput,
    },
    {
      command: 'Search.submit',
      key: KeyCode.Enter,
      when: WhenExpression.FocusSearchInput,
    },
    {
      command: 'Search.submit',
      key: KeyCode.Enter,
      when: WhenExpression.FocusSearchReplaceInput,
    },
  ]
}
