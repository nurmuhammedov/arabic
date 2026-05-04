export const removeEmptyParams = (params: Record<string, string | null | undefined>) => {
  const newParams: Record<string, string | null | undefined> = {}

  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (value !== null && value !== undefined && value !== '' && !!value) {
      newParams[key] = value?.toString()?.trim()
    }
  })

  return newParams
}
