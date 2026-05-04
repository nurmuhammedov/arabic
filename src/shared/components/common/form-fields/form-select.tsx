import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@topcoder/components'
import { cn } from '@topcoder/lib'
import { X } from 'lucide-react'
import React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface Option {
  id: string | number | boolean
  name: string
}

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  placeholder?: string
  options: Option[]
  disabled?: boolean
  required?: boolean
  showError?: boolean
  inputClassName?: string
  className?: string
  onValueChange?: (value: string | null) => void
  isClearable?: boolean
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'choose',
  options,
  disabled,
  required,
  showError = true,
  inputClassName,
  className,
  onValueChange,
  isClearable = false,
}: FormSelectProps<T>) {
  const { t } = useTranslation(['labels', 'form', 'common'])

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const handleClear = (e: React.MouseEvent) => {
          e.preventDefault()
          e.stopPropagation()
          field.onChange(null)
          if (onValueChange) {
            onValueChange(null)
          }
        }

        const selectValue =
          field.value !== null && field.value !== undefined && field.value !== '' ? String(field.value) : ''

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel>
                {t(label)}
                {required && <span className="ml-1 text-destructive">*</span>}
              </FormLabel>
            )}
            <Select
              disabled={disabled}
              onValueChange={(value) => {
                if (value) {
                  field.onChange(value)
                  onValueChange?.(value)
                }
              }}
              value={selectValue}
            >
              <FormControl>
                <SelectTrigger
                  className={cn(
                    'shadow-xs flex h-auto min-h-9 w-full min-w-[180px] select-none items-center justify-between rounded-md border border-input bg-white px-3 py-1 text-base transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground md:text-sm',
                    error && 'border-destructive focus:ring-destructive',
                    inputClassName
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-2 pr-2">
                    <span className="whitespace-normal break-words text-left">
                      <SelectValue placeholder={t(placeholder, { ns: 'form' })} />
                    </span>
                    {isClearable && selectValue && !disabled && (
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
              </FormControl>
              <SelectContent className="w-[var(--radix-select-trigger-width)]">
                {options.length > 0 ? (
                  options.map((option) => (
                    <SelectItem key={String(option.id)} value={String(option.id)}>
                      {option.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem key="nothing_found" value="nothing_found" disabled={true}>
                    <span>{t('nothing_found', { ns: 'form' })}</span>
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {showError && <FormMessage />}
          </FormItem>
        )
      }}
    />
  )
}
