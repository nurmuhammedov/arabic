import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@topcoder/components'
import { cn } from '@topcoder/lib'
import { X } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Option {
  id: string | number | boolean
  name: string
}

interface CustomSelectProps {
  options: Option[]
  value?: string | number | boolean | null
  onChange: (value: string | null) => void
  placeholder?: string
  isClearable?: boolean
  disabled?: boolean
  className?: string
  error?: boolean
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'choose',
  isClearable = false,
  disabled,
  className,
  error,
}: CustomSelectProps) {
  const { t } = useTranslation(['form', 'options'])

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onChange(null)
  }

  const selectValue = value !== null && value !== undefined ? String(value) : ''

  return (
    <Select
      value={selectValue}
      onValueChange={(val) => {
        const selected = options.find((o) => String(o.id) === val)
        if (selected) {
          onChange(String(selected.id))
        }
      }}
      disabled={disabled}
    >
      <SelectTrigger
        className={cn(
          'shadow-xs flex h-auto min-h-9 w-full min-w-[180px] select-none items-center justify-between rounded-md border border-input bg-white px-3 py-1 text-base transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground md:text-sm',
          error && 'border-destructive focus:ring-destructive',
          className
        )}
      >
        <div className="flex w-full items-center justify-between gap-2 pr-2">
          <span className="whitespace-normal break-words text-left">
            <SelectValue placeholder={t(placeholder)} />
          </span>
          {isClearable && selectValue !== '' && !disabled && (
            <div
              role="button"
              className="z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm opacity-60 hover:bg-muted hover:opacity-100"
              onClick={handleClear}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <X className="h-3.5 w-3.5" />
            </div>
          )}
        </div>
      </SelectTrigger>
      <SelectContent className="w-[var(--radix-select-trigger-width)]">
        {options.map((option) => (
          <SelectItem key={String(option.id)} value={String(option.id)}>
            {t(option.name, { ns: 'options' })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
