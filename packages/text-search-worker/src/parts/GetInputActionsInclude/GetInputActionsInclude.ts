import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import type { InputAction } from '../InputAction/InputAction.ts'
import type { InputActions } from '../InputActions/InputActions.ts'
import * as InputActionFlag from '../InputActionFlag/InputActionFlag.ts'
import * as InputName from '../InputName/InputName.ts'
import { OpenEditors } from '../SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getInputActionsInclude = (flags: number): InputActions => {
  const inside: readonly InputAction[] = [
    {
      command: 'searchOnlyOpenEditors',
      flag: flags & OpenEditors ? InputActionFlag.CheckBoxEnabled : InputActionFlag.CheckBoxDisabled,
      icon: ClassNames.MaskIconBook,
      name: InputName.SearchOnlyOpenEditors,
      title: SearchStrings.searchOnlyOpenEditors(),
    },
  ]
  const outside: readonly InputAction[] = []
  return {
    inside,
    outside,
  }
}
