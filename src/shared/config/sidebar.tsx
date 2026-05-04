import { UserRole } from '@topcoder/constants'
import { LayoutDashboard, Map, MapPin, Users } from 'lucide-react'
import React from 'react'

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

const adminMenu: IMenuSection[] = [
  {
    title: 'main',
    items: [
      {
        title: 'users',
        url: '/superadmin/users',
        icon: <Users className="size-4" />,
      },
      {
        title: 'regions',
        url: '/superadmin/regions',
        icon: <Map className="size-4" />,
      },
      {
        title: 'districts',
        url: '/superadmin/districts',
        icon: <MapPin className="size-4" />,
      },
    ],
  },
]

const studentMenu: IMenuSection[] = [
  {
    title: 'main',
    items: [
      {
        title: 'dashboard',
        url: '/student/dashboard',
        icon: <LayoutDashboard className="size-4" />,
      },
    ],
  },
]

export const NAVIGATIONS: Record<UserRole, IMenuSection[]> = {
  [UserRole.ADMIN]: adminMenu,
  [UserRole.STUDENT]: studentMenu,
}
