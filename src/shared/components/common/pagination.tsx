import { CustomSelect } from '@topcoder/components/common'
import { PAGE_SIZE } from '@topcoder/config'
import { cn, noop } from '@topcoder/lib'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useTranslation } from 'react-i18next'
import ReactPaginate from 'react-paginate'

interface PaginationProps {
  totalPages?: number
  totalElements?: number
  className?: string
  isLoading?: boolean
}

const PAGE_SIZE_OPTIONS = [
  { id: 1, name: '1' },
  { id: 5, name: '5' },
  { id: 10, name: '10' },
  { id: 20, name: '20' },
  { id: 50, name: '50' },
  { id: 100, name: '100' },
  { id: 200, name: '200' },
  { id: 500, name: '500' },
  { id: 1000, name: '1000' },
]

export function Pagination({ totalPages = 1, totalElements = 0, className, isLoading = false }: PaginationProps) {
  const { t } = useTranslation('common')

  const [{ page, size: pageSize }, setFilters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    size: parseAsInteger.withDefault(Number(PAGE_SIZE)),
  })

  const handlePageClick = (event: { selected: number }) => {
    setFilters({ page: event.selected + 1 }).catch(noop)
  }

  const handlePageSizeChange = (newSize: number) => {
    void setFilters({ size: newSize, page: 1 })
  }

  const handleFirstPage = () => {
    setFilters({ page: 1 }).catch(noop)
  }

  const handleLastPage = () => {
    setFilters({ page: totalPages }).catch(noop)
  }

  if (isLoading) return null

  return (
    <div className={cn('mt-2 flex flex-col-reverse items-center justify-between gap-2 lg:flex-row', className)}>
      <div className="flex w-full items-center justify-between gap-4 lg:w-auto lg:justify-start">
        <CustomSelect
          options={PAGE_SIZE_OPTIONS}
          value={pageSize}
          onChange={(val) => val && handlePageSizeChange(Number(val))}
          className="h-9 w-[90px] min-w-[90px]"
          isClearable={false}
        />
        <span className="whitespace-nowrap text-sm text-muted-foreground">
          {t('total_elements', { count: totalElements })}
        </span>
      </div>

      <div className="scrollbar-hidden flex max-w-full select-none items-center gap-1 overflow-x-auto">
        <button
          onClick={handleFirstPage}
          disabled={page <= 1}
          className={cn(
            'flex aspect-square h-9 w-9 items-center justify-center rounded-md border border-input bg-white transition-colors hover:bg-accent hover:text-accent-foreground',
            page <= 1 && 'pointer-events-none opacity-50'
          )}
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        <ReactPaginate
          breakLabel="..."
          nextLabel={<ChevronRight className="h-4 w-4" />}
          previousLabel={<ChevronLeft className="h-4 w-4" />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          forcePage={page - 1}
          renderOnZeroPageCount={null}
          containerClassName="flex items-center gap-1"
          pageClassName="rounded-md"
          pageLinkClassName="flex px-2 py-1 min-h-9 min-w-9 items-center justify-center rounded-md border border-input bg-white text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          activeClassName="rounded-md shadow-sm"
          activeLinkClassName="!bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground border border-primary rounded-md"
          previousClassName="mr-1"
          nextClassName="ml-1"
          previousLinkClassName={cn(
            'flex h-9 w-9 items-center justify-center rounded-md border border-input !bg-white !hover:bg-accent !hover:text-accent-foreground !transition-colors',
            page <= 1 && 'pointer-events-none opacity-80'
          )}
          nextLinkClassName={cn(
            'flex h-9 w-9 items-center justify-center rounded-md border border-input !bg-white !hover:bg-accent !hover:text-accent-foreground !transition-colors',
            page >= totalPages && 'pointer-events-none opacity-80'
          )}
          breakClassName="flex rounded-md border items-center justify-center border-input bg-white"
          breakLinkClassName="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
          disabledClassName="opacity-50 pointer-events-none"
        />

        <button
          onClick={handleLastPage}
          disabled={page >= totalPages}
          className={cn(
            'flex aspect-square h-9 w-9 items-center justify-center rounded-md border border-input bg-white transition-colors hover:bg-accent hover:text-accent-foreground',
            page >= totalPages && 'pointer-events-none opacity-50'
          )}
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
