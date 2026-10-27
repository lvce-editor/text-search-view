import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.dismiss-file'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: `abc\nabx`, uri: `${tmpDir}/a.css` },
    { content: `abc\nabx`, uri: `${tmpDir}/b.css` },
  ])
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.focusIndex(0)

  // act
  await Search.dismissItem()

  // assert
  const message = Locator('.Search [role="status"]')
  const dismissedFile = Locator('.TreeItem[aria-label="/a.css"]')
  const retainedFile = Locator('.TreeItem[aria-label="/b.css"]')
  const matches = Locator('.TreeItem[aria-label="abc"], .TreeItem[aria-label="abx"]')
  await expect(message).toHaveText('2 results in 1 file')
  await expect(dismissedFile).toBeHidden()
  await expect(retainedFile).toBeVisible()
  await expect(matches).toHaveCount(2)
}
