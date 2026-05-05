import { UserRole } from '@topcoder/constants'
import React from 'react'

import { adminMenu } from './menus/admin'
import { studentMenu } from './menus/student'

export interface INavigationItem {
  title: string
  url: string
  icon?: React.ReactNode
  items?: { title: string; url: string; icon?: React.ReactNode }[]
}

export interface IMenuSection {
  title: string
  items: INavigationItem[]
}

export const NAVIGATIONS: Record<UserRole, IMenuSection[]> = {
  [UserRole.ADMIN]: adminMenu,
  [UserRole.STUDENT]: studentMenu,
}
