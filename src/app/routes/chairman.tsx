import { AppLayout } from '@topcoder/components'
import { routeByRole } from '@topcoder/lib'
import { IUser } from '@topcoder/types'
import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

export const chairmanRoutes = (user: IUser | null): RouteObject[] => [
  {
    path: 'chairman',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={routeByRole(user)} replace />,
      },
      {
        path: 'dashboard',
        element: <h1>chairman Dashboard</h1>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routeByRole(user)} replace />,
  },
]
