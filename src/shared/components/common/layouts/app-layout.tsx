import { ContentLoader, ErrorBoundary, SidebarInset, SidebarProvider } from '@topcoder/components'
import { FullPageLoader } from '@topcoder/components/common/full-page-loader'
import { useTypedSelector } from '@topcoder/hooks'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import { AppSidebar } from './parts/app-sidebar'
import { Header } from './parts/header'

export const AppLayout = () => {
  const { t } = useTranslation(['common', 'errors', 'sidebar', 'form', 'labels', 'options'])
  const { isLoading } = useTypedSelector((state) => state.auth)

  if (isLoading) {
    return <FullPageLoader text={t('loading_user_data')} />
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex h-svh flex-col overflow-hidden bg-background">
        <Header />
        <main className="relative flex-1 overflow-auto px-3 pb-3 pt-4">
          <ErrorBoundary>
            <Suspense fallback={<ContentLoader opacity={30} />}>
              <div className="mx-auto flex h-full w-full max-w-5xl flex-1 flex-col">
                <Outlet />
              </div>
            </Suspense>
          </ErrorBoundary>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
