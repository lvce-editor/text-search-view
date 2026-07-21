import { DetailsExpanded, ReplaceExpanded } from '../SearchFlags/SearchFlags.ts'

export const getTopHeight = (flags: number): number => {
  if (flags & ReplaceExpanded && flags & DetailsExpanded) {
    return 190
  }
  if (flags & DetailsExpanded) {
    return 158
  }
  if (flags & ReplaceExpanded) {
    return 93
  }
  return 61
}
