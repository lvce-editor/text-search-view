export const getRipGrepArgs = ({
  defaultExcludes,
  exclude,
  isCaseSensitive,
  searchString,
  threads,
  useRegularExpression,
}: {
  readonly defaultExcludes?: readonly string[]
  readonly exclude?: string
  readonly threads: number
  readonly isCaseSensitive: boolean
  readonly searchString: string
  readonly useRegularExpression: boolean
}): readonly string[] => {
  const ripGrepArgs = ['--hidden', '--no-require-git', '--smart-case', '--stats', '--json', '--threads', `${threads}`]
  const excludePatternsFromValue = exclude
    ? exclude
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
    : []
  const excludePatternsFromDefaults = defaultExcludes?.filter(Boolean) || []
  const uniqueExcludePatterns = [...new Set([...excludePatternsFromDefaults, ...excludePatternsFromValue])]
  for (const excludePattern of uniqueExcludePatterns) {
    if (excludePattern.includes('*')) {
      ripGrepArgs.push('--glob', `!${excludePattern}`)
      if (!excludePattern.endsWith('/**')) {
        ripGrepArgs.push('--glob', `!${excludePattern}/**`)
      }
    } else {
      ripGrepArgs.push('--glob', `!**/${excludePattern}/**`)
    }
  }
  if (isCaseSensitive) {
    ripGrepArgs.push('--case-sensitive')
  } else {
    ripGrepArgs.push('--ignore-case')
  }
  if (useRegularExpression) {
    ripGrepArgs.push('--regexp', searchString)
  } else {
    ripGrepArgs.push('--fixed-strings')
    ripGrepArgs.push('--')
    ripGrepArgs.push(searchString)
  }
  ripGrepArgs.push('.')
  return ripGrepArgs
}
