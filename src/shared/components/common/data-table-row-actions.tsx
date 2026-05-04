import { useDelete } from '@topcoder/api'
import { DeleteConfirmationDialog } from '@topcoder/components'
import { cn } from '@topcoder/lib'
import { TypeAny } from '@topcoder/types'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface DataTableRowActionsProps {
  cell: TypeAny
  onEdit?: (data: TypeAny) => void
  onView?: (data: TypeAny) => void
  deleteEndpoint?: string
  deleteQueryKey?: string | string[]
}

export function DataTableRowActions({
  cell,
  onEdit,
  onView,
  deleteEndpoint,
  deleteQueryKey = [],
}: DataTableRowActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const { mutate, isPending } = useDelete(deleteEndpoint || 'default-delete-endpoint/', deleteQueryKey, 'success')

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    const id: TypeAny = cell?.row?.original?.id

    if (id) {
      mutate(id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false)
        },
      })
    }
  }

  const hasActions = onView || onEdit || deleteEndpoint

  if (!hasActions) return null

  return (
    <>
      <div className="flex items-center gap-1">
        {onView && (
          <button
            type="button"
            onClick={() => onView(cell?.row?.original)}
            className={cn(
              'flex items-center justify-center rounded p-1 transition-colors',
              'text-neutral-900 hover:bg-gray-150'
            )}
          >
            <Eye className="size-4" />
          </button>
        )}

        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(cell?.row?.original)}
            className={cn(
              'flex items-center justify-center rounded p-1 transition-colors',
              'text-neutral-900 hover:bg-gray-150'
            )}
          >
            <Pencil className="size-4" />
          </button>
        )}

        {deleteEndpoint && (
          <button
            type="button"
            onClick={handleDeleteClick}
            className={cn(
              'flex items-center justify-center rounded p-1 transition-colors',
              'text-red-700 hover:bg-red-100'
            )}
          >
            <Trash2 className="size-4" />
          </button>
        )}
      </div>

      {deleteEndpoint && (
        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          setIsOpen={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          isLoading={isPending}
        />
      )}
    </>
  )
}
