import { AppLayout } from '@topcoder/components'
import { routeByRole } from '@topcoder/lib'
import type { IUser } from '@topcoder/types'
import { lazy } from 'react'
import { Navigate, Outlet, type RouteObject } from 'react-router-dom'

const UsersTable = lazy(() => import('@topcoder/modules/users/screens/table'))
const UsersAdd = lazy(() => import('@topcoder/modules/users/screens/add'))
const UsersEdit = lazy(() => import('@topcoder/modules/users/screens/edit'))
const UsersDetail = lazy(() => import('@topcoder/modules/users/screens/detail'))
const DictionaryTable = lazy(() => import('@topcoder/modules/admin-dictionary/screens/table'))
const DictionaryForm = lazy(() => import('@topcoder/modules/admin-dictionary/screens/form'))
const GlossReview = lazy(() => import('@topcoder/modules/admin-dictionary/screens/review'))

export const superadminRoutes = (user: IUser | null): RouteObject[] => [
  {
    path: 'superadmin',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to={routeByRole(user)} replace /> },
      {
        path: 'users',
        element: <Outlet />,
        children: [
          { index: true, element: <UsersTable /> },
          { path: 'add', element: <UsersAdd /> },
          { path: 'edit/:id', element: <UsersEdit /> },
          { path: 'detail/:id', element: <UsersDetail /> },
        ],
      },
      {
        path: 'dictionary',
        element: <Outlet />,
        children: [
          { index: true, element: <DictionaryTable /> },
          { path: 'add', element: <DictionaryForm /> },
          { path: 'edit/:id', element: <DictionaryForm /> },
          { path: 'review', element: <GlossReview /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routeByRole(user)} replace />,
  },
]
