import { getComponentState } from '../GetComponentState/GetComponentState.ts'
import { getDom } from '../RenderItems/RenderItems.ts'

export const getComponentDom = (uid: number): readonly any[] => {
  const state = getComponentState(uid)
  return getDom(state)
}
