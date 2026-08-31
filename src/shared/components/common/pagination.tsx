import { CustomSelect } from '@topcoder/components/common'
import { PAGE_SIZE } from '@topcoder/config'
import { cn, noop } from '@topcoder/lib'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface PaginationProps {
  totalPages?: number
  totalElements?: number
  className?: string
  isLoading?: boolean
}

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100, 200].map((n) => ({ id: n, name: String(n) }))

const SIBLINGS = 1
const BOUNDARY = 1
const ELLIPSIS = 'ellipsis'

type PageItem = number | typeof ELLIPSIS

function buildPageItems(current: number, total: number): PageItem[] {
  const totalSlots = BOUNDARY * 2 + SIBLINGS * 2 + 3
  if (total <= totalSlots) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const left = Math.max(current - SIBLINGS, BOUNDARY + 2)
  const right = Math.min(current + SIBLINGS, total - BOUNDARY - 1)

  const items: PageItem[] = Array.from({ length: BOUNDARY }, (_, i) => i + 1)

  if (left > BOUNDARY + 2) items.push(ELLIPSIS)
  else if (left === BOUNDARY + 2) items.push(BOUNDARY + 1)

  for (let page = left; page <= right; page++) items.push(page)

  if (right < total - BOUNDARY - 1) items.push(ELLIPSIS)
  else if (right === total - BOUNDARY - 1) items.push(total - BOUNDARY)

  for (let i = total - BOUNDARY + 1; i <= total; i++) items.push(i)

  return items
}

const cellClass =
  'flex h-9 min-w-9 items-center justify-center rounded-md border border-input bg-background px-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground'

export function Pagination({ totalPages = 1, totalElements = 0, className, isLoading = false }: PaginationProps) {
  const { t } = useTranslation('common')

  const [{ page, size: pageSize }, setFilters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    size: parseAsInteger.withDefault(Number(PAGE_SIZE)),
  })

  const items = useMemo(() => buildPageItems(page, totalPages), [page, totalPages])

  const goTo = (next: number) => {
    if (next < 1 || next > totalPages || next === page) return
    setFilters({ page: next }).catch(noop)
  }

  if (isLoading) return null

  return (
    <nav
      aria-label={t('pagination')}
      className={cn('mt-2 flex flex-col-reverse items-center justify-between gap-2 lg:flex-row', className)}
    >
      <div className="flex w-full items-center justify-between gap-4 lg:w-auto lg:justify-start">
        <CustomSelect
          options={PAGE_SIZE_OPTIONS}
          value={pageSize}
          onChange={(val) => val && setFilters({ size: Number(val), page: 1 }).catch(noop)}
          className="h-9 w-[90px] min-w-[90px]"
          isClearable={false}
        />
        <span className="whitespace-nowrap text-sm text-muted-foreground">
          {t('total_elements', { count: totalElements })}
        </span>
      </div>

      <div className="scrollbar-hidden flex max-w-full select-none items-center gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => goTo(1)}
          disabled={page <= 1}
          className={cn(cellClass, 'w-9 px-0 disabled:pointer-events-none disabled:opacity-50')}
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => goTo(page - 1)}
          disabled={page <= 1}
          className={cn(cellClass, 'w-9 px-0 disabled:pointer-events-none disabled:opacity-50')}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {items.map((item, index) =>
          item === ELLIPSIS ? (
            <span key={`gap-${index}`} className={cn(cellClass, 'w-9 px-0 text-muted-foreground')}>
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => goTo(item)}
              aria-current={item === page ? 'page' : undefined}
              className={cn(
                cellClass,
                item === page &&
                  'border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground'
              )}
            >
              {item}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => goTo(page + 1)}
          disabled={page >= totalPages}
          className={cn(cellClass, 'w-9 px-0 disabled:pointer-events-none disabled:opacity-50')}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => goTo(totalPages)}
          disabled={page >= totalPages}
          className={cn(cellClass, 'w-9 px-0 disabled:pointer-events-none disabled:opacity-50')}
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  )
}
