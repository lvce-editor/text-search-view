import { getUnique } from '../GetUnique/GetUnique.ts'

export const getUniqueIndents = (indents: readonly number[]): readonly number[] => {
  const uniqueIndents = getUnique(indents)
  return uniqueIndents
}
