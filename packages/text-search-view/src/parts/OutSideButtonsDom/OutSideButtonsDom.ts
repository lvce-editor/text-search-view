import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export interface OutSideButtonsDom {
  readonly postNodes: readonly VirtualDomNode[]
  readonly preNodes: readonly VirtualDomNode[]
}
