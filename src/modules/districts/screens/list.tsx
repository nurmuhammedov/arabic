import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@topcoder/components'
import { useData } from '@topcoder/hooks'
import { TypeAny } from '@topcoder/types'
import { useTranslation } from 'react-i18next'

export default function DistrictsList() {
  const { t } = useTranslation(['common'])
  const { data: districts = [], isLoading } = useData<TypeAny[]>('districts', 'districts')

  const columns: ColumnDef<TypeAny>[] = [
    {
      accessorKey: 'name',
      header: t('name'),
    },
    {
      accessorKey: 'soato',
      header: 'SOATO',
    },
    {
      accessorKey: 'region.name',
      header: t('region'),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('districts')}</h1>
      </div>

      <DataTable columns={columns} data={districts} isLoading={isLoading} />
    </div>
  )
}
