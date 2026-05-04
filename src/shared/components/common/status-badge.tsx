import { Badge } from '@topcoder/components/ui'
import { useTranslation } from 'react-i18next'

export const StatusBadge = ({ status }: { status: string }) => {
  const { t } = useTranslation()

  const variants: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info' | 'error'
  > = {
    // Add basic variants as needed
    ADMIN: 'destructive',
    STUDENT: 'info',
    ACTIVE: 'success',
    INACTIVE: 'outline',
    PENDING: 'warning',
    REJECTED: 'error',
    COMPLETED: 'success',
  }

  return (
    <Badge
      variant={variants[status] || 'default'}
      className="pointer-events-none whitespace-nowrap shadow-none ring-0 focus:ring-0"
    >
      {t(status)}
    </Badge>
  )
}
