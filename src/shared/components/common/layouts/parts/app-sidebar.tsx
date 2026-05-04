import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@topcoder/components'
import { NAVIGATIONS } from '@topcoder/config'
import { useTypedSelector } from '@topcoder/hooks'
import { useTranslation } from 'react-i18next'

import { Logo } from './logo'
import { NavItem } from './nav-item'

export function AppSidebar() {
  const { user } = useTypedSelector((state) => state.auth)
  const { t } = useTranslation(['sidebar'])

  if (!user || !user.role) return null

  const menus = NAVIGATIONS[user.role] || []

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarGroup className="border-b p-0">
          <Logo />
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        {menus.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="mb-1 text-base font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              <span className="block w-full truncate" title={t(section.title)}>
                {t(section.title)}
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-1">
              {section.items.map((item) => (
                <NavItem key={item.url} item={item} />
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
