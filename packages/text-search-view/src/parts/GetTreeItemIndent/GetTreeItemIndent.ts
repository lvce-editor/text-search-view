const defaultIndent = 12
const baseIndent = 16

export const getTreeItemIndent = (depth: number): number => {
  return baseIndent + depth * defaultIndent
}
