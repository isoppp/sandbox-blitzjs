export const classNames = (array: any[]): string => {
  return array.filter((item) => typeof item === 'string').join(' ')
}
