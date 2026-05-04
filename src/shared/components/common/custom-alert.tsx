import { cn } from '@topcoder/lib'
import { CircleCheck, CircleX, TriangleAlert } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface AlertToastProps {
  title: string
  visible: boolean
  type?: 'success' | 'error' | 'alert'
  onClose?: () => void
}

export const CustomAlert: React.FC<AlertToastProps> = ({ title, type = 'success', onClose, visible }) => {
  const { t } = useTranslation()

  return (
    <div
      onClick={onClose}
      className={cn(
        'pointer-events-auto relative flex w-fit max-w-[25rem] cursor-pointer select-none items-center gap-2 rounded-lg bg-white p-3 shadow-lg transition-all',
        visible
          ? 'duration-400 ease-in-out animate-in fade-in slide-in-from-top-[10px]'
          : 'scale-0 opacity-0 duration-200 ease-in'
      )}
    >
      <div
        className={cn(
          'absolute left-0 top-1/2 h-[calc(100%-1rem)] w-1 -translate-y-1/2 rounded-r-lg',
          type === 'success' && 'bg-[#18BA92]',
          type === 'error' && 'bg-[#b3261e]',
          type === 'alert' && 'bg-[#F7630C]'
        )}
      />
      <div
        className={cn(
          'shrink-0',
          type === 'success' && 'text-[#18BA92]',
          type === 'error' && 'text-[#b3261e]',
          type === 'alert' && 'text-[#F7630C]'
        )}
      >
        {type === 'success' && <CircleCheck className="h-5 w-5" />}
        {type === 'error' && <CircleX className="h-5 w-5" />}
        {type === 'alert' && <TriangleAlert className="h-5 w-5" />}
      </div>
      {title && (
        <div
          className={cn(
            'font-golos text-base font-normal leading-[112%]',
            'min-w-0 flex-1 break-all',
            type === 'success' && 'text-[#18BA92]',
            type === 'error' && 'text-[#b3261e]',
            type === 'alert' && 'text-[#F7630C]'
          )}
        >
          {t(title)}
        </div>
      )}
    </div>
  )
}
