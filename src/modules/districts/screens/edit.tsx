import { zodResolver } from '@hookform/resolvers/zod'
import { useData, useDetail, useUpdate } from '@topcoder/api/hooks'
import { Form, FormGrid, FormInput, FormSelect, GoBack } from '@topcoder/components'
import { Button } from '@topcoder/components/ui'
import { IDistrict } from '@topcoder/modules/districts/districts.types'
import { districtSchema, DistrictSchemaType } from '@topcoder/modules/districts/schemas'
import { IIDName } from '@topcoder/types'
import { Save } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

export default function DistrictsEditScreen() {
  const { t } = useTranslation(['form', 'common', 'table'])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data: regions } = useData<IIDName[]>('/regions/select', 'regions-select')
  const { data: district, isLoading } = useDetail<IDistrict>('/districts', id, ['district', id!])

  const form = useForm<DistrictSchemaType>({
    resolver: zodResolver(districtSchema),
    defaultValues: {
      name: '',
      soato: '',
      regionId: '',
    },
  })

  useEffect(() => {
    if (district) {
      form.reset({
        name: district.name,
        soato: district.soato,
        regionId: district.region?.id || '',
      })
    }
  }, [district, form])

  const { isPending, mutate } = useUpdate<IDistrict, DistrictSchemaType>('/districts', ['districts', 'district', id!])

  const onSubmit = (data: DistrictSchemaType) => {
    mutate(data, id, {
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
            <FormSelect
              control={form.control}
              name="regionId"
              label={t('region', { ns: 'table' })}
              options={regions || []}
              required
            />
            <FormInput control={form.control} name="name" label={t('name', { ns: 'common' })} required />
            <FormInput control={form.control} name="soato" label={t('soato', { ns: 'table' })} required />
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
