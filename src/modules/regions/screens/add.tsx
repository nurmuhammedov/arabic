import { zodResolver } from '@hookform/resolvers/zod'
import { useAdd } from '@topcoder/api/hooks'
import { Form, FormGrid, FormInput, GoBack } from '@topcoder/components'
import { Button } from '@topcoder/components/ui'
import { IRegion } from '@topcoder/modules/regions/regions.types'
import { regionSchema, RegionSchemaType } from '@topcoder/modules/regions/schemas'
import { Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function RegionsAddScreen() {
  const { t } = useTranslation(['form', 'common'])
  const navigate = useNavigate()

  const form = useForm<RegionSchemaType>({
    resolver: zodResolver(regionSchema),
    defaultValues: {
      name: '',
      soato: '',
    },
  })

  const { isPending, mutate } = useAdd<IRegion, RegionSchemaType>('/regions', ['regions'])

  const onSubmit = (data: RegionSchemaType) => {
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
            <FormInput control={form.control} name="name" label={t('name')} required />
            <FormInput control={form.control} name="soato" label={t('soato')} required />
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
