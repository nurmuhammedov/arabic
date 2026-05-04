import { FileInput, FileInputProps, FormField, FormItem, FormLabel, FormMessage } from '@topcoder/components'
import { Control, FieldValues, Path } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface FormFileInputProps<T extends FieldValues> extends Omit<FileInputProps, 'name' | 'value' | 'onChange'> {
  control: Control<T>
  name: Path<T>
  label?: string
  required?: boolean
  showError?: boolean
}

export function FormFileInput<T extends FieldValues>({
  control,
  name,
  label,
  required,
  showError = true,
  className,
  ...props
}: FormFileInputProps<T>) {
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
          <FileInput name={name} value={field.value} onChange={field.onChange} hasError={!!error} {...props} />
          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
