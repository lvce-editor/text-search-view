import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.view-as-tree'

// The standalone e2e runtime uses the published worker manifest. Enable this regression after the consumer publishes the action refresh fix.
export const skip = 1

export const test: Test = async ({ expect, Extension, FileSystem, IconTheme, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const iconThemeUri = import.meta.resolve('../fixtures/search-icon-theme')
  await Extension.addWebExtension(iconThemeUri)
  await IconTheme.setIconTheme('search-test-icon-theme')
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.mkdir(`${tmpDir}/src`)
  await FileSystem.mkdir(`${tmpDir}/src/nested`)
  await FileSystem.writeFile(`${tmpDir}/src/nested/file.ts`, 'needle')
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('needle')
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
  const action = Locator('.SideBarTitleArea').locator('[name="ViewAsTree"]')
  await expect(action).toHaveAttribute('disabled', null)

  // act
  await action.click()

  // assert
  const sourceFolder = Locator('.TreeItem[aria-label="/src"]')
  const nestedFolder = Locator('.TreeItem[aria-label="/src/nested"]')
  const file = Locator('.TreeItem[aria-label="/src/nested/file.ts"]')
  const match = Locator('.TreeItem[aria-label="needle"]')
  await expect(sourceFolder).toHaveAttribute('aria-level', '0')
  await expect(nestedFolder).toHaveAttribute('aria-level', '1')
  await expect(file).toHaveAttribute('aria-level', '2')
  await expect(match).toHaveAttribute('aria-level', '3')
  const sourceFolderIcon = sourceFolder.locator('.FileIcon[src$="/folder.svg"]')
  const nestedFolderIcon = nestedFolder.locator('.FileIcon[src$="/folder.svg"]')
  const fileIcon = file.locator('.FileIcon[src$="/default.svg"]')
  await expect(sourceFolderIcon).toHaveCount(1)
  await expect(nestedFolderIcon).toHaveCount(1)
  await expect(fileIcon).toHaveCount(1)

  const viewAsListAction = Locator('.SideBarTitleArea').locator('[name="ViewAsList"]')
  await expect(viewAsListAction).toHaveAttribute('title', 'View as List')

  // act
  await viewAsListAction.click()

  // assert
  const listItems = Locator('.Search').locator('[role="treeitem"]')
  const listFile = Locator('.TreeItem[aria-label="/src/nested/file.ts"]')
  const listMatch = Locator('.TreeItem[aria-label="needle"]')
  const viewAsTreeAction = Locator('.SideBarTitleArea').locator('[name="ViewAsTree"]')
  await expect(listItems).toHaveCount(2)
  await expect(listFile).toHaveAttribute('aria-level', '0')
  await expect(listMatch).toHaveAttribute('aria-level', '1')
  await expect(viewAsTreeAction).toHaveAttribute('title', 'View as Tree')

  // act
  await viewAsTreeAction.click()

  // assert
  await expect(sourceFolder).toHaveAttribute('aria-level', '0')
  await expect(nestedFolder).toHaveAttribute('aria-level', '1')
  await expect(file).toHaveAttribute('aria-level', '2')
  await expect(match).toHaveAttribute('aria-level', '3')

  // act
  await IconTheme.setIconTheme('search-test-icon-theme-alternate')

  // assert
  const alternateSourceFolderIcon = sourceFolder.locator('.FileIcon[src$="/folder-alternate.svg"]')
  const alternateNestedFolderIcon = nestedFolder.locator('.FileIcon[src$="/folder-alternate.svg"]')
  const alternateFileIcon = file.locator('.FileIcon[src$="/default-alternate.svg"]')
  await expect(alternateSourceFolderIcon).toHaveCount(1)
  await expect(alternateNestedFolderIcon).toHaveCount(1)
  await expect(alternateFileIcon).toHaveCount(1)
}
