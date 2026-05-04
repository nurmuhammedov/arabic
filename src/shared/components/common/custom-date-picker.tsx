import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@topcoder/components'
import { cn } from '@topcoder/lib'
import { format, isValid, parse } from 'date-fns'
import { enGB, uz, uzCyrl } from 'date-fns/locale'
import { CalendarIcon, X } from 'lucide-react'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface CustomDatePickerProps {
  value?: string | null | undefined
  onChange: (date: string | null) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  error?: boolean
  disableStrategy?: 'after' | 'before' | 'none'
  disableDate?: Date
  isClearable?: boolean
}

export function CustomDatePicker({
  value,
  onChange,
  placeholder = 'choose_date',
  disabled,
  className,
  error,
  disableStrategy = 'none',
  disableDate = new Date(),
  isClearable = false,
}: CustomDatePickerProps) {
  const { t, i18n } = useTranslation('form')
  const [open, setOpen] = React.useState(false)
  const locale = i18n.language === 'uz' ? uz : i18n.language === 'uzb' ? uzCyrl : enGB

  const dateValue = useMemo(() => {
    if (!value) return undefined
    const parsed = parse(value?.toString(), 'yyyy-MM-dd', new Date())
    return isValid(parsed) ? parsed : undefined
  }, [value])

  const disabledDays = useMemo(() => {
    switch (disableStrategy) {
      case 'after':
        return { after: disableDate }
      case 'before':
        return { before: disableDate }
      default:
        return undefined
    }
  }, [disableStrategy, disableDate])

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onChange(null)
  }

  const onSelect = (date: Date | undefined) => {
    if (date) {
      onChange(format(date, 'yyyy-MM-dd'))
    } else {
      onChange(null)
    }
    setOpen(false)
  }

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          disabled={disabled}
          className={cn(
            'shadow-xs flex h-9 w-full min-w-[180px] select-none items-center justify-between rounded-md border border-input bg-white px-3 py-1 text-base font-normal transition-colors hover:bg-white hover:text-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            !dateValue && 'text-muted-foreground',
            error && 'border-destructive focus:ring-destructive',
            className
          )}
        >
          <span className="truncate">{dateValue ? format(dateValue, 'dd.MM.yyyy', { locale }) : t(placeholder)}</span>
          <div className="flex items-center gap-2">
            {isClearable && dateValue && !disabled && (
              <div
                role="button"
                className="z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm opacity-60 hover:bg-muted hover:opacity-100"
                onClick={handleClear}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <X className="h-3.5 w-3.5" />
              </div>
            )}
            <CalendarIcon className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar locale={locale} mode="single" selected={dateValue} onSelect={onSelect} disabled={disabledDays} />
      </PopoverContent>
    </Popover>
  )
}
