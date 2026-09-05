export const joinWorkspaceUri = (workspaceUri: string, relativePath: string): string => {
  const url = new URL(workspaceUri)
  const windowsPath = /^file:\/\/(?:[^/]|\/[a-z]:)/i.test(workspaceUri)
  const path = windowsPath ? relativePath.replaceAll('\\', '/') : relativePath
  const normalizedPath = path.startsWith('./') ? path.slice(2) : path
  url.pathname = `${url.pathname.replace(/\/$/, '')}/${normalizedPath.replaceAll('%', '%25').replaceAll('\\', '%5C')}`
  return url.href
}
