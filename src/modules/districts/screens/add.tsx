import { zodResolver } from '@hookform/resolvers/zod'
import { useAdd, useData } from '@topcoder/api/hooks'
import { Form, FormGrid, FormInput, FormSelect, GoBack } from '@topcoder/components'
import { Button } from '@topcoder/components/ui'
import { IDistrict } from '@topcoder/modules/districts/districts.types'
import { districtSchema, DistrictSchemaType } from '@topcoder/modules/districts/schemas'
import { IIDName } from '@topcoder/types'
import { Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function DistrictsAddScreen() {
  const { t } = useTranslation(['form', 'common', 'table'])
  const navigate = useNavigate()

  const { data: regions } = useData<IIDName[]>('/regions/select', 'regions-select')

  const form = useForm<DistrictSchemaType>({
    resolver: zodResolver(districtSchema),
    defaultValues: {
      name: '',
      soato: '',
      regionId: '',
    },
  })

  const { isPending, mutate } = useAdd<IDistrict, DistrictSchemaType>('/districts', ['districts'])

  const onSubmit = (data: DistrictSchemaType) => {
    mutate(data, {
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
