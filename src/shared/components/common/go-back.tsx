import { useTypedSelector } from '@topcoder/hooks'
import { routeByRole } from '@topcoder/lib'
import { ArrowLeft } from 'lucide-react'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface GoBackProps {
  title?: string
  fallbackPath?: string
}

const GoBack: React.FC<GoBackProps> = memo(({ title = '', fallbackPath }) => {
  const navigate = useNavigate()
  const { t } = useTranslation('common')
  const { user } = useTypedSelector((state) => state.auth)

  const handleGoBack = () => {
    if (window.history.state && window.history.length > 2) {
      navigate(-1)
    } else {
      navigate(fallbackPath || routeByRole(user))
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="back"
        onClick={handleGoBack}
        className="flex items-center rounded p-1.5 transition-colors duration-150 hover:bg-neutral-200"
      >
        <ArrowLeft className="size-5" />
      </button>
      {title && <h1 className="truncate text-lg font-semibold text-neutral-850">{t(title)}</h1>}
    </div>
  )
})

export { GoBack }
