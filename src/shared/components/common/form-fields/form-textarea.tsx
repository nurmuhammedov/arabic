import { FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea } from '@topcoder/components'
import { cn } from '@topcoder/lib'
import * as React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface FormTextareaProps<T extends FieldValues> extends Omit<
  React.ComponentProps<typeof Textarea>,
  'name' | 'className'
> {
  control: Control<T>
  name: Path<T>
  label?: string
  showError?: boolean
  required?: boolean
  className?: string
  textareaClassName?: string
}

export function FormTextarea<T extends FieldValues>({
  control,
  name,
  label,
  showError = true,
  required,
  className,
  textareaClassName,
  placeholder = 'enter',
  rows = 7,
  ...props
}: FormTextareaProps<T>) {
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
            <Textarea
              rows={rows}
              className={cn(
                'resize-y',
                error && 'border-destructive focus-visible:ring-destructive',
                textareaClassName
              )}
              placeholder={t(placeholder, { ns: 'form' })}
              {...field}
              {...props}
            />
          </FormControl>
          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
