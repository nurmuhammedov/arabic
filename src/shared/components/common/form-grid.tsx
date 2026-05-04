import { cn } from '@topcoder/lib'
import React, { memo } from 'react'

interface FormGridProps {
  children: React.ReactNode
  className?: string
}

const FormGrid: React.FC<FormGridProps> = memo(({ children, className }) => {
  return (
    <div
      className={cn(
        '3xl:grid-cols-5 4xl:grid-cols-6 5xl:grid-cols-7 6xl:grid-cols-8 7xl:grid-cols-9 8xl:grid-cols-10 grid w-full grid-cols-1 gap-6 rounded-lg border bg-card p-6 shadow-sm lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  )
})

export { FormGrid }
