import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.search-editor-open'

export const test: Test = async ({ expect, FileSystem, KeyBoard, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setUri(tmpDir)
  await Main.closeAllEditors()
  await Locator('.ActivityBarItem[title="Search"]').click()

  const searchEditorButton = Locator('#SideBar button[title="Open New Search Editor"]')
  await expect(searchEditorButton).toBeVisible()
  await searchEditorButton.click()

  const tabs = Locator('.MainTab')
  await expect(tabs).toHaveCount(1)
  await expect(tabs.locator('.TabTitle')).toHaveText('Search')
  await expect(Locator('#Main .Search')).toBeVisible()
  const searchInput = Locator('#Main textarea[name="SearchValue"]')
  await expect(searchInput).toBeVisible()
  await expect(searchInput).toBeFocused()
  for (const key of 'immediately focused') {
    await KeyBoard.press(key === ' ' ? 'Space' : key)
  }
  await expect(searchInput).toHaveValue('immediately focused')
}
