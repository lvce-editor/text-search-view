import * as InputActionFlag from '../InputActionFlag/InputActionFlag.ts'

export const getDisabled = (flag: number): boolean | undefined => {
  switch (flag) {
    case InputActionFlag.ButtonDisabled:
      return true
    default:
      return undefined
  }
}
