import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.exclude-setting-refresh'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Search, Settings, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.mkdir(`${tmpDir}/excluded`)
  await FileSystem.mkdir(`${tmpDir}/included`)
  await FileSystem.writeFile(`${tmpDir}/excluded/excluded.txt`, `needle`)
  await FileSystem.writeFile(`${tmpDir}/included/included.txt`, `needle`)
  await Settings.update({ 'search.exclude': {} })
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('needle')

  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  const excludedResult = viewletSearch.locator('.TreeItem[aria-label$="excluded.txt"]')
  const includedResult = viewletSearch.locator('.TreeItem[aria-label$="included.txt"]')
  await expect(message).toHaveText('2 results in 2 files')
  await expect(excludedResult).toBeVisible()
  await expect(includedResult).toBeVisible()

  // act
  await Settings.update({ 'search.exclude': { '**/excluded': true } })
  await Command.execute('Search.refresh')

  // assert
  await expect(message).toHaveText('1 result in 1 file')
  await expect(excludedResult).toBeHidden()
  await expect(includedResult).toBeVisible()
}
