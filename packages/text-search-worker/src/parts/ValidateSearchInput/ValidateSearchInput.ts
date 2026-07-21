// Based on https://github.com/microsoft/vscode/blob/ad375c92764b72a1f28f3e1626563e9e41e5c740/src/vs/workbench/contrib/search/browser/searchWidget.ts#L393 by Microsoft (License MIT)

import { UseRegularExpression } from '../SearchFlags/SearchFlags.ts'

export const validateSearchInput = (value: string, flags: number): string => {
  if (!value) {
    return ''
  }
  if (!(flags & UseRegularExpression)) {
    return ''
  }
  try {
    new RegExp(value, 'u')
  } catch (error) {
    if (error && error instanceof Error) {
      return error.message
    }
    return ''
  }
  return ''
}
