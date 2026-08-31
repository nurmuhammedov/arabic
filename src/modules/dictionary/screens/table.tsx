import type { ColumnDef } from '@tanstack/react-table'
import { usePaginatedData } from '@topcoder/api/hooks'
import { DataTable } from '@topcoder/components'
import { Badge } from '@topcoder/components/ui'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import type { IWord } from '../dictionary.types'

export default function DictionaryTableScreen() {
  const { t } = useTranslation(['dictionary', 'table', 'common'])
  const navigate = useNavigate()

  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [size] = useQueryState('size', parseAsInteger.withDefault(20))
  const [search] = useQueryState('search', parseAsString.withDefault(''))

  const { data, isLoading, totalPages, totalElements } = usePaginatedData<IWord>(
    'words',
    ['words', String(page), String(size), search],
    { page, limit: size, search: search || undefined }
  )

  const columns: ColumnDef<IWord>[] = [
    {
      accessorKey: 'arabic',
      header: t('arabic'),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span dir="rtl" className="font-arabic text-2xl font-medium">
            {row.original.arabic}
          </span>
          {row.original.transcription && (
            <span className="text-xs text-muted-foreground">[{row.original.transcription}]</span>
          )}
        </div>
      ),
      meta: { filter: { key: 'search', type: 'search' } },
    },
    {
      accessorKey: 'uz',
      header: t('uzbek'),
      cell: ({ row }) => row.original.uz || '—',
    },
    {
      accessorKey: 'ru',
      header: t('russian'),
      cell: ({ row }) => row.original.ru || '—',
    },
    {
      accessorKey: 'en',
      header: t('english'),
      cell: ({ row }) => row.original.en || '—',
    },
    {
      id: 'root',
      header: t('root'),
      cell: ({ row }) =>
        row.original.root ? (
          <div className="flex flex-col">
            <span dir="rtl" className="font-arabic text-lg">
              {row.original.root.radicals}
            </span>
            {row.original.root.meaningUz && (
              <span className="text-xs text-muted-foreground">{row.original.root.meaningUz}</span>
            )}
          </div>
        ) : (
          '—'
        ),
    },
    {
      id: 'pattern',
      header: t('pattern'),
      cell: ({ row }) =>
        row.original.pattern ? (
          <span dir="rtl" className="font-arabic text-lg">
            {row.original.pattern.wazn}
          </span>
        ) : (
          '—'
        ),
    },
    {
      accessorKey: 'frequency',
      header: t('frequency'),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span>{row.original.frequency}</span>
          {row.original.frequencyRank && (
            <span className="text-xs text-muted-foreground">#{row.original.frequencyRank}</span>
          )}
        </div>
      ),
    },
    {
      id: 'status',
      header: t('status', { ns: 'table' }),
      cell: ({ row }) =>
        row.original.glossStatus === 'MISSING' ? (
          <Badge variant="outline">{t('gloss_missing')}</Badge>
        ) : (
          <Badge variant={row.original.glossStatus === 'VERIFIED' ? 'success' : 'warning'}>
            {t(`gloss_${row.original.glossStatus.toLowerCase()}`)}
          </Badge>
        ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data || []}
      isLoading={isLoading}
      totalPages={totalPages}
      totalElements={totalElements}
      showFilters
      onRowClick={(row) => navigate(`detail/${row.id}`)}
    />
  )
}
