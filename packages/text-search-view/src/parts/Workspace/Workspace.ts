// TODO this should be in FileSystem module
export const pathBaseName = (path: string): string => {
  return path.slice(path.lastIndexOf('/') + 1)
}

export const getRelativePath = (relativePath: string): string => {
  if (relativePath.startsWith('./')) {
    return `/${relativePath.slice(2)}` // TODO support windows paths
  }
  return `/${relativePath}` // TODO support windows paths
}

export const getRelativeFolderPath = (relativePath: string): string => {
  const normalized = relativePath.startsWith('./') ? relativePath.slice(2) : relativePath
  const slashIndex = normalized.lastIndexOf('/')
  if (slashIndex === -1) {
    return ''
  }
  return normalized.slice(0, slashIndex)
}
