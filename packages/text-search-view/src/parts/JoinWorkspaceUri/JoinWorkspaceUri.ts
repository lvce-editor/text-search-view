const RE_WINDOWS_FILE_URI = /^file:\/\/(?:[^/]|\/[a-z]:)/i
const RE_TRAILING_SLASH = /\/$/

export const joinWorkspaceUri = (workspaceUri: string, relativePath: string): string => {
  const url = new URL(workspaceUri)
  const windowsPath = RE_WINDOWS_FILE_URI.test(workspaceUri)
  const path = windowsPath ? relativePath.replaceAll('\\', '/') : relativePath
  const normalizedPath = path.startsWith('./') ? path.slice(2) : path
  url.pathname = `${url.pathname.replace(RE_TRAILING_SLASH, '')}/${normalizedPath.replaceAll('%', '%25').replaceAll('\\', '%5C')}`
  return url.href
}
