import React, { ReactPortal } from 'react'
import { createPortal } from 'react-dom'
import { Toaster as HotToaster } from 'react-hot-toast'

export const Toaster: React.FC = (): ReactPortal =>
  createPortal(
    <HotToaster position="top-right" reverseOrder={false} />,
    (document.querySelector('#alert') as HTMLElement) || document.body
  )
