import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config.default,
  ...config.recommendedActions,
  ...config.recommendedRegex,
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
    files: ['packages/text-search-view/test/CopyAll.test.ts', 'packages/{e2e,e2e-integration}/**/*.ts'],
    rules: {
      '@cspell/spellchecker': 'off',
    },
  },
  {
    files: ['packages/text-search-view/test/GetProtocol.test.ts', 'packages/{e2e,e2e-integration}/src/search.regex-optional-protocol.ts'],
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
  {
    files: ['**/*.ts'],
    rules: {
      'e2e/no-direct-click': 'off',
      'unicorn/no-break-in-nested-loop': 'off',
      '@typescript-eslint/no-deprecated': 'off',
      'rpc/no-rpc-registry-destructuring': 'off',
    },
  },
  {
    // The pinned application supplies its own Node runtime.
    files: ['.github/workflows/integration.yml'],
    rules: { 'github-actions/node-version-file': 'off', 'github-actions/on': 'off' },
  },
  {
    // Preserve real DOM input events covered by the migrated application scenarios.
    files: [
      'packages/e2e-integration/src/viewlet.search-view-mode.ts',
      'packages/e2e-integration/src/viewlet.search-result-cursor-visible.ts',
      'packages/e2e-integration/src/viewlet.search-input-icon-color.ts',
      'packages/e2e-integration/src/viewlet.search-editor-restore-previous-editor.ts',
      'packages/e2e-integration/src/viewlet.search-editor-replace-all-accessibility.ts',
      'packages/e2e-integration/src/viewlet.search-editor-preserve-tab-state.ts',
      'packages/e2e-integration/src/viewlet.search-editor-open.ts',
      'packages/e2e-integration/src/viewlet.search-editor-new-each-time.ts',
      'packages/e2e-integration/src/viewlet.search-editor-keyboard-navigation.ts',
      'packages/e2e-integration/src/viewlet.search-editor-independent-input.ts',
      'packages/e2e-integration/src/viewlet.search-editor-context-lines.ts',
      'packages/e2e-integration/src/viewlet.search-editor-close.ts',
      'packages/e2e-integration/src/viewlet.search-editor-accessibility.ts',
    ],
    rules: { '@typescript-eslint/no-deprecated': 'off' },
  },
  {
    // The application runner supplies mutable API objects to these scenarios.
    files: ['packages/e2e-integration/src/**/*.ts'],
    rules: { '@typescript-eslint/prefer-readonly-parameter-types': 'off' },
  },
])
