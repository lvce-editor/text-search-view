import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.focus-backward-navigation'

export const test: Test = async ({ expect, FileSystem, KeyBoard, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, 'abc')
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')

  const searchInput = Locator('[name="SearchValue"]')
  const matchCase = Locator('[name="MatchCase"]')
  const matchWholeWord = Locator('[name="MatchWholeWord"]')
  const regex = Locator('[name="UseRegularExpression"]')
  const detailsToggle = Locator('[name="ToggleSearchDetails"]')
  const details = Locator('.SearchHeaderDetailsExpandedTop')
  const useExcludeSettings = Locator('[name="UseExcludeSettings"]')
  const filesToExclude = Locator('[name="FilesToExclude"]')
  const searchOnlyOpenEditors = Locator('[name="SearchOnlyOpenEditors"]')
  const filesToInclude = Locator('[name="FilesToInclude"]')

  // arrange expanded details
  await detailsToggle.click()
  await expect(details).toBeVisible()

  // act and assert backward navigation through expanded details
  await Search.focusFirst()
  await Locator('.Tree').dispatchEvent('focus', {} as any)
  await KeyBoard.press('Shift+Tab')
  await expect(useExcludeSettings).toBeFocused()
  await KeyBoard.press('Shift+Tab')
  await expect(filesToExclude).toBeFocused()
  await KeyBoard.press('Shift+Tab')
  await expect(searchOnlyOpenEditors).toBeFocused()
  await KeyBoard.press('Shift+Tab')
  await expect(filesToInclude).toBeFocused()
  await KeyBoard.press('Shift+Tab')
  await expect(detailsToggle).toBeFocused()

  // arrange collapsed details
  await detailsToggle.click()
  await expect(details).toBeHidden()

  // act and assert backward navigation through collapsed details
  await Search.focusFirst()
  await Locator('.Tree').dispatchEvent('focus', {} as any)
  await KeyBoard.press('Shift+Tab')
  await expect(detailsToggle).toBeFocused()
  await KeyBoard.press('Shift+Tab')
  await expect(regex).toBeFocused()
  await KeyBoard.press('Shift+Tab')
  await expect(matchWholeWord).toBeFocused()
  await KeyBoard.press('Shift+Tab')
  await expect(matchCase).toBeFocused()
  await KeyBoard.press('Shift+Tab')
  await expect(searchInput).toBeFocused()
}
