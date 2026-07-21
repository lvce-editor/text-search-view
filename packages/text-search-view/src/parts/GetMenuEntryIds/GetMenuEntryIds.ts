import { MenuEntryId } from '@lvce-editor/constants'

export const getMenuEntryIds = (): readonly number[] => {
  return [MenuEntryId.Search, MenuEntryId.InputContextMenu]
}
