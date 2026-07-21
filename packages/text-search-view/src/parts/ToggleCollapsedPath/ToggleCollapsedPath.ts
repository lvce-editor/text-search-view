export const toggleCollapsedPath = (collapsedPaths: readonly string[], path: string): readonly string[] => {
  if (collapsedPaths.includes(path)) {
    const index = collapsedPaths.indexOf(path)
    return collapsedPaths.toSpliced(index, 1)
  }
  return [...collapsedPaths, path]
}
