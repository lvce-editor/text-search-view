import {
  ReplaceExpanded,
  DetailsExpanded,
  OpenEditors,
  UseIgnoreFiles,
  PreserveCase,
  MatchCase,
  MatchWholeWord,
  UseRegularExpression,
} from '../SearchFlags/SearchFlags.ts'

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
