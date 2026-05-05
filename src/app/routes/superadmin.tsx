import { AppLayout, ContentLoader } from '@topcoder/components'
import { routeByRole } from '@topcoder/lib'
import { IUser } from '@topcoder/types'
import React, { lazy, Suspense } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'

const UsersTable = lazy(() => import('@topcoder/modules/users/screens/table'))
const UsersAdd = lazy(() => import('@topcoder/modules/users/screens/add'))
const UsersEdit = lazy(() => import('@topcoder/modules/users/screens/edit'))
const UsersDetail = lazy(() => import('@topcoder/modules/users/screens/detail'))

const RegionsTable = lazy(() => import('@topcoder/modules/regions/screens/table'))
const RegionsAdd = lazy(() => import('@topcoder/modules/regions/screens/add'))
const RegionsEdit = lazy(() => import('@topcoder/modules/regions/screens/edit'))
const RegionsDetail = lazy(() => import('@topcoder/modules/regions/screens/detail'))

const DistrictsTable = lazy(() => import('@topcoder/modules/districts/screens/table'))
const DistrictsAdd = lazy(() => import('@topcoder/modules/districts/screens/add'))
const DistrictsEdit = lazy(() => import('@topcoder/modules/districts/screens/edit'))
const DistrictsDetail = lazy(() => import('@topcoder/modules/districts/screens/detail'))

const Lazy = (Component: React.LazyExoticComponent<any>) => (
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
        element: <Outlet />,
        children: [
          { index: true, element: Lazy(UsersTable) },
          { path: 'add', element: Lazy(UsersAdd) },
          { path: 'edit/:id', element: Lazy(UsersEdit) },
          { path: 'detail/:id', element: Lazy(UsersDetail) },
        ],
      },
      {
        path: 'regions',
        element: <Outlet />,
        children: [
          { index: true, element: Lazy(RegionsTable) },
          { path: 'add', element: Lazy(RegionsAdd) },
          { path: 'edit/:id', element: Lazy(RegionsEdit) },
          { path: 'detail/:id', element: Lazy(RegionsDetail) },
        ],
      },
      {
        path: 'districts',
        element: <Outlet />,
        children: [
          { index: true, element: Lazy(DistrictsTable) },
          { path: 'add', element: Lazy(DistrictsAdd) },
          { path: 'edit/:id', element: Lazy(DistrictsEdit) },
          { path: 'detail/:id', element: Lazy(DistrictsDetail) },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routeByRole(user)} replace />,
  },
]
