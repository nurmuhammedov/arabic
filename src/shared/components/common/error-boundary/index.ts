import { createElement, memo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ErrorBoundaryProps } from './types'
import { ErrorBoundaryCore } from './ui/error-boundary-core'

export const ErrorBoundary = memo((props: ErrorBoundaryProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  return createElement(ErrorBoundaryCore, {
    ...props,
    navigate,
    pathname: location.pathname,
  })
})

ErrorBoundary.displayName = 'ErrorBoundary'

export type * from './types'
