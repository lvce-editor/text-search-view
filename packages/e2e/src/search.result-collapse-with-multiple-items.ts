import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-collapse'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: `abc`, uri: `${tmpDir}/a.css` },
    { content: `abc`, uri: `${tmpDir}/b.css` },
  ])
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.setReplaceValue('')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('2 results in 2 files')
  const result = Locator('.TreeItem[aria-label="/b.css"]')
  await expect(result).toHaveAttribute('aria-expanded', 'true')

  // act
  await Search.selectIndex(2)

  // assert
  await expect(result).toHaveAttribute('aria-expanded', 'false')
}
