import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.empty-workspace-actions-disabled'

export const test: Test = async ({ expect, Locator, SideBar, Workspace }) => {
  // arrange
  await Workspace.setPath('')

  // act
  await SideBar.open('Search')

  // assert
  const search = Locator('.Search')
  await expect(search.locator('[name="Refresh"]')).toHaveAttribute('disabled', '')
  await expect(search.locator('[name="ClearAll"]')).toHaveAttribute('disabled', '')
  await expect(search.locator('[name="ViewAsTree"]')).toHaveAttribute('disabled', '')
  await expect(search.locator('[name="CollapseAll"]')).toHaveAttribute('disabled', '')
  await expect(search.locator('[name="OpenSearchEditor"]')).not.toHaveAttribute('disabled', '')
}
