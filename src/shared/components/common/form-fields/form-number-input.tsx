import { FormControl, FormField, FormItem, FormLabel, FormMessage, NumberInput } from '@topcoder/components'
import { cn } from '@topcoder/lib'
import { ComponentProps, ReactNode } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface FormNumberInputProps<T extends FieldValues> extends ComponentProps<typeof NumberInput> {
  control: UseFormReturn<T>['control']
  name: Path<T>
  label?: string
  showError?: boolean
  required?: boolean
  inputClassName?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

export function FormNumberInput<T extends FieldValues>({
  control,
  name,
  label,
  showError = true,
  required,
  className,
  inputClassName,
  icon,
  iconPosition = 'left',
  placeholder = 'enter',
  ...props
}: FormNumberInputProps<T>) {
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
            <div className="relative">
              {icon && iconPosition === 'left' && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&>svg]:h-4 [&>svg]:w-4">
                  {icon}
                </div>
              )}
              <NumberInput
                {...field}
                {...props}
                value={field.value}
                onValueChange={field.onChange}
                placeholder={t(placeholder, { ns: 'form' })}
                className={cn(
                  icon && iconPosition === 'left' && 'pl-10',
                  icon && iconPosition === 'right' && 'pr-10',
                  error && 'border-destructive focus-visible:ring-destructive',
                  inputClassName
                )}
              />
              {icon && iconPosition === 'right' && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground [&>svg]:h-4 [&>svg]:w-4">
                  {icon}
                </div>
              )}
            </div>
          </FormControl>
          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
