import { zodResolver } from '@hookform/resolvers/zod'
import { useDetail, useUpdate } from '@topcoder/api/hooks'
import { FormGrid, GoBack } from '@topcoder/components'
import { FormFileInput, FormInput, FormSelect, FormTextarea } from '@topcoder/components/common/form-fields'
import { Button, Form } from '@topcoder/components/ui'
import { FileTypes } from '@topcoder/constants'
import { vocabularySchema } from '@topcoder/modules/vocabulary/schemas'
import { IVocabulary, IVocabularyCreatePayload, VocabularyStatus } from '@topcoder/modules/vocabulary/vocabulary.types'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

export default function VocabularyEditScreen() {
  const { t } = useTranslation(['vocabulary', 'common', 'form'])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data: vocabulary, isLoading } = useDetail<IVocabulary>('vocabulary', id, ['vocabulary', id!])

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

  useEffect(() => {
    if (vocabulary) {
      form.reset({
        arabic: vocabulary.arabic,
        transcriptionAr: vocabulary.transcriptionAr || '',
        uzbek: vocabulary.uzbek,
        russian: vocabulary.russian || '',
        english: vocabulary.english || '',
        transcriptionEn: vocabulary.transcriptionEn || '',
        status: vocabulary.status,
        imageIds: vocabulary.images?.map((f) => f.id) || [],
        fileIds: vocabulary.files?.map((f) => f.id) || [],
        description: vocabulary.description || '',
      })
    }
  }, [vocabulary, form])

  const { mutate, isPending } = useUpdate<IVocabulary, IVocabularyCreatePayload>('vocabulary', ['vocabulary', id!])

  const onSubmit = (data: IVocabularyCreatePayload) => {
    const payload = {
      ...data,
      imageIds: data.imageIds?.length ? data.imageIds : undefined,
      fileIds: data.fileIds?.length ? data.fileIds : undefined,
    }

    mutate(payload, id, {
      onSuccess: () => {
        navigate(-1)
      },
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <GoBack title={t('edit_title')} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormGrid>
            <FormInput
              control={form.control}
              name="arabic"
              label="arabic"
              required
              className="font-arabic text-right text-lg"
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
              initialFilesData={vocabulary?.images?.map((f) => ({
                ...f,
                url: f.path,
                originalName: f.name,
              }))}
            />

            <FormFileInput
              control={form.control}
              name="fileIds"
              label="files"
              multiple
              accept={[FileTypes.IMAGE, FileTypes.PDF, FileTypes.AUDIO]}
              uploadEndpoint="files?module=vocabulary&type=PDF"
              initialFilesData={vocabulary?.files?.map((f) => ({
                ...f,
                url: f.path,
                originalName: f.name,
              }))}
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
