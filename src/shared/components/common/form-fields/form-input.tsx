import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@topcoder/components'
import { cn } from '@topcoder/lib'
import * as React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { isLatin, parseArabicText } from 'src/shared/lib/arabic-mapper'

import { CustomAlert } from '../custom-alert'

interface FormInputProps<T extends FieldValues> extends Omit<React.ComponentProps<typeof Input>, 'name' | 'className'> {
  control: Control<T, unknown>
  name: Path<T>
  label?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  showError?: boolean
  required?: boolean
  className?: string
  inputClassName?: string
  isArabic?: boolean
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
  isArabic = false,
  ...props
}: FormInputProps<T>) {
  const { t } = useTranslation(['labels', 'form', 'errors'])
  const [showLatinError, setShowLatinError] = React.useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let value = e.target.value

          if (isArabic) {
            const lastChar = value[value.length - 1]
            if (lastChar && !isLatin(lastChar)) {
              setShowLatinError(true)
              setTimeout(() => setShowLatinError(false), 3000)
              value = value.slice(0, -1)
            }
            value = parseArabicText(value)
          }

          field.onChange(value)
        }

        return (
          <FormItem className={cn('relative', className)}>
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
                  onChange={handleChange}
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

            {isArabic && (
              <div className="absolute -top-12 left-0 z-50">
                <CustomAlert
                  visible={showLatinError}
                  title="only_latin_characters_allowed"
                  type="alert"
                  onClose={() => setShowLatinError(false)}
                />
              </div>
            )}
          </FormItem>
        )
      }}
    />
  )
}
