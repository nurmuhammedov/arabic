import { ContentLoader, GoBack, RichText } from '@topcoder/components'
import { Badge } from '@topcoder/components/ui'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useRootClass } from '../sarf.api'

export default function SarfClassDetailScreen() {
  const { t } = useTranslation('sarf')
  const { code } = useParams<{ code: string }>()
  const { data: rootClass, isLoading } = useRootClass(code)

  if (isLoading) return <ContentLoader />
  if (!rootClass) return null

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <GoBack title={rootClass.nameUz} />

      <div className="rounded-xl border bg-card p-6 text-center">
        <p dir="rtl" className="font-arabic text-4xl font-bold">
          {rootClass.nameAr}
        </p>
        <p className="mt-2 text-muted-foreground">{rootClass.nameUz}</p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Badge variant="outline">{t('root_count', { count: rootClass.rootCount })}</Badge>
          <Badge variant="info">{t('tokens', { count: rootClass.tokenCount })}</Badge>
        </div>
      </div>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t('what_is_it')}
        </h2>
        <div className="rounded-lg border p-4">
          <RichText>{rootClass.definitionUz}</RichText>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t('what_changes')}
        </h2>
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <RichText>{rootClass.ruleUz}</RichText>
        </div>
      </section>

      {rootClass.exampleNote && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t('example')}</h2>
          <div className="rounded-lg border p-4">
            <RichText>{rootClass.exampleNote}</RichText>
          </div>
        </section>
      )}

      {rootClass.roots.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('most_frequent_roots')}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {rootClass.roots.map((root) => (
              <div key={root.id} className="flex items-center gap-3 rounded-lg border p-3">
                <span dir="rtl" className="font-arabic text-xl">
                  {root.radicals}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                  {root.meaningUz ?? '—'}
                </span>
                <Badge variant="outline">{root.occurrenceCount}</Badge>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
