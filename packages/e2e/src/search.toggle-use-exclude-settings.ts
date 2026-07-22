import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.toggle-use-exclude-settings'

export const test: Test = async ({ expect, FileSystem, Locator, Search, Settings, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.mkdir(`${tmpDir}/excluded`)
  await FileSystem.mkdir(`${tmpDir}/included`)
  await FileSystem.writeFile(`${tmpDir}/excluded/excluded.txt`, `needle`)
  await FileSystem.writeFile(`${tmpDir}/included/included.txt`, `needle`)
  await Settings.update({ 'search.exclude': { '**/excluded': true } })
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.toggleSearchDetails()

  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  const useExcludeSettings = viewletSearch.locator('button[name="UseExcludeSettings"]')
  const excludedResult = viewletSearch.locator('.TreeItem[aria-label$="excluded.txt"]')
  const includedResult = viewletSearch.locator('.TreeItem[aria-label$="included.txt"]')
  await expect(useExcludeSettings).toHaveAttribute('aria-checked', 'true')

  // act
  await useExcludeSettings.click()
  await Search.setValue('needle')

  // assert
  await expect(message).toHaveText('2 results in 2 files')
  await expect(useExcludeSettings).toHaveAttribute('aria-checked', 'false')
  await expect(excludedResult).toBeVisible()
  await expect(includedResult).toBeVisible()

  // act
  await Search.setValue('')
  await useExcludeSettings.click()
  await Search.setValue('needle')

  // assert
  await expect(useExcludeSettings).toHaveAttribute('aria-checked', 'true')
  await expect(message).toHaveText('1 result in 1 file')
  await expect(excludedResult).toBeHidden()
  await expect(includedResult).toBeVisible()
}
