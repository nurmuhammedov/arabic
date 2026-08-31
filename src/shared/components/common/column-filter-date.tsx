import { Calendar } from '@topcoder/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@topcoder/components/ui/popover'
import { cn } from '@topcoder/lib'
import { format, parseISO } from 'date-fns'
import { SearchIcon, X } from 'lucide-react'
import { parseAsInteger, parseAsString, useQueryState, useQueryStates } from 'nuqs'
import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'

import { CLEAR_BUTTON_STYLE, type FilterSubProps, ICON_STYLE, TRIGGER_CONTENT_STYLE, WRAPPER_STYLE } from './column-filter-shared'

export const DateFilter = ({ filterKey }: FilterSubProps) => {
  const [queryValue, setQueryValue] = useQueryState(filterKey, parseAsString.withDefault(''))
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
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
              void setPage(null)
            }}
          />
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

export const DateRangeFilter = ({ filterParams }: FilterSubProps) => {
  const { rangeKeys: filterRangeKeys = ['startDate', 'endDate'] } = filterParams

  const [dates, setDates] = useQueryStates({
    [filterRangeKeys[0]]: parseAsString.withDefault(''),
    [filterRangeKeys[1]]: parseAsString.withDefault(''),
  })
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

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
      void setPage(null)
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

