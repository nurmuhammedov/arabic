import { usePaginatedData, useUpdate } from '@topcoder/api/hooks'
import { ContentLoader, GoBack } from '@topcoder/components'
import { Badge, Button, Input } from '@topcoder/components/ui'
import { Check, SkipForward } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { GlossStatus, type IAdminWord, type IWordPayload } from '../admin-dictionary.types'

interface Draft {
  uz: string
  ru: string
  en: string
}

export default function AdminGlossReviewScreen() {
  const { t } = useTranslation(['dictionary', 'common'])
  const [cursor, setCursor] = useState(0)
  // Edits are kept per word id so skipping ahead and coming back keeps them.
  const [edits, setEdits] = useState<Record<string, Draft>>({})

  // The queue is pulled a page at a time; verifying a word drops it from the
  // next fetch, so the cursor walks forward through what is left.
  const { data, isLoading, totalElements, refetch } = usePaginatedData<IAdminWord>('words', 'words', {
    page: 1,
    limit: 25,
    glossStatus: GlossStatus.DRAFT,
  })

  const word = data?.[cursor]
  const draft: Draft = (word && edits[word.id]) ?? {
    uz: word?.uz ?? '',
    ru: word?.ru ?? '',
    en: word?.en ?? ''
  }

  const setField = (lang: keyof Draft, value: string) => {
    if (word) setEdits({ ...edits, [word.id]: { ...draft, [lang]: value } })
  }

  const save = useUpdate<IAdminWord, IWordPayload>('/words', ['words'], 'patch')
  const verify = useUpdate<IAdminWord, Record<string, never>>('/words', ['words'], 'patch')

  const next = () => setCursor((index) => index + 1)

  const onVerify = async () => {
    if (!word) return
    // Only the glosses go back: the server locks Quranic spelling, and sending
    // `arabic` unchanged would still trip that guard.
    await save.mutateAsync(draft as IWordPayload, word.id)
    await verify.mutateAsync({}, `${word.id}/verify`)
    await refetch()
    setEdits({})
    setCursor(0)
  }

  if (isLoading) return <ContentLoader />

  if (!word) {
    return (
      <div className="space-y-6">
        <GoBack title={t('review_cta')} />
        <div className="rounded-lg border p-10 text-center text-muted-foreground">{t('review_empty')}</div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <GoBack title={t('review_cta')} />

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{t('review_remaining', { count: totalElements })}</span>
        <Badge variant="outline">{word.frequency ? t('frequency_n', { count: word.frequency }) : '-'}</Badge>
      </div>

      <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
        <p dir="rtl" className="font-arabic text-4xl font-bold">
          {word.arabic}
        </p>
        {word.transcription && <p className="mt-2 text-muted-foreground">{word.transcription}</p>}
        {word.root && (
          <p className="mt-3 text-sm text-muted-foreground">
            <span dir="rtl" className="font-arabic text-base">
              {word.root.radicals}
            </span>
            {word.root.meaningUz ? ` — ${word.root.meaningUz}` : ''}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {(['uz', 'ru', 'en'] as const).map((lang) => (
          <div key={lang}>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t(lang)}
            </label>
            <Input value={draft[lang]} onChange={(event) => setField(lang, event.target.value)} />
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button className="flex-1 gap-2" onClick={() => void onVerify()} loading={save.isPending || verify.isPending}>
          <Check className="size-4" /> {t('verify')}
        </Button>
        <Button variant="outline" className="gap-2" onClick={next}>
          <SkipForward className="size-4" /> {t('skip')}
        </Button>
      </div>
    </div>
  )
}
