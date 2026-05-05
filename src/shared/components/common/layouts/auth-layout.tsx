import 'react-lazy-load-image-component/src/effects/blur.css'

import logoImg from '@topcoder/assets/images/logo.png'
import { ContentLoader } from '@topcoder/components/common'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  const { t } = useTranslation('auth')

  return (
    <div className="flex h-screen w-full flex-col lg:flex-row">
      <div className="scrollbar-hidden hidden h-full w-1/2 flex-col items-center justify-center overflow-y-auto bg-teal px-8 lg:flex">
        <div className="flex flex-col items-center justify-center space-y-12">
          <h4 className="max-w-xl text-center text-2xl font-semibold text-teal-foreground">{t('committee_name')}</h4>

          <div className="relative size-72 overflow-hidden rounded-full shadow-2xl">
            <LazyLoadImage
              alt={t('logo_alt')}
              src={logoImg}
              effect="blur"
              wrapperClassName="size-full"
              className="size-full object-cover"
              width="100%"
              height="100%"
            />
          </div>

          <div className="text-center text-teal-foreground">
            <h6 className="text-xl opacity-90">{t('system_type')}</h6>
          </div>
        </div>
      </div>

      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto bg-background px-6 py-12 lg:w-1/2 lg:px-12">
        <div className="mb-10 flex flex-col items-center justify-center space-y-4 lg:hidden">
          <div className="size-24 overflow-hidden rounded-full shadow-lg">
            <img src={logoImg} alt="Logo" className="size-full object-cover" />
          </div>
        </div>

        <div className="w-full max-w-sm">
          <Suspense fallback={<ContentLoader opacity={30} />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
