const dirname = (pathSeparator: string, path: string): string => {
  const index = path.lastIndexOf(pathSeparator)
  if (index === -1) {
    return ''
  }
  return path.slice(0, index)
}

export const dirname2 = (path: string): string => {
  return dirname('/', path)
}

export const basename2 = (path: string): string => {
  return path.slice(path.lastIndexOf('/') + 1)
}

export const normalizeRelativePath = (path: string): string => {
  if (path.startsWith('./')) {
    return path.slice(2)
  }
  return path
}

export const join2 = (path: string, childPath: string): string => {
  if (path === '') {
    return childPath
  }
  if (path.endsWith('/')) {
    return `${path}${childPath}`
  }
  return `${path}/${childPath}`
}
