import type { ClickHandler } from '../ClickHandler/ClickHandler.ts'

export const noop: ClickHandler = (state) => {
  return state
}
