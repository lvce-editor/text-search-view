import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.no-workspace-folder'

export const test: Test = async ({ expect, Locator, SideBar, Workspace }) => {
  // arrange
  await Workspace.close()

  // act
  await SideBar.open('Search')

  // assert
  const message = Locator('.SearchWorkspaceMessage')
  const action = Locator('.SearchWorkspaceMessageAction')
  await expect(message).toHaveText('You have not opened or specified a folder. - Open Folder')
  await expect(action).toHaveCSS('appearance', 'none')
  await expect(action).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await expect(action).toHaveCSS('border-top-width', '0px')
  await expect(action).toHaveCSS('color', 'rgb(55, 148, 255)')
  await expect(action).toHaveCSS('padding', '0px')
}
