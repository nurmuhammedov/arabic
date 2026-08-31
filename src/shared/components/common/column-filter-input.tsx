import type { ColumnDef } from '@tanstack/react-table'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@topcoder/components'
import { cn } from '@topcoder/lib'
import { Check, SearchIcon, X } from 'lucide-react'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  CLEAR_BUTTON_STYLE,
  type FilterSubProps,
  ICON_STYLE,
  TRIGGER_CONTENT_STYLE,
  WRAPPER_STYLE,
} from './column-filter-shared'

const DateFilter = lazy(() => import('./column-filter-date').then((m) => ({ default: m.DateFilter })))
const DateRangeFilter = lazy(() => import('./column-filter-date').then((m) => ({ default: m.DateRangeFilter })))

const DateFilterFallback = () => <div className={WRAPPER_STYLE} />

const SearchNumberFilter = ({ filterKey, filterParams }: FilterSubProps) => {
  const { type: filterType, maxLength: filterMaxLength = 30 } = filterParams

  const [queryValue, setQueryValue] = useQueryState(filterKey, parseAsString.withDefault(''))
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const [value, setValue] = useState(queryValue ?? '')
  const [prevQuery, setPrevQuery] = useState(queryValue ?? '')

  if ((queryValue ?? '') !== prevQuery) {
    setValue(queryValue ?? '')
    setPrevQuery(queryValue ?? '')
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value !== (queryValue ?? '')) {
        void setQueryValue(value || null)
        void setPage(null)
      }
    }, 500)

    return () => clearTimeout(handler)
  }, [value, queryValue, setQueryValue, setPage])

  const handleInputChange = (val: string) => {
    if (filterType === 'number') {
      const re = /^[0-9\b]+$/
      if (val !== '' && !re.test(val)) return
    }

    setValue(val)
  }

  return (
    <div className={WRAPPER_STYLE}>
      <SearchIcon className={ICON_STYLE} />
      <Input
        value={value}
        placeholder=""
        maxLength={filterMaxLength}
        onChange={(e) => handleInputChange(e.target.value)}
        className={cn(
          'h-full w-full border-none pl-8 pr-6 text-xs font-normal shadow-none outline-none focus-visible:ring-0',
          'bg-white',
          filterKey === 'arabic' && 'font-arabic text-lg'
        )}
      />
      {value && (
        <div
          onClick={(e) => {
            e.stopPropagation()
            setValue('')
            void setQueryValue(null)
            void setPage(null)
          }}
          className={CLEAR_BUTTON_STYLE}
        >
          <X size={14} />
        </div>
      )}
    </div>
  )
}

const SelectFilter = ({ filterKey, filterParams }: FilterSubProps) => {
  const { t } = useTranslation(['form'])
  const { options: filterOptions } = filterParams
  const [queryValue, setQueryValue] = useQueryState(filterKey, parseAsString.withDefault(''))
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [open, setOpen] = useState(false)

  const selectedOptionLabel = useMemo(() => {
    if (!filterOptions || !queryValue) return ''
    const option = filterOptions?.find(
      (opt: { id: string | number; name: string }) => opt.id.toString() === queryValue.toString()
    )
    return option ? option?.name : queryValue
  }, [filterOptions, queryValue])

  return (
    <div className={WRAPPER_STYLE}>
      <SearchIcon className={ICON_STYLE} />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className={TRIGGER_CONTENT_STYLE} role="button" tabIndex={0}>
            <span className={cn('truncate', !queryValue && 'text-neutral-400')}>
              {queryValue ? selectedOptionLabel : ''}
            </span>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput hideIcon placeholder={t('search')} className="h-9 pl-2" />
            <CommandList>
              <CommandEmpty>{t('nothing_found')}</CommandEmpty>
              <CommandGroup>
                {filterOptions?.map((option: { id: string | number; name: string }) => (
                  <CommandItem
                    className="pl-1"
                    key={option.id}
                    value={option.name}
                    onSelect={() => {
                      void setQueryValue(option.id.toString())
                      void setPage(null)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        queryValue?.toString() === option.id?.toString() ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {queryValue && (
        <div
          onClick={(e) => {
            e.stopPropagation()
            void setQueryValue(null)
            void setPage(null)
          }}
          className={CLEAR_BUTTON_STYLE}
        >
          <X size={14} />
        </div>
      )}
    </div>
  )
}

interface ColumnFilterInputProps<TData, TValue> {
  column: ColumnDef<TData, TValue>
}

export const ColumnFilterInput = <TData, TValue>({ column }: ColumnFilterInputProps<TData, TValue>) => {
  const filterParams = (column.meta as any)?.filter

  if (!filterParams?.key) return null

  const { key: filterKey, type: filterType = 'search' } = filterParams

  if (filterType === 'date-range') {
    return (
      <Suspense fallback={<DateFilterFallback />}>
        <DateRangeFilter filterKey={filterKey} filterParams={filterParams} />
      </Suspense>
    )
  }

  if (filterType === 'select') {
    return <SelectFilter filterKey={filterKey} filterParams={filterParams} />
  }

  if (filterType === 'date') {
    return (
      <Suspense fallback={<DateFilterFallback />}>
        <DateFilter filterKey={filterKey} filterParams={filterParams} />
      </Suspense>
    )
  }

  return <SearchNumberFilter filterKey={filterKey} filterParams={filterParams} />
}
