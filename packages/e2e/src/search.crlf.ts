import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.crlf'

export const test: Test = async ({ expect, FileSystem, Locator, Search, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'abc\r\nabc\r\nxyz')
  await Workspace.setPath(tmpDir)
  await Search.open()

  // act
  await Search.setValue('ab')
  await Search.setReplaceValue('')

  // assert
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('2 results in 1 file')
}
