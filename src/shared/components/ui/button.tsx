import { Slot } from '@radix-ui/react-slot'
import { cn } from '@topcoder/lib'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'
import { Fragment } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        success: 'bg-[#56ba28] text-white shadow-sm hover:bg-[#56ba28]/90',
        successOutline:
          'border border-[#56ba28] bg-background text-[#56ba28] shadow-xs hover:bg-[#56ba28] hover:text-white',
        destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
        destructiveOutline:
          'bg-background border border-destructive text-destructive shadow-xs hover:bg-destructive/90 hover:text-white',
        outline: 'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        info: 'border border-primary/20 bg-primary/10 text-primary shadow-xs hover:bg-primary/20',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'size-8 2xl:size-9',
        iconSm: 'size-6 2xl:size-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn('cursor-pointer', buttonVariants({ variant, size, className }), {
          'cursor-not-allowed opacity-50': loading,
        })}
        ref={ref}
        aria-live="polite"
        aria-busy={loading}
        disabled={props.disabled || loading}
        {...props}
      >
        <Fragment>
          {loading && <Loader2 className="size-4 animate-spin" />}
          {children}
        </Fragment>
      </Comp>
    )
  }
)
Button.displayName = 'Button'

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
