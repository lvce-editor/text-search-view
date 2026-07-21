import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'

export const textSearch = async (scheme: string, root: string, query: string): Promise<TextSearchCompletionResult> => {
  // TODO ask renderer worker for files
  const entries = Object.entries({})
  const results: any[] = []
  for (const [key, value] of entries) {
    // @ts-ignore
    if (value.includes(query)) {
      results.push([
        key,
        [
          {
            absoluteOffset: 0,
            preview: value,
          },
        ],
      ])
    }
  }
  return {
    limitHit: false,
    results,
  }
}
