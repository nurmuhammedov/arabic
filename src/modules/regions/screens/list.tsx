import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@topcoder/components'
import { useData } from '@topcoder/hooks'
import { TypeAny } from '@topcoder/types'
import { useTranslation } from 'react-i18next'

export default function RegionsList() {
  const { t } = useTranslation(['common'])
  const { data: regions = [], isLoading } = useData<TypeAny[]>('regions', 'regions')

  const columns: ColumnDef<TypeAny>[] = [
    {
      accessorKey: 'name',
      header: t('name'),
    },
    {
      accessorKey: 'soato',
      header: 'SOATO',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('regions')}</h1>
      </div>

      <DataTable columns={columns} data={regions} isLoading={isLoading} />
    </div>
  )
}
