import 'react-lazy-load-image-component/src/effects/blur.css'

import logoImg from '@topcoder/assets/images/logo.png'
import { useSidebar } from '@topcoder/components'
import { Button } from '@topcoder/components'
import { cn } from '@topcoder/lib'
import { Keyboard } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { ArabicKeyboardModal } from '../arabic-keyboard-modal'

export function Logo() {
  const { state } = useSidebar()
  const { t } = useTranslation('common')
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  const sidebarOpen = state === 'expanded'

  return (
    <div className="flex w-full flex-row items-center gap-x-2 overflow-hidden py-2">
      <div className="flex flex-1 items-center gap-x-3 overflow-hidden">
        <div className="relative size-8 min-w-8 shrink-0 overflow-hidden rounded-full">
          <LazyLoadImage alt="Logo" src={logoImg} effect="blur" className="size-full object-cover" />
        </div>
        <div
          className={cn('flex flex-col opacity-100 transition-opacity duration-300', {
            'hidden w-0 opacity-0': !sidebarOpen,
          })}
        >
          <h6 className="text-sm font-normal leading-tight text-white">{t('committee_name')}</h6>
        </div>
      </div>

      {sidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="size-8 shrink-0 text-white hover:bg-white/10"
          onClick={() => setIsKeyboardOpen(true)}
          title={t('arabic_virtual_keyboard')}
        >
          <Keyboard className="h-4 w-4" />
        </Button>
      )}

      <ArabicKeyboardModal open={isKeyboardOpen} onOpenChange={setIsKeyboardOpen} />
    </div>
  )
}
