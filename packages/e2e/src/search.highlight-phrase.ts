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
  const message = search.locator('[role="status"]')
  await expect(message).toHaveText('4 results in 1 file')
  const heading = search.locator('[role="treeitem"][title="# File System Worker"]')
  const headingHighlight = heading.locator('.Highlight')
  await expect(headingHighlight).toHaveText('F')

  await input.type('file system')
  await expect(input).toHaveValue('file system')

  await expect(message).toHaveText('2 results in 1 file')
  await expect(headingHighlight).toHaveText('File System')
  const description = search.locator('[role="treeitem"][title="Web Worker for the file system functionality in LVCE Editor."]')
  const descriptionHighlight = description.locator('.Highlight')
  await expect(descriptionHighlight).toHaveText('file system')
}
