import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@topcoder/components'
import { NAVIGATIONS } from '@topcoder/config'
import { UserRole } from '@topcoder/constants'
import { useTypedSelector } from '@topcoder/hooks'
import { useTranslation } from 'react-i18next'

import { Logo } from './logo'
import { NavItem } from './nav-item'

export function AppSidebar() {
  const { user } = useTypedSelector((state) => state.auth)
  const { t } = useTranslation(['sidebar'])

  if (!user) return null

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarGroup className="border-b p-0">
          <Logo />
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        {(() => {
          const rolePriority: UserRole[] = [
            UserRole.ADMIN,
            UserRole.CHAIRMAN,
            UserRole.MANAGER,
            UserRole.CONTROLLER,
            UserRole.INSTALLER,
            UserRole.SUPPLIER,
            UserRole.MANUFACTURER,
            UserRole.EMPLOYEE,
          ]

          const sortedRoles = [...user.roles].sort((a, b) => {
            return rolePriority.indexOf(a) - rolePriority.indexOf(b)
          })

          const raw = sortedRoles.flatMap((role: UserRole) => {
            let sections = NAVIGATIONS[role] || []
            if (role === UserRole.EMPLOYEE && user.permissions) {
              const permissions = user.permissions
              sections = sections
                .map((section) => ({
                  ...section,
                  items: section.items.filter((item) => {
                    if (item.url.includes('process')) return permissions.includes('INSTALL')
                    if (item.url.includes('quality-control')) return permissions.includes('QUALITY_CONTROL')
                    if (item.url.includes('testing')) return permissions.includes('TEST')
                    return false
                  }),
                }))
                .filter((section) => section.items.length > 0)
            }
            return sections
          })

          const merged: typeof raw = []
          for (const section of raw) {
            const existing = merged.find((s) => s.title === section.title)
            if (existing) {
              for (const item of section.items) {
                if (!existing.items.find((i) => i.title === item.title)) {
                  existing.items.push(item)
                }
              }
            } else {
              merged.push({ ...section, items: [...section.items] })
            }
          }

          return merged.map((section) => (
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
          ))
        })()}
      </SidebarContent>
    </Sidebar>
  )
}
