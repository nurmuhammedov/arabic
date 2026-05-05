import { ColumnDef } from '@tanstack/react-table'
import { usePaginatedData } from '@topcoder/api/hooks'
import { DataTable, DataTableRowActions } from '@topcoder/components'
import { Button } from '@topcoder/components/ui'
import { IRegion } from '@topcoder/modules/regions/regions.types'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function RegionsTableScreen() {
  const { t } = useTranslation(['table', 'common'])
  const navigate = useNavigate()

  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [size] = useQueryState('size', parseAsInteger.withDefault(20))
  const [search] = useQueryState('search', parseAsString.withDefault(''))

  const { data, isLoading, totalPages, totalElements } = usePaginatedData<IRegion>('regions', 'regions', {
    page,
    limit: size,
    search: search || undefined,
  })

  const columns: ColumnDef<IRegion>[] = [
    {
      accessorKey: 'name',
      header: t('name', { ns: 'table' }),
      meta: {
        filter: { key: 'search', type: 'search' },
      },
    },
    {
      accessorKey: 'soato',
      header: t('soato', { ns: 'table' }),
    },
    {
      accessorKey: 'createdAt',
      header: t('created_date', { ns: 'table' }),
      cell: ({ row }) => {
        const item = row.original
        const date = item.createdAt
        return date ? format(new Date(date), 'dd.MM.yyyy') : '-'
      },
    },
    {
      id: 'actions',
      cell: (cell) => (
        <DataTableRowActions
          cell={cell}
          onEdit={(data) => navigate(`edit/${data?.id}`)}
          onView={(data) => navigate(`detail/${data?.id}`)}
          deleteEndpoint="regions/"
          deleteQueryKey="regions"
        />
      ),
    },
  ]

  return (
    <>
      <div className="mb-3 flex justify-end">
        <Button className="gap-2" onClick={() => navigate('add')}>
          <Plus className="h-4 w-4" /> {t('add', { ns: 'common' })}
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data || []}
        isLoading={isLoading}
        totalPages={totalPages}
        totalElements={totalElements}
        showFilters={true}
      />
    </>
  )
}
