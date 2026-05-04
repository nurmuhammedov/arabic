import { superadminRoutes } from '@topcoder/app/routes/superadmin'
import { studentRoutes } from '@topcoder/app/routes/student'
import { FullPageLoader } from '@topcoder/components'
import { UserRole } from '@topcoder/constants'
import { useTypedSelector } from '@topcoder/hooks'
import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useRoutes } from 'react-router-dom'

const AuthLayout = lazy(() => import('@topcoder/components').then((module) => ({ default: module.AuthLayout })))
const AdminLoginForm = lazy(() =>
  import('@topcoder/modules/auth/screens/login').then((module) => ({ default: module.AdminLoginForm }))
)
const RegisterForm = lazy(() =>
  import('@topcoder/modules/auth/screens/register').then((module) => ({ default: module.RegisterForm }))
)

export const useAppRoutes = () => {
  const { t } = useTranslation()
  const { user, isLoading } = useTypedSelector((state) => state.auth)

  const authRoutes = [
    {
      path: 'auth',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={`/auth/login`} replace />,
        },
        {
          path: 'login',
          element: <AdminLoginForm />,
        },
        {
          path: 'register',
          element: <RegisterForm />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={`/auth/login`} replace />,
    },
  ]

  const roleRoutes = {
    [UserRole.ADMIN]: superadminRoutes(user),
    [UserRole.STUDENT]: studentRoutes(user),
  }

  const activeRoutes = user?.role ? roleRoutes[user.role] : authRoutes

  const element = useRoutes(activeRoutes)

  if (isLoading) {
    return <FullPageLoader text={t('data_is_loading')} />
  }

  return <Suspense fallback={<FullPageLoader text={t('data_is_loading')} />}>{element}</Suspense>
}
