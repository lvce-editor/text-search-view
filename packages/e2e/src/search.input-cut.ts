import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.input-cut'

export const test: Test = async ({ ClipBoard, FileSystem, Search, Workspace }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await Search.open()
  await Search.setValue('abc')
  await Search.setReplaceValue('')
  await Search.handleInputSelectionChange('SearchValue', 1, 2)

  // act
  await Search.handleInputCut('SearchValue')

  // assert
  await ClipBoard.shouldHaveText('b')
}
