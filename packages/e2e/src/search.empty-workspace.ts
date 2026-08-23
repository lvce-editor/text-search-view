import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.empty-workspace'

export const test: Test = async ({ expect, Locator, SideBar, Workspace }) => {
  // arrange
  await Workspace.setPath('')

  // act
  await SideBar.open('Search')

  // assert
  const message = Locator('.SearchWorkspaceMessage')
  await expect(message).toBeVisible()
  await expect(message).toHaveText('You have not opened or specified a folder. - Open Folder')
  const openFolderLink = message.locator('.MessageAction')
  await expect(openFolderLink).toHaveText('Open Folder')
  await expect(openFolderLink).toHaveCSS('appearance', 'none')
  await expect(openFolderLink).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await expect(openFolderLink).toHaveCSS('border-top-width', '0px')
  await expect(openFolderLink).toHaveCSS('color', 'rgb(55, 148, 255)')
  await expect(openFolderLink).toHaveCSS('padding', '0px')
}
