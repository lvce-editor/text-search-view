import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.limit-hit'

export const test: Test = async ({ expect, FileSystem, Locator, Search, Settings, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc\n`.repeat(10))
  await Settings.update({ 'textSearch.maxResults': 5 })
  try {
    await Workspace.setPath(tmpDir)
    await SideBar.open('Search')
    await Search.setValue('ab')
    const viewletSearch = Locator('.Search')
    const message = viewletSearch.locator('[role="status"]')
    await expect(message).toHaveText('5 results in 1 file')

    // assert
    const warningMessage = Locator('.SearchWarningMessage')
    await expect(warningMessage).toBeVisible()
    await expect(warningMessage).toHaveText(
      'The result set only contains a subset of all matches. Be more specific in your search to narrow down the results.',
    )
  } finally {
    await Settings.update({ 'textSearch.maxResults': 20_000 })
  }
}
