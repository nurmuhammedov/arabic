import { DeviceType, UserRole } from '@topcoder/constants'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const noop = () => {}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { IUser } from '@topcoder/types'

export const routeByRole = (user: IUser | null | undefined): string => {
  if (user.role === UserRole.ADMIN) return '/superadmin/users'
  if (user.role === UserRole.STUDENT) return '/student/dashboard'

  return '/not-found'
}

export function detectDeviceType(width: number): DeviceType {
  if (width < 768) return DeviceType.MOBILE
  if (width < 1024) return DeviceType.TABLET
  if (width < 1280) return DeviceType.LAPTOP
  if (width < 1536) return DeviceType.DESKTOP
  if (width < 2560) return DeviceType.LARGE_SCREEN
  if (width < 3840) return DeviceType.QHD_2K
  return DeviceType.UHD_4K
}

export function truncateString(value: string | null | undefined, maxLength: number = 50): string {
  if (!value) return '?'

  return value.length <= maxLength ? value : value.slice(0, maxLength) + '…'
}
