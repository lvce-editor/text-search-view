// Older renderers pass a filesystem path when creating or changing the workspace.
export const normalizeWorkspaceUri = (workspaceUri: string): string => {
  if (!workspaceUri) {
    return ''
  }
  if (workspaceUri.startsWith('\\\\')) {
    const path = workspaceUri.slice(2).replaceAll('\\', '/')
    const slashIndex = path.indexOf('/')
    const url = new URL(`file://${path.slice(0, slashIndex)}/`)
    url.pathname = path.slice(slashIndex).replaceAll('%', '%25')
    return url.href
  }
  if (workspaceUri.startsWith('/') || /^[a-z]:[\\/]/i.test(workspaceUri)) {
    const url = new URL('file:///')
    const path = workspaceUri.startsWith('/') ? workspaceUri : workspaceUri.replaceAll('\\', '/')
    url.pathname = path.replaceAll('%', '%25').replaceAll('\\', '%5C')
    return url.href
  }
  return new URL(workspaceUri).href
}
