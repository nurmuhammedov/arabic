import { useDetail } from '@topcoder/api/hooks'
import { DetailCardAccordion, DetailRow, GoBack } from '@topcoder/components'
import { Button } from '@topcoder/components/ui'
import { IDistrict } from '@topcoder/modules/districts/districts.types'
import { format } from 'date-fns'
import { Edit } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

export default function DistrictsDetailScreen() {
  const { t } = useTranslation(['common', 'table'])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data: district, isLoading } = useDetail<IDistrict>('/districts', id, ['district', id!])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!district) {
    return <div>District not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <GoBack title={district.name} />
        <Button onClick={() => navigate(`../edit/${district.id}`)}>
          <Edit className="mr-2 h-4 w-4" />
          {t('edit', { ns: 'common' })}
        </Button>
      </div>

      <DetailCardAccordion defaultValue={['main']}>
        <DetailCardAccordion.Item value="main" title={t('main_info', { ns: 'common' })}>
          <div className="grid grid-cols-1 gap-1">
            <DetailRow title={t('name', { ns: 'common' })} value={district.name} />
            <DetailRow title={t('soato', { ns: 'table' })} value={district.soato} />
            <DetailRow title={t('region', { ns: 'table' })} value={district.region?.name} />
            <DetailRow
              title={t('created_date', { ns: 'table' })}
              value={district.createdAt ? format(new Date(district.createdAt), 'dd.MM.yyyy HH:mm') : '-'}
            />
          </div>
        </DetailCardAccordion.Item>
      </DetailCardAccordion>
    </div>
  )
}
