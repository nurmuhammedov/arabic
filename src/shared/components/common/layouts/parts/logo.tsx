import 'react-lazy-load-image-component/src/effects/blur.css'

import logoImg from '@topcoder/assets/images/logo.png'
import { useSidebar } from '@topcoder/components'
import { cn } from '@topcoder/lib'
import { useTranslation } from 'react-i18next'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export function Logo() {
  const { state } = useSidebar()
  const { t } = useTranslation('common')

  const sidebarOpen = state === 'expanded'

  return (
    <div className="flex flex-row items-center gap-x-3 overflow-hidden py-2">
      <div className="relative size-8 min-w-8">
        <LazyLoadImage alt="Logo" src={logoImg} effect="blur" className="size-full object-contain" />
      </div>
      <div
        className={cn('flex flex-col opacity-100 transition-opacity duration-300', {
          'hidden w-0 opacity-0': !sidebarOpen,
        })}
      >
        <h6 className="text-xs font-medium leading-tight text-white">{t('committee_name')}</h6>
      </div>
    </div>
  )
}
