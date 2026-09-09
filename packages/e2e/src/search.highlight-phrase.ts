import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.highlight-phrase'

export const test: Test = async ({ expect, FileSystem, Locator, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/README.md`, '# File System Worker\n\nWeb Worker for the file system functionality in LVCE Editor.\n')
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  const input = Locator('[name="SearchValue"]')
  await input.type('f')
  const search = Locator('.Search')
  await expect(search.locator('[role="status"]')).toHaveText('4 results in 1 file')
  const heading = search.locator('[role="treeitem"][title="# File System Worker"]')
  await expect(heading.locator('.Highlight')).toHaveText('F')

  await input.type('file system')
  await expect(input).toHaveValue('file system')

  await expect(search.locator('[role="status"]')).toHaveText('2 results in 1 file')
  await expect(heading.locator('.Highlight')).toHaveText('File System')
  const description = search.locator('[role="treeitem"][title="Web Worker for the file system functionality in LVCE Editor."]')
  await expect(description.locator('.Highlight')).toHaveText('file system')
}
