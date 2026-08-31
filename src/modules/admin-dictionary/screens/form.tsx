import { zodResolver } from '@hookform/resolvers/zod'
import { useAdd, useDetail, useUpdate } from '@topcoder/api/hooks'
import { ContentLoader, Form, FormGrid, FormInput, FormSelect, FormTextarea, GoBack } from '@topcoder/components'
import { Button } from '@topcoder/components/ui'
import { Save } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { type IAdminWord, type IWordPayload, PartOfSpeech, WordSource } from '../admin-dictionary.types'
import { wordSchema, type WordSchemaType } from '../schemas'

const EMPTY: WordSchemaType = {
  arabic: '',
  transcription: '',
  uz: '',
  ru: '',
  en: '',
  description: '',
  pos: PartOfSpeech.NOUN,
}

export default function AdminDictionaryFormScreen() {
  const { t } = useTranslation(['dictionary', 'common', 'form'])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  const { data: word, isLoading } = useDetail<IAdminWord>('words', id, 'words', undefined, isEdit)

  const form = useForm<WordSchemaType>({ resolver: zodResolver(wordSchema), defaultValues: EMPTY })

  useEffect(() => {
    if (!word) return
    form.reset({
      arabic: word.arabic,
      transcription: word.transcription ?? '',
      uz: word.uz ?? '',
      ru: word.ru ?? '',
      en: word.en ?? '',
      description: word.description ?? '',
      pos: word.pos as PartOfSpeech,
    })
  }, [word, form])

  const add = useAdd<IAdminWord, IWordPayload>('/words', ['words'])
  const update = useUpdate<IAdminWord, IWordPayload>('/words', ['words'], 'patch')

  // The corpus owns Quranic spelling; an admin reviews its gloss, not its form.
  const isQuranic = word?.source === WordSource.QURAN

  const posOptions = Object.values(PartOfSpeech).map((value) => ({ id: value, name: t(`pos_label.${value}`) }))

  const onSubmit = (values: WordSchemaType) => {
    const payload: IWordPayload = {
      ...values,
      transcription: values.transcription || undefined,
      uz: values.uz || undefined,
      ru: values.ru || undefined,
      en: values.en || undefined,
      description: values.description || undefined,
    }
    if (isQuranic) delete (payload as Partial<IWordPayload>).arabic

    if (isEdit) update.mutate(payload, id, { onSuccess: () => navigate(-1) })
    else add.mutate(payload, { onSuccess: () => navigate(-1) })
  }

  if (isEdit && isLoading) return <ContentLoader />

  return (
    <div className="space-y-6">
      <GoBack title={isEdit ? t('edit', { ns: 'common' }) : t('add', { ns: 'common' })} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormGrid>
            <FormInput
              control={form.control}
              name="arabic"
              label="arabic"
              isArabic
              disabled={isQuranic}
              inputClassName="font-arabic text-lg"
            />
            <FormInput control={form.control} name="transcription" label="transcription" />
            <FormSelect control={form.control} name="pos" label="pos" options={posOptions} disabled={isQuranic} />
            <FormInput control={form.control} name="uz" label="uz" />
            <FormInput control={form.control} name="ru" label="ru" />
            <FormInput control={form.control} name="en" label="en" />
          </FormGrid>

          <FormTextarea control={form.control} name="description" label="description" rows={4} />

          <Button type="submit" className="gap-2" loading={add.isPending || update.isPending}>
            <Save className="h-4 w-4" /> {t('save', { ns: 'common' })}
          </Button>
        </form>
      </Form>
    </div>
  )
}
