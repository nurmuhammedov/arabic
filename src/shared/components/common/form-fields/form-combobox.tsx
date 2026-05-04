import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@topcoder/components'
import { cn } from '@topcoder/lib'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { useState } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface Option {
  id: string | number | boolean
  name: string
}

interface FormComboboxProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  placeholder?: string
  noResultText?: string
  options: Option[]
  disabled?: boolean
  required?: boolean
  showError?: boolean
  isClearable?: boolean
  inputClassName?: string
  className?: string
  onValueChange?: (value: string | null) => void
}

export function FormCombobox<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'choose',
  noResultText = 'noting_found',
  options,
  disabled,
  required,
  showError = true,
  isClearable = false,
  inputClassName,
  className,
  onValueChange,
}: FormComboboxProps<T>) {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation(['labels', 'form'])

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {t(label)}
              {required && <span className="ml-1 text-destructive">*</span>}
            </FormLabel>
          )}
          <Popover modal={true} open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="ghost"
                  role="combobox"
                  aria-expanded={open}
                  disabled={disabled}
                  className={cn(
                    'shadow-xs flex h-auto min-h-9 w-full min-w-[180px] select-none items-center justify-between rounded-md border border-input bg-white px-3 py-1 text-base font-normal transition-colors hover:bg-white hover:text-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    !field.value && 'text-muted-foreground',
                    error && 'border-destructive focus:ring-destructive',
                    inputClassName
                  )}
                >
                  <span className="whitespace-normal break-words text-left">
                    {field.value
                      ? options.find((option) => String(option.id) === String(field.value))?.name
                      : t(placeholder, { ns: 'form' })}
                  </span>

                  <div className="ml-2 flex items-center gap-2">
                    {isClearable && field.value && !disabled && (
                      <div
                        role="button"
                        className="z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm opacity-60 hover:bg-muted hover:opacity-100"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          field.onChange(null)
                          onValueChange?.(null)
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        <X className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                  </div>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
              <Command>
                <CommandInput placeholder={t('search', { ns: 'form' })} />
                <CommandList>
                  <CommandEmpty>{t(noResultText, { ns: 'form' })}</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        value={option.name}
                        key={String(option.id)}
                        onSelect={() => {
                          const val = String(option.id)
                          field.onChange(val)
                          onValueChange?.(val)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            String(option.id) === String(field.value) ? 'opacity-100' : 'opacity-0'
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
          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
