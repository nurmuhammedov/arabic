import { FormControl, FormField, FormItem, FormLabel, FormMessage, PhoneInput } from '@topcoder/components'
import { Control, FieldValues, Path } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface FormPhoneInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  required?: boolean
  showError?: boolean
  className?: string
  disabled?: boolean
  placeholder?: string
}

export function FormPhoneInput<T extends FieldValues>({
  control,
  name,
  label,
  required,
  showError = true,
  className,
  disabled,
  placeholder,
}: FormPhoneInputProps<T>) {
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
            <PhoneInput disabled={disabled} error={!!error} placeholder={placeholder} {...field} />
          </FormControl>
          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
