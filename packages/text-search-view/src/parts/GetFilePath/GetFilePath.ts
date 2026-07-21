export const getFilePath = (text: string): string => {
  // TODO make api stricter so that results always have the same shape
  if (text.startsWith('./')) {
    return text.slice(2)
  }
  return text
}
