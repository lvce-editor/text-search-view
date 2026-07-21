import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.input-paste'

export const test: Test = async ({ ClipBoard, expect, FileSystem, Locator, Search, Workspace }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  await ClipBoard.writeText('ab')
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await Search.open()
  await Search.setValue('')
  await Search.setReplaceValue('')

  // act
  await Search.handleInputPaste('SearchValue')

  // assert
  const searchInput = Locator('[name="SearchValue"]')
  await expect(searchInput).toHaveValue('ab')
}
