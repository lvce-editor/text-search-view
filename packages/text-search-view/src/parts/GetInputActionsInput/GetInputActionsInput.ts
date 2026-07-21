import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import type { InputAction } from '../InputAction/InputAction.ts'
import type { InputActions } from '../InputActions/InputActions.ts'
import * as InputActionFlag from '../InputActionFlag/InputActionFlag.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getInputActionsInput = (flags: number): InputActions => {
  const inside: readonly InputAction[] = [
    {
      flag: flags & SearchFlags.MatchCase ? InputActionFlag.CheckBoxEnabled : InputActionFlag.CheckBoxDisabled,
      icon: ClassNames.MaskIconCaseSensitive,
      name: InputName.MatchCase,
      title: SearchStrings.matchCase(),
    },
    {
      flag: flags & SearchFlags.MatchWholeWord ? InputActionFlag.CheckBoxEnabled : InputActionFlag.CheckBoxDisabled,
      icon: ClassNames.MaskIconWholeWord,
      name: InputName.MatchWholeWord,
      title: SearchStrings.matchWholeWord(),
    },
    {
      flag: flags & SearchFlags.UseRegularExpression ? InputActionFlag.CheckBoxEnabled : InputActionFlag.CheckBoxDisabled,
      icon: ClassNames.MaskIconRegex,
      name: InputName.UseRegularExpression,
      title: SearchStrings.useRegularExpression(),
    },
  ]
  const outside: readonly InputAction[] = []
  return {
    inside,
    outside,
  }
}
