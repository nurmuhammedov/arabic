import { AppLayout } from '@topcoder/components'
import { routeByRole } from '@topcoder/lib'
import { IUser } from '@topcoder/types'
import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

export const installerRoutes = (user: IUser | null): RouteObject[] => [
  {
    path: 'installer',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={routeByRole(user)} replace />,
      },
      {
        path: 'dashboard',
        element: <h1>installer Dashboard</h1>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routeByRole(user)} replace />,
  },
]
