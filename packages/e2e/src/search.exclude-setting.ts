import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.exclude-setting'

export const test: Test = async ({ expect, FileSystem, Locator, Search, Settings, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.mkdir(`${tmpDir}/excluded`)
  await FileSystem.mkdir(`${tmpDir}/included`)
  await FileSystem.writeFile(`${tmpDir}/excluded/excluded.txt`, `needle`)
  await FileSystem.writeFile(`${tmpDir}/included/included.txt`, `needle`)
  await Settings.update({ 'search.exclude': { '**/excluded': true } })
  await Workspace.setPath(tmpDir)

  // act
  await SideBar.open('Search')
  await Search.setValue('needle')

  // assert
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  const excludedResult = viewletSearch.locator('.TreeItem[aria-label$="excluded.txt"]')
  const includedResult = viewletSearch.locator('.TreeItem[aria-label$="included.txt"]')
  await expect(message).toHaveText('1 result in 1 file')
  await expect(excludedResult).toBeHidden()
  await expect(includedResult).toBeVisible()
}
