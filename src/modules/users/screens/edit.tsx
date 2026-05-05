import { zodResolver } from '@hookform/resolvers/zod'
import { useData, useDetail, useUpdate } from '@topcoder/api/hooks'
import {
  Form,
  FormGrid,
  FormInput,
  FormPasswordInput,
  FormPhoneInput,
  FormSelect,
  FormSwitch,
  GoBack,
} from '@topcoder/components'
import { Button } from '@topcoder/components/ui'
import { USER_ROLE_LABELS, UserRole } from '@topcoder/constants'
import { userEditSchema, UserEditSchemaType } from '@topcoder/modules/users/schemas'
import { IUser, IUserUpdatePayload } from '@topcoder/modules/users/users.types'
import { IIDName } from '@topcoder/types'
import { Save } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

export default function UsersEditScreen() {
  const { t } = useTranslation(['form', 'common', 'table'])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data: user, isLoading } = useDetail<IUser>('/users', id, ['user', id!])

  const form = useForm<UserEditSchemaType>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      username: '',
      fullName: '',
      phoneNumber: '',
      email: '',
      regionId: '',
      districtId: '',
      role: UserRole.STUDENT,
      changePassword: false,
      password: '',
      confirmPassword: '',
    },
  })

  const isResetting = useRef(false)

  useEffect(() => {
    if (user) {
      isResetting.current = true
      form.reset({
        username: user.username,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        regionId: user.region?.id || '',
        districtId: user.district?.id || '',
        role: user.role,
        changePassword: false,
        password: '',
        confirmPassword: '',
      })
      setTimeout(() => {
        isResetting.current = false
      }, 0)
    }
  }, [user, form])

  const selectedRegionId = useWatch({ control: form.control, name: 'regionId' })
  const changePassword = useWatch({ control: form.control, name: 'changePassword' })

  const { data: regions } = useData<IIDName[]>('/regions/select', 'regions-select')
  const { data: districts } = useData<IIDName[]>(
    '/districts/select',
    ['districts-select', selectedRegionId],
    { regionId: selectedRegionId },
    !!selectedRegionId
  )

  useEffect(() => {
    if (!isResetting.current) {
      form.setValue('districtId', '')
    }
  }, [selectedRegionId, form])

  const roleOptions = Object.values(UserRole).map((role) => ({
    id: role,
    name: USER_ROLE_LABELS[role] || role,
  }))

  const { isPending, mutate } = useUpdate<IUser, IUserUpdatePayload>('/users', ['users', 'user', id!])

  const onSubmit = (data: UserEditSchemaType) => {
    const payload: IUserUpdatePayload = {
      username: data.username,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      regionId: data.regionId,
      districtId: data.districtId,
      role: data.role,
    }

    if (data.changePassword && data.password) {
      payload.password = data.password
    }

    mutate(payload, id, {
      onSuccess: () => navigate(-1),
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <GoBack title={t('edit', { ns: 'common' })} />
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
            <FormSwitch
              control={form.control}
              name="changePassword"
              label={t('change_password', { ns: 'labels' })}
              className="mt-2"
            />
            {changePassword && (
              <>
                <FormPasswordInput
                  control={form.control}
                  name="password"
                  label={t('password', { ns: 'form' })}
                  required
                />
                <FormPasswordInput
                  control={form.control}
                  name="confirmPassword"
                  label={t('confirm_password', { ns: 'labels' })}
                  required
                />
              </>
            )}
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
