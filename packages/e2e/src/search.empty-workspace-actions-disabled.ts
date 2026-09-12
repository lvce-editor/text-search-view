import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.empty-workspace-actions-disabled'

export const test: Test = async ({ expect, Locator, SideBar, Workspace }) => {
  // arrange
  await Workspace.setPath('')

  // act
  await SideBar.open('Search')

  // assert
  const actions = Locator('.SideBarTitleArea')
  const refreshAction = actions.locator('[name="Refresh"]')
  await expect(refreshAction).toHaveAttribute('disabled', '')
  const clearAllAction = actions.locator('[name="ClearAll"]')
  await expect(clearAllAction).toHaveAttribute('disabled', '')
  const viewAsTreeAction = actions.locator('[name="ViewAsTree"]')
  await expect(viewAsTreeAction).toHaveAttribute('disabled', null)
  const collapseAllAction = actions.locator('[name="CollapseAll"]')
  await expect(collapseAllAction).toHaveAttribute('disabled', '')
  const openSearchEditorAction = actions.locator('[name="OpenSearchEditor"]')
  await expect(openSearchEditorAction).toHaveAttribute('disabled', null)
}
