import { cn } from '@topcoder/lib'
import * as React from 'react'

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  isLoading?: boolean
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, isLoading, ...props }, ref) => (
  <div
    className={cn(
      'relative h-full min-h-[200px] w-full flex-1 overflow-auto rounded-md bg-white p-3 !pt-0',
      isLoading && 'overflow-hidden'
    )}
  >
    <div className="sticky top-0 h-3 w-full bg-white"></div>
    <table
      ref={ref}
      className={cn(
        'w-full caption-bottom border-separate border-spacing-0 rounded-lg text-sm',
        isLoading && 'h-[calc(100%-12px)]',
        className
      )}
      {...props}
    />
  </div>
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('sticky top-1.5 z-10 rounded-lg', className)} {...props} />
  )
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  )
)
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props} />
  )
)
TableFooter.displayName = 'TableFooter'

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  disableZebra?: boolean
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, disableZebra = false, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'rounded-sm border-neutral-200 transition-colors data-[state=selected]:bg-muted',
        !disableZebra ? 'even:bg-neutral-150/40' : '',
        className
      )}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'border-x border-neutral-200/50 bg-background px-3 py-4 text-left align-middle font-semibold text-neutral-950 first:rounded-l-lg first:border-l-0 last:rounded-r-lg last:border-r-0 [&:has([role=checkbox])]:pl-4 [&:has([role=checkbox])]:pr-2 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  )
)
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'border-x px-3 py-2.5 align-middle first:rounded-l-lg first:border-l-0 last:rounded-r-lg last:border-r-0 [&:has([role=checkbox])]:pl-4 [&:has([role=checkbox])]:pr-2 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  )
)
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
  )
)
TableCaption.displayName = 'TableCaption'

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
