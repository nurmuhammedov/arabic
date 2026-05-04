import { AppLayout, ContentLoader } from '@topcoder/components'
import { routeByRole } from '@topcoder/lib'
import { IUser, TypeAny } from '@topcoder/types'
import React, { lazy, Suspense } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const UsersList = lazy(() => import('@topcoder/modules/users/screens/users-list'))
const RegionsList = lazy(() => import('@topcoder/modules/regions/screens/list'))
const DistrictsList = lazy(() => import('@topcoder/modules/districts/screens/list'))

const Lazy = (Component: React.LazyExoticComponent<TypeAny>) => (
  <Suspense fallback={<ContentLoader />}>
    <Component />
  </Suspense>
)

export const superadminRoutes = (user: IUser | null): RouteObject[] => [
  {
    path: 'superadmin',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={routeByRole(user)} replace />,
      },
      {
        path: 'users',
        element: Lazy(UsersList),
      },
      {
        path: 'regions',
        element: Lazy(RegionsList),
      },
      {
        path: 'districts',
        element: Lazy(DistrictsList),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routeByRole(user)} replace />,
  },
]
