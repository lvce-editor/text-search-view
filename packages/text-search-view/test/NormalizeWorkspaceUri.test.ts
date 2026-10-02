import { expect, test } from '@jest/globals'
import { normalizeWorkspaceUri } from '../src/parts/NormalizeWorkspaceUri/NormalizeWorkspaceUri.ts'

test.each([
  ['', ''],
  ['/workspace', 'file:///workspace'],
  ['/project files/100%#?', 'file:///project%20files/100%25%23%3F'],
  ['/project/日本語', 'file:///project/%E6%97%A5%E6%9C%AC%E8%AA%9E'],
  ['/project/back\\Slash', 'file:///project/back%5CSlash'],
  ['C:\\Users\\project files', 'file:///C:/Users/project%20files'],
  ['D:/project', 'file:///D:/project'],
  ['\\\\server\\share\\project files', 'file://server/share/project%20files'],
  ['file:///project%20files/100%25', 'file:///project%20files/100%25'],
  ['memfs://workspace/project', 'memfs://workspace/project'],
  ['vscode-remote://ssh-remote+host/home/project', 'vscode-remote://ssh-remote+host/home/project'],
])('normalizes workspace %s to %s', (input, expected) => {
  expect(normalizeWorkspaceUri(input)).toBe(expected)
})

test('rejects a relative path instead of storing it as a URI', () => {
  expect(() => normalizeWorkspaceUri('relative/project')).toThrow()
})
