import { Button, Separator, SidebarTrigger } from '@topcoder/components'
import { ArabicKeyboardModal } from '@topcoder/components/common/arabic-keyboard-modal'
import { NAVIGATIONS } from '@topcoder/config'
import { useTypedSelector } from '@topcoder/hooks'
import { Keyboard } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { LanguageSelector } from './language-selector'
import { UserDropdown } from './user-dropdown'

export function Header() {
  const { t } = useTranslation(['sidebar', 'common'])
  const { pathname } = useLocation()
  const { user } = useTypedSelector((state) => state.auth)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  const findTitle = () => {
    if (!user || !user.role) return ''
    const sections = NAVIGATIONS[user.role] || []

    for (const section of sections) {
      for (const item of section.items) {
        if (item.url === pathname) return item.title
        if (item.items) {
          const subItem = item.items.find((sub) => sub.url === pathname)
          if (subItem) return subItem.title
        }
      }
    }

    for (const section of sections) {
      for (const item of section.items) {
        if (item.items) {
          const subItems = [...item.items].sort((a, b) => b.url.length - a.url.length)
          const subItem = subItems.find((sub) => pathname.startsWith(sub.url))
          if (subItem) return subItem.title
        }
        if (pathname.startsWith(item.url)) return item.title
      }
    }

    return ''
  }

  const title = findTitle()

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 shadow-sm transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {title && <h1 className="text-base font-medium leading-none text-foreground">{t(title)}</h1>}
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={() => setIsKeyboardOpen(true)}
          title={t('arabic_virtual_keyboard', { ns: 'common' })}
        >
          <Keyboard className="h-6 w-6" />
        </Button>
        <LanguageSelector />
        <UserDropdown />
      </div>
      <ArabicKeyboardModal open={isKeyboardOpen} onOpenChange={setIsKeyboardOpen} />
    </header>
  )
}
