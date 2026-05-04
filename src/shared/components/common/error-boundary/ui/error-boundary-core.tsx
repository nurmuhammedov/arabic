import { ErrorBoundaryProps, ErrorBoundaryState, ErrorFallbackProps } from '@topcoder/components'
import { IS_DEV } from '@topcoder/config'
import { Component, ErrorInfo, ReactNode } from 'react'
import { NavigateFunction } from 'react-router-dom'

import { ErrorFallback } from './error-fallback'

interface Props extends ErrorBoundaryProps {
  navigate: NavigateFunction
  pathname: string
}

export class ErrorBoundaryCore extends Component<Props, ErrorBoundaryState> {
  static defaultProps = {
    resetOnRouteChange: true,
  }

  private previousPath: string

  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: undefined }
    this.previousPath = props.pathname
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo })
    this.props.onError?.(error, errorInfo)

    if (IS_DEV) {
      console.log(`%cTopcoder's ErrorBoundary caught an error 🔥`, 'color: red; font-weight: bold; font-size: 16px;')
    }
  }

  componentDidUpdate(): void {
    const { resetOnRouteChange, pathname } = this.props
    if (resetOnRouteChange && this.state.hasError && pathname !== this.previousPath) {
      this.resetError()
    }
    this.previousPath = pathname
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: undefined })
  }

  reloadPage = (): void => window.location.reload()

  goBack = (): void => {
    this.resetError()
    this.props.navigate(-1)
  }

  goHome = (): void => {
    this.resetError()
    this.props.navigate('/')
  }

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state
    const { children, fallback: CustomFallback } = this.props

    if (!hasError) return children

    const fallbackProps: ErrorFallbackProps = {
      error,
      errorInfo,
      isDev: IS_DEV,
      goBack: this.goBack,
      goHome: this.goHome,
      resetError: this.resetError,
      reloadPage: this.reloadPage,
    }

    if (CustomFallback) return <CustomFallback {...fallbackProps} />

    return <ErrorFallback {...fallbackProps} />
  }
}
