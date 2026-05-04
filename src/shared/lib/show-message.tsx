import { CustomAlert } from '@topcoder/components'
import { toast } from 'react-hot-toast'

type ToastType = 'success' | 'error' | 'alert'

export const showMessage = (
  message: string,
  type: ToastType = 'success',
  duration: number = 8000,
  position: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center' = 'top-right'
) => {
  toast.custom(
    (t) => <CustomAlert onClose={() => toast.dismiss(t.id)} visible={t.visible} type={type} title={message} />,
    {
      duration,
      position,
      // id: message,
    }
  )
}
