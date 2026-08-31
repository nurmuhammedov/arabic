import { useDetail } from '@topcoder/api/hooks'
import { ContentLoader, GoBack } from '@topcoder/components'
import { Badge } from '@topcoder/components/ui'
import { cn } from '@topcoder/lib'
import { highlightAyah } from '@topcoder/modules/study/lib/highlight'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import type { IWordDetail } from '../dictionary.types'

export default function DictionaryDetailScreen() {
  const { t } = useTranslation(['dictionary', 'common'])
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: word, isLoading } = useDetail<IWordDetail>('words', id)

  if (isLoading) return <ContentLoader />
  if (!word) return null

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <GoBack title={word.arabic} />

      <div className="rounded-xl border bg-card p-6 text-center">
        <p dir="rtl" className="font-arabic text-6xl font-bold leading-tight">
          {word.arabic}
        </p>
        {word.transcription && <p className="mt-2 text-muted-foreground">[{word.transcription}]</p>}

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Badge variant="outline">{t('occurs', { count: word.frequency })}</Badge>
          {word.frequencyRank && <Badge variant="outline">#{word.frequencyRank}</Badge>}
          {word.cumulativeCoverage !== null && (
            <Badge variant="info">{t('coverage_upto', { value: (word.cumulativeCoverage * 100).toFixed(1) })}</Badge>
          )}
        </div>

        <div className="mt-5 space-y-1.5 text-left">
          {(['uz', 'ru', 'en'] as const).map((lang) =>
            word[lang] ? (
              <div key={lang} className="flex items-baseline gap-3">
                <span className="w-6 shrink-0 text-xs font-semibold uppercase text-muted-foreground">{lang}</span>
                <span className="text-lg">{word[lang]}</span>
              </div>
            ) : null
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {word.root && (
          <div className="rounded-lg border p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t('root')}</p>
            <p dir="rtl" className="font-arabic text-3xl font-bold">
              {word.root.radicals}
            </p>
            {word.root.meaningUz && <p className="mt-1 text-sm text-muted-foreground">{word.root.meaningUz}</p>}
          </div>
        )}
        {word.pattern && (
          <div className="rounded-lg border p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t('pattern')}</p>
            <p dir="rtl" className="font-arabic text-3xl font-bold">
              {word.pattern.wazn}
            </p>
            {word.pattern.meaningUz && <p className="mt-1 text-sm text-muted-foreground">{word.pattern.meaningUz}</p>}
          </div>
        )}
      </div>

      {word.family.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t('family')}</h2>
          <div className="divide-y rounded-lg border">
            {word.family.map((sibling) => (
              <button
                key={sibling.id}
                type="button"
                onClick={() => navigate(`/student/dictionary/detail/${sibling.id}`)}
                className="flex w-full items-center justify-between gap-4 p-3 text-left transition-colors hover:bg-muted/50"
              >
                <span dir="rtl" className="font-arabic text-2xl">
                  {sibling.arabic}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{sibling.uz || '—'}</span>
                <Badge variant="outline">{sibling.frequency}</Badge>
              </button>
            ))}
          </div>
        </section>
      )}

      {word.occurrences.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('in_the_quran')}
          </h2>
          <div className="space-y-3">
            {word.occurrences.map((occurrence) => {
              const tokens = highlightAyah(occurrence.text, occurrence.surfaceForm)
              return (
                <div key={`${occurrence.sura}:${occurrence.ayah}`} className="rounded-lg border bg-muted/20 p-4">
                  <p className="mb-1.5 text-xs text-muted-foreground">
                    {occurrence.sura}:{occurrence.ayah}
                  </p>
                  <p dir="rtl" className="font-arabic text-xl leading-loose">
                    {tokens.map(({ key, token, match }) => (
                      <span key={key} className={cn(match && 'rounded bg-primary/15 px-1 font-bold text-primary')}>
                        {token}{' '}
                      </span>
                    ))}
                  </p>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
