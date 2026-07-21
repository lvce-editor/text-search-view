import type { InputAction } from '../InputAction/InputAction.ts'

export interface InputActions {
  readonly inside: readonly InputAction[]
  readonly outside: readonly InputAction[]
}
