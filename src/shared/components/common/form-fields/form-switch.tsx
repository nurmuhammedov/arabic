import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@topcoder/components'
import { Switch } from '@topcoder/components/ui'
import { cn } from '@topcoder/lib'
import { Control, FieldValues, Path } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface FormSwitchProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  disabled?: boolean
  className?: string
}

export function FormSwitch<T extends FieldValues>({ control, name, label, disabled, className }: FormSwitchProps<T>) {
  const { t } = useTranslation(['labels'])

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col justify-end', className)}>
          <div className="flex flex-row items-center gap-3">
            {label && <FormLabel className="!mt-0 cursor-pointer">{t(label)}</FormLabel>}
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
