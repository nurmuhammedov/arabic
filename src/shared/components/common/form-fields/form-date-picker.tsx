import { CustomDatePicker, FormField, FormItem, FormLabel, FormMessage } from '@topcoder/components'
import { Control, FieldValues, Path } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  showError?: boolean
  className?: string
  disableStrategy?: 'after' | 'before' | 'none'
  disableDate?: Date
  isClearable?: boolean
}

export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'choose_date',
  disabled,
  required,
  showError = true,
  className,
  disableStrategy = 'none',
  disableDate,
  isClearable = false,
}: FormDatePickerProps<T>) {
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
          <CustomDatePicker
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            disabled={disabled}
            error={!!error}
            disableStrategy={disableStrategy}
            disableDate={disableDate}
            isClearable={isClearable}
          />
          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
