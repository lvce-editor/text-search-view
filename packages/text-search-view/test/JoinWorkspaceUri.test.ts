import { expect, test } from '@jest/globals'
import { joinWorkspaceUri } from '../src/parts/JoinWorkspaceUri/JoinWorkspaceUri.ts'

test.each([
  ['file:///workspace', './src/file.ts', 'file:///workspace/src/file.ts'],
  ['file:///workspace/', 'file.ts', 'file:///workspace/file.ts'],
  ['file:///', 'file.ts', 'file:///file.ts'],
  ['file:///project%20files', '100%#?.ts', 'file:///project%20files/100%25%23%3F.ts'],
  ['file:///workspace', 'back\\slash.ts', 'file:///workspace/back%5Cslash.ts'],
  ['file:///C:/project', '.\\src\\file.ts', 'file:///C:/project/src/file.ts'],
  ['file://server/share', 'src\\file.ts', 'file://server/share/src/file.ts'],
  ['memfs://workspace', 'src/file.ts', 'memfs://workspace/src/file.ts'],
  ['vscode-remote://ssh-remote+host/home/project', 'file.ts', 'vscode-remote://ssh-remote+host/home/project/file.ts'],
])('joins %s and %s', (workspaceUri, path, expected) => {
  expect(joinWorkspaceUri(workspaceUri, path)).toBe(expected)
})
