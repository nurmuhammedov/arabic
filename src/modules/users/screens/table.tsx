import { ColumnDef } from '@tanstack/react-table'
import { usePaginatedData } from '@topcoder/api/hooks'
import { DataTable, DataTableRowActions } from '@topcoder/components'
import { Button } from '@topcoder/components/ui'
import { IUser } from '@topcoder/modules/users/users.types'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function UsersTableScreen() {
  const { t } = useTranslation(['table', 'common', 'form'])
  const navigate = useNavigate()

  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [size] = useQueryState('size', parseAsInteger.withDefault(20))
  const [search] = useQueryState('search', parseAsString.withDefault(''))

  const { data, isLoading, totalPages, totalElements } = usePaginatedData<IUser>('users', 'users', {
    page,
    limit: size,
    search: search || undefined,
  })

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: 'fullName',
      header: t('full_name', { ns: 'form' }),
      cell: ({ row }) => {
        const item = row.original
        return item.fullName || '-'
      },
      meta: {
        filter: { key: 'search', type: 'search' },
      },
    },
    {
      accessorKey: 'username',
      header: t('username', { ns: 'form' }),
    },
    {
      accessorKey: 'phoneNumber',
      header: t('phone_number', { ns: 'form' }),
      cell: ({ row }) => {
        const item = row.original
        return item.phoneNumber || '-'
      },
    },
    {
      id: 'region',
      header: t('region', { ns: 'table' }),
      cell: ({ row }) => {
        const item = row.original
        return item.region?.name || '-'
      },
    },
    {
      id: 'district',
      header: t('district', { ns: 'table' }),
      cell: ({ row }) => {
        const item = row.original
        return item.district?.name || '-'
      },
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
          deleteEndpoint="users/"
          deleteQueryKey="users"
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
