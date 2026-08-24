import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.empty-workspace'

export const test: Test = async ({ expect, Locator, Search, SideBar, Workspace }) => {
  // arrange
  await Workspace.setPath('')
  await SideBar.open('Search')

  // act
  await Search.setValue('aaa')

  // assert
  const message = Locator('.SearchWorkspaceMessage')
  await expect(message).toBeVisible()
  await expect(message).toHaveText('You have not opened or specified a folder. - Open Folder')
  await expect(message).toHaveCSS('margin-top', '-16px')
  await expect(message).toHaveCSS('overflow-wrap', 'break-word')
  await expect(message).toHaveCSS('padding-right', '22px')
  const searchResults = Locator('.Search').locator('[role="treeitem"]')
  await expect(searchResults).toHaveCount(0)
  const openFolderLink = message.locator('.MessageAction')
  await expect(openFolderLink).toHaveText('Open Folder')
  await expect(openFolderLink).toHaveCSS('appearance', 'none')
  await expect(openFolderLink).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await expect(openFolderLink).toHaveCSS('border-top-width', '0px')
  await expect(openFolderLink).toHaveCSS('color', 'rgb(55, 148, 255)')
  await expect(openFolderLink).toHaveCSS('padding', '0px')
}
