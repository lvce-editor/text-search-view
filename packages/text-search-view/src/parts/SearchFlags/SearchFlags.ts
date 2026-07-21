export const PreserveCase = 1 << 0 // 1
export const UseRegularExpression = 1 << 1 // 2
export const ReplaceExpanded = 1 << 2 // 4
export const MatchWholeWord = 1 << 3 // 8
export const MatchCase = 1 << 4 // 16
export const DetailsExpanded = 1 << 5 // 32
export const OpenEditors = 1 << 6 // 64
export const UseIgnoreFiles = 1 << 7 // 128

export const hasPreserveCase = (flags: number): boolean => {
  return (flags & PreserveCase) === PreserveCase
}

export const hasUseRegularExpression = (flags: number): boolean => {
  return (flags & UseRegularExpression) === UseRegularExpression
}

export const hasReplaceExpanded = (flags: number): boolean => {
  return (flags & ReplaceExpanded) === ReplaceExpanded
}

export const hasMatchWholeWord = (flags: number): boolean => {
  return (flags & MatchWholeWord) === MatchWholeWord
}

export const hasMatchCase = (flags: number): boolean => {
  return (flags & MatchCase) === MatchCase
}

export const hasDetailsExpanded = (flags: number): boolean => {
  return (flags & DetailsExpanded) === DetailsExpanded
}

export const hasOpenEditors = (flags: number): boolean => {
  return (flags & OpenEditors) === OpenEditors
}

export const hasUseIgnoreFiles = (flags: number): boolean => {
  return (flags & UseIgnoreFiles) === UseIgnoreFiles
}
