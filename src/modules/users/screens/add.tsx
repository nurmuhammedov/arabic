import { zodResolver } from '@hookform/resolvers/zod'
import { useAdd, useData } from '@topcoder/api/hooks'
import { Form, FormGrid, FormInput, FormPasswordInput, FormPhoneInput, FormSelect, GoBack } from '@topcoder/components'
import { Button } from '@topcoder/components/ui'
import { USER_ROLE_LABELS, UserRole } from '@topcoder/constants'
import { userSchema, UserSchemaType } from '@topcoder/modules/users/schemas'
import { IUser, IUserCreatePayload } from '@topcoder/modules/users/users.types'
import { IIDName } from '@topcoder/types'
import { Save } from 'lucide-react'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function UsersAddScreen() {
  const { t } = useTranslation(['form', 'common', 'table'])
  const navigate = useNavigate()

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: '',
      fullName: '',
      phoneNumber: '',
      email: '',
      regionId: '',
      districtId: '',
      role: UserRole.STUDENT,
      password: '',
      confirmPassword: '',
    },
  })

  const selectedRegionId = useWatch({ control: form.control, name: 'regionId' })

  const { data: regions } = useData<IIDName[]>('/regions/select', 'regions-select')
  const { data: districts } = useData<IIDName[]>(
    '/districts/select',
    ['districts-select', selectedRegionId],
    { regionId: selectedRegionId },
    !!selectedRegionId
  )

  useEffect(() => {
    form.setValue('districtId', '')
  }, [selectedRegionId, form])

  const roleOptions = Object.values(UserRole).map((role) => ({
    id: role,
    name: USER_ROLE_LABELS[role] || role,
  }))

  const { isPending, mutate } = useAdd<IUser, IUserCreatePayload>('/users', ['users'])

  const onSubmit = (data: UserSchemaType) => {
    const payload: IUserCreatePayload = {
      username: data.username,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      regionId: data.regionId,
      districtId: data.districtId,
      role: data.role,
      password: data.password,
    }

    mutate(payload, {
      onSuccess: () => navigate(-1),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <GoBack title={t('add', { ns: 'common' })} />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormGrid>
            <FormInput control={form.control} name="fullName" label={t('full_name', { ns: 'form' })} required />
            <FormInput control={form.control} name="username" label={t('username', { ns: 'form' })} required />
            <FormInput control={form.control} name="email" label={t('email', { ns: 'form' })} required />
            <FormPhoneInput
              control={form.control}
              name="phoneNumber"
              label={t('phone_number', { ns: 'form' })}
              required
            />
            <FormSelect
              control={form.control}
              name="role"
              label={t('role', { ns: 'form' })}
              options={roleOptions}
              required
            />
            <FormSelect
              control={form.control}
              name="regionId"
              label={t('region_id', { ns: 'labels' })}
              options={regions || []}
              required
            />
            <FormSelect
              control={form.control}
              name="districtId"
              label={t('district_id', { ns: 'labels' })}
              options={districts || []}
              required
              disabled={!selectedRegionId}
            />
            <FormPasswordInput control={form.control} name="password" label={t('password', { ns: 'form' })} required />
            <FormPasswordInput
              control={form.control}
              name="confirmPassword"
              label={t('confirm_password', { ns: 'labels' })}
              required
            />
          </FormGrid>

          <div className="flex justify-end">
            <Button type="submit" loading={isPending}>
              <Save className="mr-2 h-4 w-4" />
              {t('save', { ns: 'common' })}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
