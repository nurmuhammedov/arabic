import { Input } from '@topcoder/components/ui/input'
import * as React from 'react'
import { useState } from 'react'

interface NumberInputProps extends Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange'> {
  value?: string | number | null
  onValueChange?: (value: number | null) => void
  maxLength?: number
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onValueChange, maxLength = 30, className, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState(value === undefined || value === null ? '' : String(value))
    const [prevValue, setPrevValue] = useState(value)

    if (value !== prevValue) {
      setPrevValue(value)

      const strVal = value === undefined || value === null ? '' : String(value)
      const parsedDisplay = parseFloat(displayValue)

      const isSameNumber = !Number.isNaN(parsedDisplay) && parsedDisplay === value
      const isFormatting = displayValue.endsWith('.') || displayValue === '-' || displayValue === '-0'

      if (!isSameNumber || !isFormatting) {
        if (displayValue !== strVal) {
          setDisplayValue(strVal)
        }
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value

      if (maxLength && val.length > maxLength) return
      if (!/^-?\d*\.?\d*$/.test(val)) return

      setDisplayValue(val)

      const num = parseFloat(val)
      const newValue = val === '' || val === '-' || Number.isNaN(num) ? null : num

      onValueChange?.(newValue)
    }

    return (
      <Input
        ref={ref}
        className={className}
        autoComplete="off"
        maxLength={maxLength}
        {...props}
        value={displayValue}
        onChange={handleChange}
      />
    )
  }
)

NumberInput.displayName = 'NumberInput'
