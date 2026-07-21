import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import type { InputAction } from '../InputAction/InputAction.ts'
import type { InputActions } from '../InputActions/InputActions.ts'
import * as InputActionFlag from '../InputActionFlag/InputActionFlag.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getInputActionsExclude = (flags: number): InputActions => {
  const inside: readonly InputAction[] = [
    {
      command: 'toggleUseExcludeSettings',
      flag: flags & SearchFlags.UseIgnoreFiles ? InputActionFlag.CheckBoxEnabled : InputActionFlag.CheckBoxDisabled,
      icon: ClassNames.MaskIconExclude,
      name: InputName.UseExcludeSettings,
      title: SearchStrings.useExcludeSettings(),
    },
  ]
  const outside: readonly InputAction[] = []
  return {
    inside,
    outside,
  }
}
