import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, FormInput, FormPasswordInput } from '@topcoder/components'
import { useActions, useTypedSelector } from '@topcoder/hooks'
import { cn } from '@topcoder/lib'
import { loginSchema } from '@topcoder/modules/auth/schemas'
import { InferType } from '@topcoder/types'
import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export function AdminLoginForm({ className }: ComponentPropsWithoutRef<'form'>) {
  const { t } = useTranslation('auth')
  const { login } = useActions()
  const { isLogging } = useTypedSelector((state) => state.auth)

  const form = useForm<InferType<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  return (
    <Form {...form}>
      <form
        className={cn('flex w-full max-w-sm flex-col gap-6', className)}
        onSubmit={form.handleSubmit((data) => login(data))}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('admin_panel')}</h1>
        </div>

        <div className="grid gap-4">
          <FormInput control={form.control} name="username" label="username" required />
          <FormPasswordInput control={form.control} name="password" label="password" required />
          <Button type="submit" className="w-full" loading={isLogging}>
            {t('sign_in')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
