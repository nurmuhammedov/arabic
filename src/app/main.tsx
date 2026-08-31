import '@topcoder/i18n'
import '@topcoder/styles/global.css'
import '@topcoder/config/zod'

import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary, Router, Toaster } from '@topcoder/components'
import { AppContextProvider } from '@topcoder/contexts'
import { queryClient } from '@topcoder/providers'
import { store } from '@topcoder/store'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() => import('@tanstack/react-query-devtools').then((m) => ({ default: m.ReactQueryDevtools })))
  : null

registerSW({ immediate: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NuqsAdapter>
            <ErrorBoundary>
              <AppContextProvider>
                <Toaster />
                <Router />
              </AppContextProvider>
            </ErrorBoundary>
          </NuqsAdapter>
        </BrowserRouter>
        {ReactQueryDevtools && (
          <Suspense fallback={null}>
            <ReactQueryDevtools initialIsOpen={false} />
          </Suspense>
        )}
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)
