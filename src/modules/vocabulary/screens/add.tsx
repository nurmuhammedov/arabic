import { zodResolver } from '@hookform/resolvers/zod'
import { useAdd } from '@topcoder/api/hooks'
import { FormGrid, GoBack } from '@topcoder/components'
import { FormFileInput, FormInput, FormSelect, FormTextarea } from '@topcoder/components/common/form-fields'
import { Button, Form } from '@topcoder/components/ui'
import { FileTypes } from '@topcoder/constants'
import { vocabularySchema } from '@topcoder/modules/vocabulary/schemas'
import { IVocabulary, IVocabularyCreatePayload, VocabularyStatus } from '@topcoder/modules/vocabulary/vocabulary.types'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function VocabularyAddScreen() {
  const { t } = useTranslation(['vocabulary', 'common', 'form'])
  const navigate = useNavigate()

  const form = useForm<IVocabularyCreatePayload>({
    resolver: zodResolver(vocabularySchema),
    defaultValues: {
      arabic: '',
      transcriptionAr: '',
      uzbek: '',
      russian: '',
      english: '',
      transcriptionEn: '',
      status: VocabularyStatus.NEW,
      fileIds: [],
      description: '',
    },
  })

  const { mutate, isPending } = useAdd<IVocabulary, IVocabularyCreatePayload>('vocabulary', 'vocabulary')

  const onSubmit = (data: IVocabularyCreatePayload) => {
    const payload = {
      ...data,
      imageIds: data.imageIds?.length ? data.imageIds : undefined,
      fileIds: data.fileIds?.length ? data.fileIds : undefined,
    }

    mutate(payload, {
      onSuccess: () => {
        navigate(-1)
      },
    })
  }

  return (
    <div className="space-y-6">
      <GoBack title={t('add_title')} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormGrid>
            <FormInput
              control={form.control}
              name="arabic"
              label="arabic"
              required
              isArabic
              className="font-arabic text-right"
            />
            <FormInput control={form.control} name="transcriptionAr" label="transcription_ar" />
            <FormInput control={form.control} name="uzbek" label="uzbek" required />
            <FormInput control={form.control} name="russian" label="russian" />
            <FormInput control={form.control} name="english" label="english" />
            <FormInput control={form.control} name="transcriptionEn" label="transcription_en" />

            <FormSelect
              control={form.control}
              name="status"
              label="status"
              options={Object.values(VocabularyStatus).map((s) => ({
                id: s,
                name: t(`statuses.${s}`),
              }))}
            />

            <FormFileInput
              control={form.control}
              name="imageIds"
              label="image"
              multiple
              accept={[FileTypes.IMAGE]}
              uploadEndpoint="files?module=vocabulary&type=IMAGE"
            />

            <FormFileInput
              control={form.control}
              name="fileIds"
              label="files"
              multiple
              accept={[FileTypes.IMAGE, FileTypes.PDF, FileTypes.AUDIO]}
              uploadEndpoint="files?module=vocabulary&type=PDF"
            />

            <FormTextarea control={form.control} name="description" label="description" className="md:col-span-2" />
          </FormGrid>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              {t('cancel', { ns: 'common' })}
            </Button>
            <Button type="submit" loading={isPending}>
              {t('save', { ns: 'common' })}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
