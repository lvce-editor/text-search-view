import type { TextEdit } from '../TextEdit/TextEdit.ts'

export interface BulkReplacementEdit {
  readonly changes: readonly TextEdit[]
  readonly uri: string
}
