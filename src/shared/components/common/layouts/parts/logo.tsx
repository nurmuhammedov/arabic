import logoImg from '@topcoder/assets/images/logo.png'
import { useSidebar } from '@topcoder/components'
import { cn } from '@topcoder/lib'
import { useTranslation } from 'react-i18next'

export function Logo() {
  const { state } = useSidebar()
  const { t } = useTranslation('common')

  const sidebarOpen = state === 'expanded'

  return (
    <div className="flex flex-row items-center gap-x-3 overflow-hidden py-2">
      <div className="relative size-8 min-w-8 shrink-0 overflow-hidden rounded-full">
        <img alt="" src={logoImg} width={32} height={32} decoding="async" className="size-full object-cover" />
      </div>
      <div
        className={cn('flex flex-col opacity-100 transition-opacity duration-300', {
          'hidden w-0 opacity-0': !sidebarOpen,
        })}
      >
        <h6 className="text-sm font-normal leading-tight text-white">{t('app_name')}</h6>
      </div>
    </div>
  )
}
