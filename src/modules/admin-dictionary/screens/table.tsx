import type { ColumnDef } from '@tanstack/react-table'
import { usePaginatedData } from '@topcoder/api/hooks'
import { DataTable, DataTableRowActions } from '@topcoder/components'
import { Badge, Button } from '@topcoder/components/ui'
import { Plus, ShieldCheck } from 'lucide-react'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { GlossStatus, type IAdminWord, WordSource } from '../admin-dictionary.types'

const STATUS_VARIANT: Record<string, 'secondary' | 'outline' | 'default'> = {
  [GlossStatus.MISSING]: 'outline',
  [GlossStatus.DRAFT]: 'secondary',
  [GlossStatus.VERIFIED]: 'default',
}

export default function AdminDictionaryTableScreen() {
  const { t } = useTranslation(['dictionary', 'common', 'table'])
  const navigate = useNavigate()

  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [size] = useQueryState('size', parseAsInteger.withDefault(20))
  const [search] = useQueryState('search', parseAsString.withDefault(''))
  const [glossStatus] = useQueryState('glossStatus', parseAsString.withDefault(''))

  const { data, isLoading, totalPages, totalElements } = usePaginatedData<IAdminWord>('words', 'words', {
    page,
    limit: size,
    search: search || undefined,
    glossStatus: glossStatus || undefined,
  })

  const columns: ColumnDef<IAdminWord>[] = [
    {
      accessorKey: 'arabic',
      header: t('arabic'),
      cell: ({ row }) => (
        <span dir="rtl" className="font-arabic text-lg">
          {row.original.arabic}
        </span>
      ),
      meta: { filter: { key: 'search', type: 'search' } },
    },
    { accessorKey: 'transcription', header: t('transcription'), cell: ({ row }) => row.original.transcription || '-' },
    { accessorKey: 'uz', header: "O'zbekcha", cell: ({ row }) => row.original.uz || '-' },
    { accessorKey: 'ru', header: 'Ruscha', cell: ({ row }) => row.original.ru || '-' },
    { accessorKey: 'en', header: 'Inglizcha', cell: ({ row }) => row.original.en || '-' },
    {
      accessorKey: 'glossStatus',
      header: t('gloss_status'),
      cell: ({ row }) => (
        <Badge variant={STATUS_VARIANT[row.original.glossStatus] ?? 'outline'}>
          {t(`status.${row.original.glossStatus}`)}
        </Badge>
      ),
      meta: {
        filter: {
          key: 'glossStatus',
          type: 'select',
          options: Object.values(GlossStatus).map((value) => ({ id: value, name: t(`status.${value}`) }))
        }
      },
    },
    {
      accessorKey: 'frequency',
      header: t('frequency'),
      cell: ({ row }) => row.original.frequency || '-',
    },
    {
      id: 'actions',
      cell: (cell) => {
        // Quranic rows come from the corpus; only their gloss may be edited.
        const isQuranic = cell.row.original.source === WordSource.QURAN
        return (
          <DataTableRowActions
            cell={cell}
            onEdit={(item) => navigate(`edit/${item?.id}`)}
            deleteEndpoint={isQuranic ? undefined : 'words/'}
            deleteQueryKey="words"
          />
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-3 flex justify-end gap-2">
        <Button variant="outline" className="gap-2" onClick={() => navigate('review')}>
          <ShieldCheck className="h-4 w-4" /> {t('review_cta')}
        </Button>
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
