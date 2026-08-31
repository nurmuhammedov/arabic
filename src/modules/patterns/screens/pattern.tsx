import { ContentLoader, GoBack } from '@topcoder/components'
import { Badge } from '@topcoder/components/ui'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { usePattern } from '../patterns.api'

export default function PatternDetailScreen() {
  const { t } = useTranslation(['patterns', 'common'])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: pattern, isLoading } = usePattern(id)

  if (isLoading) return <ContentLoader />
  if (!pattern) return null

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <GoBack title={pattern.meaningUz ?? pattern.wazn} />

      <div className="rounded-xl border bg-card p-6 text-center">
        <p dir="rtl" className="font-arabic text-4xl font-bold">
          {pattern.wazn}
        </p>
        <p className="mt-3 text-muted-foreground">{pattern.meaningUz}</p>
        <Badge variant="outline" className="mt-3">
          {t(`category.${pattern.category}`)}
        </Badge>

        {pattern.exampleWord && (
          <div className="mt-4 border-t pt-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('model_word')}</p>
            <p dir="rtl" className="font-arabic mt-1 text-2xl">
              {pattern.exampleWord}
            </p>
            {pattern.exampleMeaning && <p className="mt-1 text-sm text-muted-foreground">{pattern.exampleMeaning}</p>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-4 text-center">
          <p className="text-2xl font-semibold">{pattern.words.length}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t('words_shown')}</p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-2xl font-semibold">{pattern.tokenCount}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t('tokens_in_quran')}</p>
        </div>
      </div>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t('quranic_words')}
        </h2>

        <div className="divide-y overflow-hidden rounded-lg border">
          {pattern.words.map((word) => (
            <button
              key={word.id}
              type="button"
              onClick={() => navigate(`/student/dictionary/${word.id}`)}
              className="flex w-full items-center gap-4 p-3 text-left transition-colors hover:bg-muted/50"
            >
              <span dir="rtl" className="font-arabic w-32 shrink-0 text-lg">
                {word.arabic}
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm">{word.uz ?? '—'}</p>
                {word.root && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    <span dir="rtl" className="font-arabic">
                      {word.root.radicals}
                    </span>
                    {word.root.meaningUz ? ` — ${word.root.meaningUz}` : ''}
                  </p>
                )}
              </div>

              <Badge variant="secondary" className="shrink-0">
                {word.frequency}
              </Badge>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
