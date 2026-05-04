import { cn } from '@topcoder/lib'
// import { Loader2 } from 'lucide-react'
import React from 'react'

interface FullPageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
  opacity?: number
  text?: string
}

export const FullPageLoader = ({ className, isLoading = true, opacity = 90, text, ...props }: FullPageLoaderProps) => {
  if (!isLoading) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[500] flex h-screen w-screen items-center justify-center backdrop-blur-xl',
        className
      )}
      style={{ backgroundColor: `hsl(var(--background) / ${opacity / 100})` }}
      {...props}
    >
      <div className="flex flex-col items-center gap-4">
        {/*<Loader2 className="h-12 w-12 animate-spin text-primary" />*/}
        {text && <p className="text-lg font-medium text-primary">{text}</p>}
      </div>
    </div>
  )
}
