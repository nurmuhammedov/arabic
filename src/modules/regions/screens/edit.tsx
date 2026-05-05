import { zodResolver } from '@hookform/resolvers/zod'
import { useDetail, useUpdate } from '@topcoder/api/hooks'
import { Form, FormGrid, FormInput, GoBack } from '@topcoder/components'
import { Button } from '@topcoder/components/ui'
import { IRegion } from '@topcoder/modules/regions/regions.types'
import { regionSchema, RegionSchemaType } from '@topcoder/modules/regions/schemas'
import { Save } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

export default function RegionsEditScreen() {
  const { t } = useTranslation(['form', 'common'])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data: region, isLoading } = useDetail<IRegion>('/regions', id, ['region', id!])

  const form = useForm<RegionSchemaType>({
    resolver: zodResolver(regionSchema),
    defaultValues: {
      name: '',
      soato: '',
    },
  })

  useEffect(() => {
    if (region) {
      form.reset({
        name: region.name,
        soato: region.soato,
      })
    }
  }, [region, form])

  const { isPending, mutate } = useUpdate<IRegion, RegionSchemaType>('/regions', ['regions', 'region', id!])

  const onSubmit = (data: RegionSchemaType) => {
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
