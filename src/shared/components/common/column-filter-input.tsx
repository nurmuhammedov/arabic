import { ColumnDef } from '@tanstack/react-table'
import {
  Calendar,
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
import { TypeAny } from '@topcoder/types'
import { format, parseISO } from 'date-fns'
import { Check, SearchIcon, X } from 'lucide-react'
import { parseAsString, useQueryState, useQueryStates } from 'nuqs'
import { useEffect, useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useTranslation } from 'react-i18next'

const ICON_STYLE = 'absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400 size-4 pointer-events-none'
const CLEAR_BUTTON_STYLE =
  'absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer flex items-center justify-center bg-white'
const WRAPPER_STYLE = 'relative w-full border-none bg-white transition-colors h-8'
const TRIGGER_CONTENT_STYLE =
  'w-full h-full flex items-center px-0 pl-8 pr-6 text-sm font-normal text-black bg-transparent outline-none cursor-pointer overflow-hidden'

interface FilterSubProps {
  filterKey: string
  filterParams?: TypeAny
}

const SearchNumberFilter = ({ filterKey, filterParams }: FilterSubProps) => {
  const { type: filterType, maxLength: filterMaxLength = 30 } = filterParams

  const [queryValue, setQueryValue] = useQueryState(filterKey, parseAsString.withDefault(''))

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
      }
    }, 500)

    return () => clearTimeout(handler)
  }, [value, queryValue, setQueryValue])

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
          'bg-white'
        )}
      />
      {value && (
        <div
          onClick={(e) => {
            e.stopPropagation()
            setValue('')
            void setQueryValue(null)
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
          }}
          className={CLEAR_BUTTON_STYLE}
        >
          <X size={14} />
        </div>
      )}
    </div>
  )
}

const DateFilter = ({ filterKey }: FilterSubProps) => {
  const [queryValue, setQueryValue] = useQueryState(filterKey, parseAsString.withDefault(''))
  const dateValue = queryValue ? new Date(queryValue) : undefined

  return (
    <div className={cn(WRAPPER_STYLE, 'group')}>
      <SearchIcon className={ICON_STYLE} />
      <Popover>
        <PopoverTrigger asChild>
          <div className={TRIGGER_CONTENT_STYLE} role="button" tabIndex={0}>
            <span className={cn('truncate text-xs', !dateValue && 'text-neutral-400')}>
              {dateValue ? format(dateValue, 'dd.MM.yyyy') : ''}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={(date) => {
              const formatted = date ? format(date, 'yyyy-MM-dd') : null
              void setQueryValue(formatted)
            }}
          />
        </PopoverContent>
      </Popover>
      {queryValue && (
        <div
          onClick={(e) => {
            e.stopPropagation()
            void setQueryValue(null)
          }}
          className={CLEAR_BUTTON_STYLE}
        >
          <X size={14} />
        </div>
      )}
    </div>
  )
}

const DateRangeFilter = ({ filterParams }: FilterSubProps) => {
  const { rangeKeys: filterRangeKeys = ['startDate', 'endDate'] } = filterParams

  const [dates, setDates] = useQueryStates({
    [filterRangeKeys[0]]: parseAsString.withDefault(''),
    [filterRangeKeys[1]]: parseAsString.withDefault(''),
  })

  const startDateQuery = dates[filterRangeKeys[0]]
  const endDateQuery = dates[filterRangeKeys[1]]

  const [date, setDate] = useState<DateRange | undefined>(() => {
    if (startDateQuery) {
      return {
        from: parseISO(startDateQuery),
        to: endDateQuery ? parseISO(endDateQuery) : undefined,
      }
    }
    return undefined
  })

  const handleDateSelect = (range: DateRange | undefined) => {
    setDate(range)
    if (range?.from) {
      void setDates({
        [filterRangeKeys[0]]: format(range.from, 'yyyy-MM-dd'),
        [filterRangeKeys[1]]: range.to ? format(range.to, 'yyyy-MM-dd') : null,
      })
    } else {
      void setDates({
        [filterRangeKeys[0]]: null,
        [filterRangeKeys[1]]: null,
      })
    }
  }

  const formattedValue = useMemo(() => {
    if (!date?.from) return ''
    if (!date.to) return format(date.from, 'dd.MM.yyyy')
    return `${format(date.from, 'dd.MM.yyyy')} - ${format(date.to, 'dd.MM.yyyy')}`
  }, [date])

  return (
    <div className={WRAPPER_STYLE}>
      <SearchIcon className={ICON_STYLE} />
      <Popover>
        <PopoverTrigger asChild>
          <div className={TRIGGER_CONTENT_STYLE} role="button" tabIndex={0}>
            <span className={cn('truncate text-xs', !date && 'text-neutral-400')}>{formattedValue}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      {date && (
        <div
          onClick={(e) => {
            e.stopPropagation()
            setDate(undefined)
            void setDates({
              [filterRangeKeys[0]]: null,
              [filterRangeKeys[1]]: null,
            })
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
  const filterParams = column.meta?.filter

  if (!filterParams?.key) return null

  const { key: filterKey, type: filterType = 'search' } = filterParams

  if (filterType === 'date-range') {
    return <DateRangeFilter filterKey={filterKey} filterParams={filterParams} />
  }

  if (filterType === 'select') {
    return <SelectFilter filterKey={filterKey} filterParams={filterParams} />
  }

  if (filterType === 'date') {
    return <DateFilter filterKey={filterKey} filterParams={filterParams} />
  }

  return <SearchNumberFilter filterKey={filterKey} filterParams={filterParams} />
}
