import * as config from '@lvce-editor/eslint-config'

export default [
  ...config.default,
  ...config.recommendedActions,
  ...config.recommendedTsconfig,
  ...config.recommendedVirtualDom,
  {
    ignores: ['packages/text-search-view/src/textsearchViewMain.ts'],
  },
  {
    files: ['packages/text-search-view/src/parts/LaunchSearchProcessNode/LaunchSearchProcessNode.ts'],
    rules: {
      'virtual-dom/no-object-attribute-values': 'off',
    },
  },
  {
    files: ['packages/text-search-view/test/**/*.ts'],
    rules: {
      'virtual-dom/no-empty-aria': 'off',
      'virtual-dom/no-inline-event-handlers': 'off',
      'virtual-dom/no-object-attribute-values': 'off',
      'virtual-dom/prefer-constants': 'off',
      'virtual-dom/prefer-merge-class-names': 'off',
      'virtual-dom/prefer-state-destructuring': 'off',
      'virtual-dom/valid-child-count': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      'e2e/no-direct-click': 'off',
      'e2e/no-inline-locator-in-expect': 'off',
      'e2e/no-inline-nth-in-expect': 'off',
      'e2e/prefer-filesystem-set-files': 'off',
      'jest/no-restricted-jest-methods': 'off',
      'sonarjs/assertions-in-tests': 'off',
      'sonarjs/prefer-specific-assertions': 'off',
      'unicorn/no-break-in-nested-loop': 'off',
      'unicorn/no-global-object-property-assignment': 'off',
      'unicorn/no-useless-template-literals': 'off',
      'unicorn/prefer-minimal-ternary': 'off',
      'unicorn/prefer-https': 'off',
      'unicorn/prefer-single-call': 'off',
    },
  },
  {
    rules: {
      'github-actions/permissions': 'off',
      '@cspell/spellchecker': 'off',
    },
  },
]
