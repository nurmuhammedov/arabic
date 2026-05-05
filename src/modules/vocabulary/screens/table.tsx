import { ColumnDef } from '@tanstack/react-table'
import { usePaginatedData } from '@topcoder/api/hooks'
import { DataTable, DataTableRowActions } from '@topcoder/components'
import { Badge, Button } from '@topcoder/components/ui'
import { IVocabulary, VocabularyStatus } from '@topcoder/modules/vocabulary/vocabulary.types'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function VocabularyTableScreen() {
  const { t } = useTranslation(['vocabulary', 'table', 'common'])
  const navigate = useNavigate()

  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [size] = useQueryState('size', parseAsInteger.withDefault(20))
  const [search] = useQueryState('search', parseAsString.withDefault(''))
  const [status] = useQueryState('status', parseAsString.withDefault(''))
  const [arabic] = useQueryState('arabic', parseAsString.withDefault(''))
  const [uzbek] = useQueryState('uzbek', parseAsString.withDefault(''))
  const [russian] = useQueryState('russian', parseAsString.withDefault(''))
  const [english] = useQueryState('english', parseAsString.withDefault(''))

  const { data, isLoading, totalPages, totalElements } = usePaginatedData<IVocabulary>(
    'vocabulary',
    ['vocabulary', String(page), String(size), search, status, arabic, uzbek, russian, english],
    {
      page,
      limit: size,
      search: search || undefined,
      status: status || undefined,
      arabic: arabic || undefined,
      uzbek: uzbek || undefined,
      russian: russian || undefined,
      english: english || undefined,
    }
  )

  const getStatusVariant = (status: VocabularyStatus) => {
    switch (status) {
      case VocabularyStatus.NEW:
        return 'info'
      case VocabularyStatus.LEARNING:
        return 'warning'
      case VocabularyStatus.REVIEW:
        return 'secondary'
      case VocabularyStatus.LEARNED:
        return 'success'
      case VocabularyStatus.ARCHIVED:
        return 'outline'
      default:
        return 'default'
    }
  }

  const columns: ColumnDef<IVocabulary>[] = [
    {
      accessorKey: 'arabic',
      header: t('arabic'),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span dir="rtl" className="font-arabic text-xl font-medium">
            {row.original.arabic}
          </span>
          {row.original.transcriptionAr && (
            <span className="text-xs text-muted-foreground">[{row.original.transcriptionAr}]</span>
          )}
        </div>
      ),
      meta: {
        filter: { key: 'arabic', type: 'search' },
      },
    },
    {
      accessorKey: 'english',
      header: t('english'),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span>{row.original.english || '-'}</span>
          {row.original.transcriptionEn && (
            <span className="text-xs text-muted-foreground">[{row.original.transcriptionEn}]</span>
          )}
        </div>
      ),
      meta: {
        filter: { key: 'english', type: 'search' },
      },
    },
    {
      accessorKey: 'russian',
      header: t('russian'),
      cell: ({ row }) => row.original.russian || '-',
      meta: {
        filter: { key: 'russian', type: 'search' },
      },
    },
    {
      accessorKey: 'uzbek',
      header: t('uzbek'),
      meta: {
        filter: { key: 'uzbek', type: 'search' },
      },
    },
    {
      accessorKey: 'status',
      header: t('status'),
      cell: ({ row }) => {
        const status = row.original.status
        return <Badge variant={getStatusVariant(status)}>{t(`statuses.${status}`)}</Badge>
      },
      meta: {
        filter: {
          key: 'status',
          type: 'select',
          options: Object.values(VocabularyStatus).map((s) => ({
            id: s,
            name: t(`statuses.${s}`),
          })),
        },
      },
    },
    {
      accessorKey: 'createdAt',
      header: t('created_date', { ns: 'table' }),
      cell: ({ row }) => {
        const date = row.original.createdAt
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
          deleteEndpoint="vocabulary/"
          deleteQueryKey="vocabulary"
        />
      ),
    },
  ]

  return (
    <>
      <div className="mb-3 flex justify-end">
        <Button className="gap-2" onClick={() => navigate('add')}>
          <Plus className="h-4 w-4" /> {t('add_title')}
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
