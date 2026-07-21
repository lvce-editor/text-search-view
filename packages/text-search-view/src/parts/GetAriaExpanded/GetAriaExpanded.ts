import * as ExpandedType from '../ExpandedType/ExpandedType.ts'

// TODO instead of setting string, support enum in virtual dom and send enum to renderer process
// which converts it to a boolean
export const getAriaExpanded = (expanded: number): string | undefined => {
  switch (expanded) {
    case ExpandedType.Collapsed:
      return 'false'
    case ExpandedType.Expanded:
      return 'true'
    default:
      return undefined
  }
}
