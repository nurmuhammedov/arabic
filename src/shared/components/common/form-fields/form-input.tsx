import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@topcoder/components'
import { cn } from '@topcoder/lib'
import * as React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface FormInputProps<T extends FieldValues> extends Omit<React.ComponentProps<typeof Input>, 'name' | 'className'> {
  control: Control<T>
  name: Path<T>
  label?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  showError?: boolean
  required?: boolean
  className?: string
  inputClassName?: string
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  icon,
  iconPosition = 'left',
  showError = true,
  required,
  className,
  inputClassName,
  placeholder = 'enter',
  ...props
}: FormInputProps<T>) {
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
                <div className="text-muted-foregroun absolute left-3 top-1/2 -translate-y-1/2 [&>svg]:h-4 [&>svg]:w-4">
                  {icon}
                </div>
              )}
              <Input
                className={cn(
                  icon && iconPosition === 'left' && 'pl-10',
                  icon && iconPosition === 'right' && 'pr-10',
                  error && 'border-destructive focus-visible:ring-destructive',
                  inputClassName
                )}
                {...field}
                {...props}
                placeholder={t(placeholder, { ns: 'form' })}
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
