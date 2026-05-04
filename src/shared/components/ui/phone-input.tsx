import { Input } from '@topcoder/components'
import { cn } from '@topcoder/lib'
import * as React from 'react'

interface PhoneInputProps extends Omit<React.ComponentProps<'input'>, 'onChange' | 'value'> {
  value?: string | null
  onChange?: (value: string) => void
  error?: boolean
  className?: string
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value, onChange, error, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState('+998 ')

    const formatToDisplay = React.useCallback((val: string | null | undefined) => {
      if (!val) return '+998 '

      let digits = val.replace(/\D/g, '')

      if (!digits.startsWith('998')) {
        if (digits.length === 9) {
          digits = '998' + digits
        } else {
          digits = '998' + digits.replace(/^998/, '')
        }
      }

      digits = digits.slice(0, 12)

      let result = '+998 '
      if (digits.length > 3) result += digits.slice(3, 5)
      if (digits.length > 5) result += ' ' + digits.slice(5, 8)
      if (digits.length > 8) result += ' ' + digits.slice(8, 10)
      if (digits.length > 10) result += ' ' + digits.slice(10, 12)

      return result
    }, [])

    React.useEffect(() => {
      setDisplayValue(formatToDisplay(value))
    }, [value, formatToDisplay])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      let digits = inputValue.replace(/\D/g, '')

      if (!digits.startsWith('998')) {
        digits = '998' + digits
      }

      digits = digits.slice(0, 12)

      const newDisplay = formatToDisplay(digits)
      setDisplayValue(newDisplay)

      if (onChange) {
        onChange('+' + digits)
      }
    }

    return (
      <Input
        ref={ref}
        type="tel"
        className={cn(error && 'border-destructive focus-visible:ring-destructive', className)}
        value={displayValue}
        onChange={handleChange}
        maxLength={17}
        {...props}
      />
    )
  }
)
PhoneInput.displayName = 'PhoneInput'

export { PhoneInput }
