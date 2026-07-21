import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const deleted: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.HighlightDeleted,
  type: VirtualDomElements.Del,
}

const inserted: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.HighlightInserted,
  type: VirtualDomElements.Ins,
}

const highlighted: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Highlight,
  type: VirtualDomElements.Span,
}

const label1: VirtualDomNode = {
  childCount: 1,
  className: MergeClassNames.mergeClassNames(ClassNames.Label, ClassNames.Grow),
  type: VirtualDomElements.Div,
}

const label3: VirtualDomNode = {
  ...label1,
  childCount: 3,
}

const label4: VirtualDomNode = {
  ...label1,
  childCount: 4,
}

export const getLabelVirtualDom = (displayText: string, matchLength: number, matchStart: number, replacement: string): readonly VirtualDomNode[] => {
  if (matchLength) {
    const before = displayText.slice(0, matchStart)
    const highlight = displayText.slice(matchStart, matchStart + matchLength)
    const after = displayText.slice(matchStart + matchLength)
    if (replacement) {
      const replacementPreview = replacement.split(/\r\n|\r|\n/, 1)[0]
      return [label4, text(before), deleted, text(highlight), inserted, text(replacementPreview), text(after)]
    }
    return [label3, text(before), highlighted, text(highlight), text(after)]
  }
  return [label1, text(displayText)]
}
