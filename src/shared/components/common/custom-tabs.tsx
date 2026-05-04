import { Badge, Tabs, TabsList, TabsTrigger } from '@topcoder/components/ui'
import { cn } from '@topcoder/lib'
import { parseAsString, useQueryState } from 'nuqs'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

interface TabItem {
  id: string | number
  name: string
  count?: number | null
}

interface CustomTabsProps {
  tabs: TabItem[]
  children?: React.ReactNode
  right?: React.ReactNode
  classNameWrapper?: string
  defaultValue?: string | number
  queryName?: string
  showOnlyActiveTabCount?: boolean
  activeTabCount?: number | null
  fullWidth?: boolean
}

export function CustomTabs({
  tabs,
  children,
  right,
  classNameWrapper,
  defaultValue,
  queryName = 'tab',
  showOnlyActiveTabCount = false,
  activeTabCount,
  fullWidth = false,
}: CustomTabsProps) {
  const firstTabId = tabs[0]?.id?.toString()
  const { t } = useTranslation('options')
  const [currentTab, setCurrentTab] = useQueryState(
    queryName,
    parseAsString.withDefault(defaultValue?.toString() ?? firstTabId ?? '')
  )

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
      <div className="flex select-none flex-wrap items-center justify-between gap-2">
        <div
          className={cn(
            'scrollbar-hidden flex overflow-x-auto overflow-y-hidden',
            fullWidth && 'w-full',
            classNameWrapper
          )}
        >
          <TabsList className={cn(fullWidth && 'w-full')}>
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id.toString()
              let badgeContent: React.ReactNode = null

              if (showOnlyActiveTabCount) {
                if (isActive) {
                  badgeContent = activeTabCount ?? 0
                }
              } else {
                if (tab.count !== undefined && tab.count !== null) {
                  badgeContent = tab.count
                }
              }

              return (
                <TabsTrigger key={tab.id} value={tab.id.toString()} className={cn(fullWidth && 'flex-1')}>
                  {t(tab.name)}
                  {badgeContent !== null && (
                    <Badge variant="destructive" className="ml-2 px-1.5 py-0">
                      {badgeContent}
                    </Badge>
                  )}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
        {right && <div>{right}</div>}
      </div>
      {children ? children : null}
    </Tabs>
  )
}
