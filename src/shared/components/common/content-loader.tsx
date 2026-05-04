import { cn } from '@topcoder/lib'
import { Loader2 } from 'lucide-react'
import React from 'react'

interface ContentLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
  opacity?: number
}

export const ContentLoader = ({ className, isLoading = true, opacity = 0, ...props }: ContentLoaderProps) => {
  if (!isLoading) return null

  return (
    <div
      className={cn(
        'absolute inset-0 z-[9] flex h-full w-full items-center justify-center backdrop-blur-xl',
        className
      )}
      style={{ backgroundColor: `hsl(var(--background) / ${opacity / 100})` }}
      {...props}
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    </div>
  )
}
