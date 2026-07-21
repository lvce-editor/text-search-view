export const addCollapsedPath = (collapsedPaths: readonly string[], path: string): readonly string[] => {
  const pathWithDot = `.${path}`
  const newCollapsedPaths = [...collapsedPaths, path, pathWithDot]
  return newCollapsedPaths
}
