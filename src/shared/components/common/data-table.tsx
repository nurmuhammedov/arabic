import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import {
  ContentLoader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@topcoder/components'
import { PAGE_SIZE } from '@topcoder/config'
import { cn } from '@topcoder/lib'
import { parseAsInteger, useQueryState } from 'nuqs'
import { Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ColumnFilterInput } from './column-filter-input'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  totalPages?: number
  totalElements?: number
  withSerial?: boolean
  showFilters?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  totalPages,
  totalElements,
  withSerial = true,
  showFilters = false,
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation('common')

  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [size] = useQueryState('size', parseAsInteger.withDefault(Number(PAGE_SIZE)))

  const tableColumns = useMemo(() => {
    const processedColumns = columns.map((column) => {
      if (column.id === 'actions') {
        return {
          ...column,
          meta: {
            ...column.meta,
            className: `${column.meta?.className ?? ''} w-[1%]`,
          },
        }
      }
      return column
    })

    if (!withSerial) return processedColumns

    const serialColumn: ColumnDef<TData, TValue> = {
      id: 'serial_number',
      header: t('serial_number'),
      cell: ({ row }) => (page - 1) * size + row.index + 1,
      meta: {
        className: 'w-[1%] whitespace-nowrap text-center',
      },
    }

    return [serialColumn, ...processedColumns]
  }, [columns, withSerial, page, size, t])

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  })

  return (
    <Fragment>
      <div className="relative flex-1 overflow-auto rounded-md bg-white">
        <Table isLoading={isLoading}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        header.column.columnDef.meta?.className,
                        showFilters
                          ? 'first:rounded-bl-none first:rounded-tl-lg last:rounded-br-none last:rounded-tr-lg'
                          : 'first:rounded-l-lg last:rounded-r-lg'
                      )}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}

            {showFilters && (
              <TableRow className="border-neutral-200/50 !bg-white even:!bg-white hover:!bg-white">
                {table.getAllColumns().map((column) => {
                  const filterParams = column.columnDef.meta?.filter
                  if (!filterParams?.key || column.id === 'actions' || column.id === 'serial_number') {
                    return (
                      <TableHead
                        key={column.id}
                        className={cn(
                          `!h-8 border-b-2 border-neutral-200/50 !bg-white !p-0 even:!bg-white hover:!bg-white`,
                          column.columnDef.meta?.className ?? '',
                          'first:rounded-none last:rounded-none'
                        )}
                      />
                    )
                  }

                  return (
                    <TableHead
                      key={column.id}
                      className={cn(
                        `!h-8 border-b-2 border-neutral-200/50 !bg-white !p-0 even:!bg-white hover:!bg-white`,
                        column.columnDef.meta?.className ?? '',
                        'first:rounded-none last:rounded-none'
                      )}
                    >
                      <ColumnFilterInput column={column.columnDef} />
                    </TableHead>
                  )
                })}
              </TableRow>
            )}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow className="relative">
                <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                  <ContentLoader opacity={0} />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id} className={cell.column.columnDef.meta?.className}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                  {t('no_results')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {totalPages && totalPages > 0 ? (
        <Pagination isLoading={isLoading} totalPages={totalPages} totalElements={totalElements} />
      ) : null}
    </Fragment>
  )
}
