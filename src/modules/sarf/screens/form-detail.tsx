import { ContentLoader, GoBack, RichText } from '@topcoder/components'
import { Badge } from '@topcoder/components/ui'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useVerbForm } from '../sarf.api'

interface PatternCellProps {
  label: string
  value: string | null
}

function PatternCell({ label, value }: PatternCellProps) {
  if (!value) return null

  return (
    <div className="rounded-lg border p-3 text-center">
      <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p dir="rtl" className="font-arabic text-xl font-semibold">
        {value}
      </p>
    </div>
  )
}

export default function SarfFormDetailScreen() {
  const { t } = useTranslation('sarf')
  const { code } = useParams<{ code: string }>()
  const { data: form, isLoading } = useVerbForm(code)

  if (isLoading) return <ContentLoader />
  if (!form) return null

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <GoBack title={form.code} />

      <div className="rounded-xl border bg-card p-6 text-center">
        <div className="flex items-center justify-center gap-4">
          <p dir="rtl" className="font-arabic text-4xl font-bold">
            {form.pastPattern}
          </p>
          <span className="text-2xl text-muted-foreground">·</span>
          <p dir="rtl" className="font-arabic text-4xl font-bold text-muted-foreground">
            {form.presentPattern}
          </p>
        </div>

        {form.exampleWord && (
          <p className="mt-3 text-muted-foreground">
            <span dir="rtl" className="font-arabic text-lg">
              {form.exampleWord}
            </span>
            {form.exampleMeaning && <span> — {form.exampleMeaning}</span>}
          </p>
        )}

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Badge variant="outline">{t(`category.${form.category}`)}</Badge>
          {form.tokenCount > 0 ? (
            <Badge variant="info">{t('form_weight', { verbs: form.lemmaCount, tokens: form.tokenCount })}</Badge>
          ) : (
            <Badge variant="outline">{t('not_in_quran')}</Badge>
          )}
        </div>
      </div>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t('derived_forms')}
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <PatternCell label={t('masdar')} value={form.masdarPattern} />
          <PatternCell label={t('active_participle')} value={form.activeParticiplePattern} />
          <PatternCell label={t('passive_participle')} value={form.passiveParticiplePattern} />
          <PatternCell label={t('imperative')} value={form.imperativePattern} />
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t('explanation')}
        </h2>
        <div className="rounded-lg border p-4">
          <RichText>{form.meaningUz}</RichText>
        </div>
      </section>

      {form.examples.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('quran_examples')}
          </h2>
          <div className="divide-y rounded-lg border">
            {form.examples.map((example) => (
              <div key={example.id} className="flex items-center gap-4 p-3">
                <span dir="rtl" className="font-arabic w-32 shrink-0 text-xl">
                  {example.arabic}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm">{example.uz ?? '—'}</span>
                {example.root && (
                  <span dir="rtl" className="font-arabic shrink-0 text-sm text-muted-foreground">
                    {example.root.radicals}
                  </span>
                )}
                <Badge variant="outline">{example.frequency}</Badge>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
