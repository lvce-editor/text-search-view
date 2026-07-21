import type { MenuEntryId } from '@lvce-editor/constants'

export interface ContextMenuPropsBase {
  readonly menuId: number
}

export interface ContextMenuPropsInput extends ContextMenuPropsBase {
  readonly inputName: string
  readonly menuId: typeof MenuEntryId.InputContextMenu
}

export interface ContextMenuPropsList extends ContextMenuPropsBase {
  readonly index: number
  readonly menuId: typeof MenuEntryId.Search
}

export type ContextMenuProps = ContextMenuPropsInput | ContextMenuPropsList
