const WINDOWS_DRIVE_REGEX = /^[A-Za-z]:$/

const getFileUrl = (uri: string): URL | undefined => {
  if (!URL.canParse(uri)) {
    return undefined
  }
  const url = new URL(uri)
  return url.protocol === 'file:' ? url : undefined
}

export const getSearchRootUri = (openEditorUris: readonly string[]): string => {
  const fileUrls = openEditorUris.map(getFileUrl).filter((url): url is URL => Boolean(url))
  if (fileUrls.length === 0) {
    return 'file:///'
  }
  const first = fileUrls[0]
  const firstParts = first.pathname.split('/').filter(Boolean)
  let commonDirectory = firstParts.slice(0, -1)
  for (const url of fileUrls.slice(1)) {
    if (url.host !== first.host) {
      continue
    }
    const directory = url.pathname.split('/').filter(Boolean).slice(0, -1)
    let index = 0
    while (index < commonDirectory.length && index < directory.length && commonDirectory[index] === directory[index]) {
      index++
    }
    commonDirectory = commonDirectory.slice(0, index)
  }
  if (commonDirectory.length === 0 && WINDOWS_DRIVE_REGEX.test(firstParts[0] || '')) {
    commonDirectory = firstParts.slice(0, 1)
  }
  const root = new URL(first.href)
  root.pathname = `/${commonDirectory.join('/')}/`
  return root.href
}
