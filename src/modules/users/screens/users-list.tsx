import { ColumnDef } from '@tanstack/react-table'
import { DataTable, StatusBadge } from '@topcoder/components'
import { useData } from '@topcoder/hooks'
import { IUser, TypeAny } from '@topcoder/types'
import { useTranslation } from 'react-i18next'

export default function UsersList() {
  const { t } = useTranslation(['users', 'common'])
  const { data: users = [], isLoading } = useData<IUser[]>('users', 'users')

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: 'fullName',
      header: t('full_name'),
    },
    {
      accessorKey: 'username',
      header: t('username'),
    },
    {
      accessorKey: 'email',
      header: t('email'),
    },
    {
      accessorKey: 'phoneNumber',
      header: t('phone'),
    },
    {
      accessorKey: 'role',
      header: t('role'),
      cell: ({ row }) => <StatusBadge status={row.original.role} />,
    },
    {
      accessorKey: 'region.name',
      header: t('region'),
    },
    {
      accessorKey: 'district.name',
      header: t('district'),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('users')}</h1>
      </div>

      <DataTable columns={columns} data={users} isLoading={isLoading} />
    </div>
  )
}
