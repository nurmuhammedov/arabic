import '@tanstack/react-table'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    className?: string
    filter?: {
      key?: string
      type?: 'search' | 'select' | 'date' | 'number' | 'date-range'
      options?: { id: string | number; name: string }[]
      dateStrategy?: string
      maxLength?: number
      rangeKeys?: string[]
    }
  }
}
