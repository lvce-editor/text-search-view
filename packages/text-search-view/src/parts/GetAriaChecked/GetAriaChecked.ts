import * as InputActionFlag from '../InputActionFlag/InputActionFlag.ts'

// TODO maybe move logic to viewmodel, which returns ariaChecked 1 | 2 | 3
export const getAriaChecked = (flag: number): boolean | undefined => {
  switch (flag) {
    case InputActionFlag.CheckBoxDisabled:
      return false
    case InputActionFlag.CheckBoxEnabled:
      return true
    default:
      return undefined
  }
}
