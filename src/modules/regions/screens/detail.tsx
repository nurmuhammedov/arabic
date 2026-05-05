import { useDetail } from '@topcoder/api/hooks'
import { DetailCardAccordion, DetailRow, GoBack } from '@topcoder/components'
import { Button } from '@topcoder/components/ui'
import { IRegion } from '@topcoder/modules/regions/regions.types'
import { format } from 'date-fns'
import { Edit } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

export default function RegionsDetailScreen() {
  const { t } = useTranslation(['common', 'table'])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data: region, isLoading } = useDetail<IRegion>('/regions', id, ['region', id!])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!region) {
    return <div>Region not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <GoBack title={region.name} />
        <Button onClick={() => navigate(`../edit/${region.id}`)}>
          <Edit className="mr-2 h-4 w-4" />
          {t('edit', { ns: 'common' })}
        </Button>
      </div>

      <DetailCardAccordion defaultValue={['main']}>
        <DetailCardAccordion.Item value="main" title={t('main_info', { ns: 'common' })}>
          <div className="grid grid-cols-1 gap-1">
            <DetailRow title={t('name', { ns: 'common' })} value={region.name} />
            <DetailRow title={t('soato', { ns: 'table' })} value={region.soato} />
            <DetailRow
              title={t('created_date', { ns: 'table' })}
              value={region.createdAt ? format(new Date(region.createdAt), 'dd.MM.yyyy HH:mm') : '-'}
            />
            <DetailRow
              title={t('updated_date', { ns: 'table' })}
              value={region.updatedAt ? format(new Date(region.updatedAt), 'dd.MM.yyyy HH:mm') : '-'}
            />
          </div>
        </DetailCardAccordion.Item>
      </DetailCardAccordion>
    </div>
  )
}
