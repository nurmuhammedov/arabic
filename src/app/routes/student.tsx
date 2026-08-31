import { AppLayout } from '@topcoder/components'
import { routeByRole } from '@topcoder/lib'
import type { IUser } from '@topcoder/types'
import { lazy } from 'react'
import { Navigate, Outlet, type RouteObject } from 'react-router-dom'

const StudySession = lazy(() => import('@topcoder/modules/study/screens/session'))
const StudyDecks = lazy(() => import('@topcoder/modules/study/screens/decks'))
const DictionaryTable = lazy(() => import('@topcoder/modules/dictionary/screens/table'))
const DictionaryDetail = lazy(() => import('@topcoder/modules/dictionary/screens/detail'))
const SarfForms = lazy(() => import('@topcoder/modules/sarf/screens/forms'))
const SarfFormDetail = lazy(() => import('@topcoder/modules/sarf/screens/form-detail'))
const SarfClasses = lazy(() => import('@topcoder/modules/sarf/screens/classes'))
const SarfClassDetail = lazy(() => import('@topcoder/modules/sarf/screens/class-detail'))
const SarfDerive = lazy(() => import('@topcoder/modules/sarf/screens/derive'))
const PatternFamilies = lazy(() => import('@topcoder/modules/patterns/screens/families'))
const PatternFamily = lazy(() => import('@topcoder/modules/patterns/screens/family'))
const PatternDetail = lazy(() => import('@topcoder/modules/patterns/screens/pattern'))
const PatternDrill = lazy(() => import('@topcoder/modules/patterns/screens/drill'))
const HurufList = lazy(() => import('@topcoder/modules/huruf/screens/list'))
const HurufDetail = lazy(() => import('@topcoder/modules/huruf/screens/detail'))
const NahwTopics = lazy(() => import('@topcoder/modules/nahw/screens/topics'))
const NahwTopicDetail = lazy(() => import('@topcoder/modules/nahw/screens/topic-detail'))
const NahwIrab = lazy(() => import('@topcoder/modules/nahw/screens/irab'))

export const studentRoutes = (user: IUser | null): RouteObject[] => [
  {
    path: 'student',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/student/study" replace /> },
      { path: 'study', element: <StudySession /> },
      { path: 'decks', element: <StudyDecks /> },
      {
        path: 'dictionary',
        element: <Outlet />,
        children: [
          { index: true, element: <DictionaryTable /> },
          { path: 'detail/:id', element: <DictionaryDetail /> },
        ],
      },
      {
        path: 'sarf',
        element: <Outlet />,
        children: [
          { index: true, element: <Navigate to="/student/sarf/forms" replace /> },
          { path: 'forms', element: <SarfForms /> },
          { path: 'forms/:code', element: <SarfFormDetail /> },
          { path: 'classes', element: <SarfClasses /> },
          { path: 'classes/:code', element: <SarfClassDetail /> },
          { path: 'derive', element: <SarfDerive /> },
        ],
      },
      {
        path: 'patterns',
        element: <Outlet />,
        children: [
          { index: true, element: <PatternFamilies /> },
          { path: 'drill', element: <PatternDrill /> },
          { path: 'family/:category', element: <PatternFamily /> },
          { path: ':id', element: <PatternDetail /> },
        ],
      },
      {
        path: 'nahw',
        element: <Outlet />,
        children: [
          { index: true, element: <NahwTopics /> },
          { path: 'irab', element: <NahwIrab /> },
          { path: ':slug', element: <NahwTopicDetail /> },
        ],
      },
      {
        path: 'huruf',
        element: <Outlet />,
        children: [
          { index: true, element: <HurufList /> },
          { path: ':id', element: <HurufDetail /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routeByRole(user)} replace />,
  },
]
