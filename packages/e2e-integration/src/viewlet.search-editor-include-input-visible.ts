import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.search-editor-include-input-visible'

export const test: Test = async ({ expect, Locator, Main, SideBar }) => {
  await Main.closeAllEditors()
  await SideBar.open('Search')

  const sideBarInput = Locator('#SideBar textarea[name="SearchValue"]')
  await sideBarInput.click()
  const sidebarSearch = Locator('#SideBar .Search')
  const includeInput = Locator('#SideBar textarea[name="FilesToInclude"]')
  const toggleDetails = Locator('#SideBar button[name="ToggleSearchDetails"]')
  await expect(toggleDetails).toBeVisible()
  await toggleDetails.click()
  await Locator('#SideBar button[title="Open New Search Editor"]').click()

  await expect(Locator('#Main .Search')).toBeVisible()
  await expect(sidebarSearch.locator('.SearchHeader')).toHaveCSS('height', '158px')
  await expect(includeInput).toBeVisible()
  await includeInput.click()
  await includeInput.type('src/**/*.ts')
  await expect(includeInput).toHaveValue('src/**/*.ts')
}
