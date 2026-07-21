export const getChildCount = (icon: string, expanded: number, badgeText: string): number => {
  let childCount = 0
  if (expanded) {
    childCount++ // chevron
  }
  if (icon) {
    childCount++ // file icon
  }
  childCount++ // label
  if (badgeText) {
    childCount++ // badge
  }
  childCount++ // remove button
  return childCount
}
