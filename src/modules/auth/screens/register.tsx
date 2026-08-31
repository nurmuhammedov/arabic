import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, FormInput, FormPasswordInput } from '@topcoder/components'
import { useActions, useTypedSelector } from '@topcoder/hooks'
import { cn } from '@topcoder/lib'
import { registerSchema } from '@topcoder/modules/auth/schemas'
import type { InferType } from '@topcoder/types'
import { type ComponentPropsWithoutRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

export function RegisterForm({ className }: ComponentPropsWithoutRef<'div'>) {
  const { t } = useTranslation(['auth', 'common', 'labels'])
  const { register } = useActions()
  const navigate = useNavigate()
  const { isLogging, user } = useTypedSelector((state) => state.auth)

  const form = useForm<InferType<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phoneNumber: '',
      email: '',
    },
  })

  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  return (
    <div className={cn('flex w-full max-w-md flex-col gap-6', className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{t('register')}</h1>
        <p className="text-sm text-muted-foreground">
          {t('already_have_account')}{' '}
          <Link to="/auth/login" className="underline underline-offset-4">
            {t('sign_in')}
          </Link>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => register(data))} className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput control={form.control} name="fullName" label="full_name" required />
            <FormInput control={form.control} name="username" label="username" required />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput control={form.control} name="email" label="email" type="email" required />
            <FormInput control={form.control} name="phoneNumber" label="phone_number" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormPasswordInput control={form.control} name="password" label="password" required />
            <FormPasswordInput control={form.control} name="confirmPassword" label="confirm_password" required />
          </div>

          <Button type="submit" className="w-full" loading={isLogging}>
            {t('create_account')}
          </Button>
        </form>
      </Form>
    </div>
  )
}
