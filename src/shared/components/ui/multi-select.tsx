import {
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
import { Check, ChevronDown, X } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export type MultiSelectOption = {
  id: string | number
  name: string
  disabled?: boolean
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: (string | number)[] | string | null
  onChange?: (value: string[]) => void
  className?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  maxDisplayItems?: number
  disabled?: boolean
  isClearable?: boolean
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      value,
      onChange,
      className,
      placeholder = 'choose',
      searchPlaceholder = 'search',
      emptyText = 'noting_found',
      maxDisplayItems = 3,
      disabled,
      isClearable = false,
    },
    ref
  ) => {
    const { t } = useTranslation('form')
    const [open, setOpen] = React.useState(false)

    const safeValue = React.useMemo(() => {
      if (!value || value === '') return []
      if (Array.isArray(value)) return value.map(String)
      return []
    }, [value])

    const handleSelect = (optionId: string | number) => {
      if (!onChange) return
      const strId = String(optionId)
      const newValue = safeValue.includes(strId) ? safeValue.filter((id) => id !== strId) : [...safeValue, strId]
      onChange(newValue)
    }

    const handleRemove = (e: React.MouseEvent, optionId: string | number) => {
      e.stopPropagation()
      if (!onChange) return
      const strId = String(optionId)
      onChange(safeValue.filter((id) => id !== strId))
    }

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!onChange) return
      onChange([])
    }

    const selectedOptions = options.filter((option) => safeValue.includes(String(option.id)))

    return (
      <Popover modal={true} open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            disabled={disabled}
            role="combobox"
            aria-expanded={open}
            className={cn(
              'shadow-xs flex h-auto min-h-9 w-full min-w-[180px] select-none items-center justify-between rounded-md border border-input bg-white px-3 py-1 text-base transition-colors',
              'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              'md:text-sm',
              className
            )}
          >
            <div className="mr-2 flex flex-1 flex-wrap items-center gap-1.5 text-left">
              {selectedOptions.length > 0 ? (
                <>
                  {selectedOptions.slice(0, maxDisplayItems).map((option) => (
                    <div
                      key={String(option.id)}
                      className="flex items-center gap-1 rounded-sm border border-neutral-200 bg-background px-1.5 py-0.5 text-xs font-medium text-foreground"
                    >
                      {option.name}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handleRemove(e, option.id)}
                        className="ml-0.5 cursor-pointer rounded-sm text-foreground hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </div>
                    </div>
                  ))}

                  {selectedOptions.length > maxDisplayItems && (
                    <span className="rounded-sm border border-neutral-200 bg-background px-1.5 py-0.5 text-xs text-foreground">
                      +{selectedOptions.length - maxDisplayItems} ta
                    </span>
                  )}
                </>
              ) : (
                <span className="text-muted-foreground">{t(placeholder)}</span>
              )}
            </div>

            <div className="ml-2 flex items-center gap-2">
              {isClearable && selectedOptions.length > 0 && !disabled && (
                <div
                  role="button"
                  className="z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm opacity-60 hover:bg-muted hover:opacity-100"
                  onClick={handleClearAll}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <X className="h-3.5 w-3.5" />
                </div>
              )}
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent className="z-[60] w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder={t(searchPlaceholder)} />
            <CommandList>
              <CommandEmpty>{t(emptyText)}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = safeValue.includes(String(option.id))
                  return (
                    <CommandItem key={String(option.id)} value={option.name} onSelect={() => handleSelect(option.id)}>
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary',
                          isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <Check className={cn('h-3 w-3')} />
                      </div>
                      {option.name}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

MultiSelect.displayName = 'MultiSelect'

export { MultiSelect }
