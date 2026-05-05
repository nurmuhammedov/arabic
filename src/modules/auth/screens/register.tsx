import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, FormInput, FormPasswordInput, FormSelect } from '@topcoder/components'
import { useActions, useDistricts, useRegions, useTypedSelector } from '@topcoder/hooks'
import { cn } from '@topcoder/lib'
import { registerSchema } from '@topcoder/modules/auth/schemas'
import { IIDName, InferType } from '@topcoder/types'
import { ComponentPropsWithoutRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

export function RegisterForm({ className }: ComponentPropsWithoutRef<'div'>) {
  const { t } = useTranslation(['auth', 'common', 'options'])
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
      regionId: '',
      districtId: '',
    },
  })

  const regionId = form.watch('regionId')
  const { data: regions = [] } = useRegions()
  const { data: districts = [] } = useDistricts(regionId)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const onSubmit = (data: InferType<typeof registerSchema>) => {
    register(data)
  }

  return (
    <div className={cn('flex w-full max-w-md flex-col gap-6', className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{t('register')}</h1>
        <p className="text-sm text-muted-foreground">
          {t('already_have_account')}{' '}
          <Link to="/auth/admin" className="underline underline-offset-4">
            {t('sign_in')}
          </Link>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput control={form.control} name="fullName" label={t('full_name', { ns: 'labels' })} required />
            <FormInput control={form.control} name="username" label="username" required />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput control={form.control} name="email" label="email" required />
            <FormInput control={form.control} name="phoneNumber" label={t('phone_number', { ns: 'labels' })} required />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormSelect
              control={form.control}
              name="regionId"
              label={t('region_id', { ns: 'labels' })}
              options={(regions as IIDName[]).map((r) => ({ id: r.id, name: r.name }))}
              required
            />
            <FormSelect
              control={form.control}
              name="districtId"
              label={t('district_id', { ns: 'labels' })}
              options={(districts as IIDName[]).map((d) => ({ id: d.id, name: d.name }))}
              required
              disabled={!regionId}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormPasswordInput
              control={form.control}
              name="password"
              label={t('password', { ns: 'labels' })}
              required
            />
            <FormPasswordInput
              control={form.control}
              name="confirmPassword"
              label={t('confirm_password', { ns: 'auth' })}
              required
            />
          </div>

          <Button type="submit" className="w-full" loading={isLogging}>
            {t('create_account')}
          </Button>
        </form>
      </Form>
    </div>
  )
}
