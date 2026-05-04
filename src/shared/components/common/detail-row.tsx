import { cn } from '@topcoder/lib'
import React, { ReactNode } from 'react'

interface DetailRowProps {
  title: string
  value: ReactNode | string | null
  boldTitle?: boolean
  className?: string
  showColon?: boolean
}

const DetailRow: React.FC<DetailRowProps> = ({ title, value, boldTitle = false, showColon = true, className }) => {
  if (value === null || value === undefined || value === '') {
    return null
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-1 rounded-md px-3 py-2 transition-colors odd:bg-neutral-100 md:grid md:grid-cols-2 md:items-start md:gap-4',
        className
      )}
    >
      <span className={cn('text-sm', boldTitle ? 'font-semibold text-gray-800' : 'font-medium text-gray-500')}>
        {title}
        {showColon && ':'}
      </span>
      <div className="break-words text-sm font-medium text-gray-900 md:text-[15px]">{value}</div>
    </div>
  )
}

export default DetailRow
