import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.empty-workspace-actions-disabled'

export const test: Test = async ({ expect, Locator, SideBar, Workspace }) => {
  // arrange
  await Workspace.setPath('')

  // act
  await SideBar.open('Search')

  // assert
  const actions = Locator('.SideBarTitleArea')
  await expect(actions.locator('[name="Refresh"]')).toHaveAttribute('disabled', '')
  await expect(actions.locator('[name="ClearAll"]')).toHaveAttribute('disabled', '')
  await expect(actions.locator('[name="ViewAsTree"]')).toHaveAttribute('disabled', '')
  await expect(actions.locator('[name="CollapseAll"]')).toHaveAttribute('disabled', '')
  await expect(actions.locator('[name="OpenSearchEditor"]')).not.toHaveAttribute('disabled', '')
}
