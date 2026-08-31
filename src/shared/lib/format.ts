const dateFormatters = new Map<string, Intl.DateTimeFormat>()

const getFormatter = (locale: string) => {
  let formatter = dateFormatters.get(locale)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    dateFormatters.set(locale, formatter)
  }
  return formatter
}

export const formatDate = (value: string | Date | null | undefined, locale = 'ru-RU'): string => {
  if (!value) return '-'
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? '-' : getFormatter(locale).format(date)
}

const dateTimeFormatters = new Map<string, Intl.DateTimeFormat>()

export const formatDateTime = (value: string | Date | null | undefined, locale = 'ru-RU'): string => {
  if (!value) return '-'
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return '-'

  let formatter = dateTimeFormatters.get(locale)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    dateTimeFormatters.set(locale, formatter)
  }
  return formatter.format(date)
}
