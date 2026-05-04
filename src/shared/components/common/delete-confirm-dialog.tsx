import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@topcoder/components'
import { Loader2, OctagonAlert } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface DeleteConfirmationDialogProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onConfirm: () => void
  isLoading?: boolean
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  loadingText?: string
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  setIsOpen,
  onConfirm,
  isLoading = false,
  title = 'are_you_sure_to_delete',
  description = 'delete_description',
  confirmText = 'delete',
  cancelText = 'cancel',
  loadingText = 'deleting',
}) => {
  const { t } = useTranslation('common')

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault()
    onConfirm()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="!tems-start flex flex-col gap-2 !text-start">
            <div className="flex size-9 items-center justify-center rounded-full bg-destructive/10">
              <OctagonAlert className="size-5 text-destructive" />
            </div>
            {t(title)}
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-2 !text-start text-base">{t(description)}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>{t(cancelText)}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                {t(loadingText)}
              </span>
            ) : (
              t(confirmText)
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeleteConfirmationDialog }
