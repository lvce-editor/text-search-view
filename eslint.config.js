import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config.default,
  ...config.recommendedActions,
  ...config.recommendedTsconfig,
  ...config.recommendedVirtualDom,
  {
    ignores: ['packages/text-search-view/src/textSearchViewMain.ts'],
  },
  {
    files: ['packages/text-search-view/test/**/*.ts'],
    rules: {
      'jest/no-disabled-tests': 'off',
      'virtual-dom/no-inline-event-handlers': 'off',
      'virtual-dom/prefer-constants': 'off',
      'virtual-dom/prefer-merge-class-names': 'off',
      'virtual-dom/prefer-state-destructuring': 'off',
      'virtual-dom/valid-child-count': 'off',
    },
  },
  {
    files: ['packages/text-search-view/test/Diff2.test.ts', 'packages/text-search-view/test/Submit.test.ts'],
    rules: {
      'jest/expect-expect': 'off',
      'sonarjs/assertions-in-tests': 'off',
    },
  },
  {
    files: ['packages/text-search-view/test/CopyAll.test.ts', 'packages/e2e/**/*.ts'],
    rules: {
      '@cspell/spellchecker': 'off',
    },
  },
  {
    files: ['packages/text-search-view/test/GetProtocol.test.ts', 'packages/e2e/src/search.regex-optional-protocol.ts'],
    rules: {
      'unicorn/prefer-https': 'off',
    },
  },
  {
    files: ['packages/text-search-view/src/parts/WaitForNextFrame/WaitForNextFrame.ts'],
    rules: {
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    },
  },
  {
    files: ['packages/text-search-view/test/WaitForNextFrame.test.ts'],
    rules: {
      'unicorn/no-global-object-property-assignment': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      'e2e/no-direct-click': 'off',
      'unicorn/no-break-in-nested-loop': 'off',
    },
  },
])
