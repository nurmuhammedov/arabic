import { useDetail } from '@topcoder/api/hooks'
import { DetailCardAccordion, DetailRow, GoBack } from '@topcoder/components'
import { Button } from '@topcoder/components/ui'
import { USER_ROLE_LABELS } from '@topcoder/constants'
import { IUser } from '@topcoder/modules/users/users.types'
import { format } from 'date-fns'
import { Edit } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

export default function UsersDetailScreen() {
  const { t } = useTranslation(['common', 'table', 'form'])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data: user, isLoading } = useDetail<IUser>('/users', id, ['user', id!])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <GoBack title={user.fullName} />
        <Button onClick={() => navigate(`../edit/${user.id}`)}>
          <Edit className="mr-2 h-4 w-4" />
          {t('edit', { ns: 'common' })}
        </Button>
      </div>

      <DetailCardAccordion defaultValue={['main']}>
        <DetailCardAccordion.Item value="main" title={t('main_info', { ns: 'common' })}>
          <div className="grid grid-cols-1 gap-1">
            <DetailRow title={t('full_name', { ns: 'labels' })} value={user.fullName} />
            <DetailRow title={t('username', { ns: 'labels' })} value={user.username} />
            <DetailRow title={t('email', { ns: 'labels' })} value={user.email} />
            <DetailRow title={t('phone_number', { ns: 'labels' })} value={user.phoneNumber} />
            <DetailRow title={t('role', { ns: 'labels' })} value={USER_ROLE_LABELS[user.role] || user.role} />
            <DetailRow title={t('region', { ns: 'table' })} value={user.region?.name} />
            <DetailRow title={t('district', { ns: 'table' })} value={user.district?.name} />
            <DetailRow
              title={t('created_date', { ns: 'table' })}
              value={user.createdAt ? format(new Date(user.createdAt), 'dd.MM.yyyy HH:mm') : '-'}
            />
          </div>
        </DetailCardAccordion.Item>
      </DetailCardAccordion>
    </div>
  )
}
