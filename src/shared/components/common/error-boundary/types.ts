import { LucideIcon } from 'lucide-react'
import { ComponentType, ErrorInfo, ReactNode } from 'react'

export interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo?: ErrorInfo
}

export interface ErrorFallbackProps {
  error: Error | null
  errorInfo?: ErrorInfo
  resetError: () => void
  reloadPage: () => void
  goBack: () => void
  goHome: () => void
  isDev: boolean
}

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ComponentType<ErrorFallbackProps>
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetOnRouteChange?: boolean
}

export interface ErrorAction {
  label: string
  icon: LucideIcon
  action: () => void
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}
