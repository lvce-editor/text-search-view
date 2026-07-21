import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.input-copy'

export const test: Test = async ({ ClipBoard, FileSystem, Search, Workspace }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await Search.open()
  await Search.setValue('ab')
  await Search.setReplaceValue('')
  await Search.handleInputSelectionChange('SearchValue', 0, 2)

  // act
  await Search.handleInputCopy('SearchValue')

  // assert
  await ClipBoard.shouldHaveText('ab')
}
