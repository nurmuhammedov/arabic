import { AppLayout } from '@topcoder/components'
import { routeByRole } from '@topcoder/lib'
import { IUser } from '@topcoder/types'
import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const VocabularyTableScreen = lazy(() => import('@topcoder/modules/vocabulary/screens/table'))
const VocabularyAddScreen = lazy(() => import('@topcoder/modules/vocabulary/screens/add'))
const VocabularyEditScreen = lazy(() => import('@topcoder/modules/vocabulary/screens/edit'))
const VocabularyDetailScreen = lazy(() => import('@topcoder/modules/vocabulary/screens/detail'))

export const studentRoutes = (user: IUser | null): RouteObject[] => [
  {
    path: 'student',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={routeByRole(user)} replace />,
      },
      {
        path: 'vocabulary',
        children: [
          {
            index: true,
            element: <VocabularyTableScreen />,
          },
          {
            path: 'add',
            element: <VocabularyAddScreen />,
          },
          {
            path: 'edit/:id',
            element: <VocabularyEditScreen />,
          },
          {
            path: 'detail/:id',
            element: <VocabularyDetailScreen />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routeByRole(user)} replace />,
  },
]
