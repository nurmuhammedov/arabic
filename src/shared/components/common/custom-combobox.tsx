import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@topcoder/components'
import { cn } from '@topcoder/lib'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Option {
  id: string | number | boolean
  name: string
}

interface CustomComboboxProps {
  options: Option[]
  value?: string | number | boolean | null
  onChange: (value: string | null) => void
  placeholder?: string
  noResultText?: string
  disabled?: boolean
  isClearable?: boolean
  className?: string
  error?: boolean
}

export function CustomCombobox({
  options,
  value,
  onChange,
  placeholder = 'choose',
  noResultText = 'noting_found',
  disabled,
  isClearable = false,
  className,
  error,
}: CustomComboboxProps) {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation(['labels', 'form', 'options'])

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onChange(null)
  }

  const stringValue = value !== null && value !== undefined ? String(value) : ''

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'shadow-xs flex h-auto min-h-9 w-full min-w-[180px] items-center justify-between rounded-md border border-input bg-white px-3 py-1 text-base font-normal transition-colors hover:bg-white hover:text-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            !stringValue && 'text-muted-foreground',
            error && 'border-destructive focus:ring-destructive',
            className
          )}
        >
          <span className="whitespace-normal break-words text-left">
            {stringValue
              ? t(options.find((option) => String(option.id) === stringValue)?.name || '', { ns: 'options' })
              : t(placeholder, { ns: 'form' })}
          </span>

          <div className="ml-2 flex items-center gap-2">
            {isClearable && stringValue !== '' && !disabled && (
              <div
                role="button"
                className="z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm opacity-60 hover:bg-muted hover:opacity-100"
                onClick={handleClear}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <X className="h-3.5 w-3.5" />
              </div>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={t('search', { ns: 'form' })} />
          <CommandList>
            <CommandEmpty>{t(noResultText, { ns: 'form' })}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={String(option.id)}
                  value={t(option.name, { ns: 'options' })}
                  onSelect={() => {
                    onChange(String(option.id))
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', String(option.id) === stringValue ? 'opacity-100' : 'opacity-0')}
                  />
                  {t(option.name, { ns: 'options' })}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
