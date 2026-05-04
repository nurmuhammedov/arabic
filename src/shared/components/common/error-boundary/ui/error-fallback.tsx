import { ServerDownIcon } from '@topcoder/assets'
import { Button } from '@topcoder/components'
import { RefreshCw } from 'lucide-react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { ErrorAction, ErrorFallbackProps } from '../types'

export const ErrorFallback = memo(({ reloadPage }: ErrorFallbackProps) => {
  const { t } = useTranslation('errors')

  const actions: ErrorAction[] = [
    {
      label: t('reload_page'),
      icon: RefreshCw,
      action: reloadPage,
      variant: 'default',
    },
  ]

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-background p-6 text-foreground">
      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        <div className="mb-10 flex w-full max-w-[350px] justify-center px-4">
          <ServerDownIcon className="h-auto w-full" />
        </div>
        <h2 className="font-golos-text mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t('unexpected_error_occurred')}
        </h2>
        <p className="mb-5 text-base text-muted-foreground">{t('please_try_refreshing_page')}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              variant={action.variant}
              className="h-11 min-w-[160px] gap-2 sm:w-auto"
            >
              <action.icon className="h-5 w-5" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
})

ErrorFallback.displayName = 'ErrorFallback'
