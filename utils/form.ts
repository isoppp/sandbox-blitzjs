export const removeEmptyFields = (data: any) => {
  const copied = { ...data }
  Object.keys(copied).forEach((key) => {
    if (!copied[key]) {
      delete copied[key]
    }
  })
  return copied
}
