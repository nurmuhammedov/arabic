import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  MultiSelect,
  MultiSelectOption,
} from '@topcoder/components'
import { Control, FieldValues, Path } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface FormMultiSelectProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  options: MultiSelectOption[]
  label?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  required?: boolean
  showError?: boolean
  className?: string
  maxDisplayItems?: number
  isClearable?: boolean
  onValueChange?: (value: string[]) => void
}

export function FormMultiSelect<T extends FieldValues>({
  control,
  name,
  options,
  label,
  placeholder,
  searchPlaceholder,
  emptyText,
  disabled,
  required,
  showError = true,
  className,
  maxDisplayItems,
  isClearable = false,
  onValueChange,
}: FormMultiSelectProps<T>) {
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
          <FormControl>
            <MultiSelect
              options={options}
              value={field.value}
              onChange={(val) => {
                field.onChange(val)
                onValueChange?.(val)
              }}
              disabled={disabled}
              placeholder={placeholder}
              searchPlaceholder={searchPlaceholder}
              emptyText={emptyText}
              maxDisplayItems={maxDisplayItems}
              isClearable={isClearable}
              className={error ? 'border-destructive focus-visible:ring-destructive' : ''}
              ref={field.ref}
            />
          </FormControl>
          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
