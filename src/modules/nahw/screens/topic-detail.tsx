import { ContentLoader, GoBack, RichText } from '@topcoder/components'
import { Badge } from '@topcoder/components/ui'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useNahwTopic } from '../nahw.api'

export default function NahwTopicDetailScreen() {
  const { t } = useTranslation('nahw')
  const { slug } = useParams<{ slug: string }>()
  const { data: topic, isLoading } = useNahwTopic(slug)

  if (isLoading) return <ContentLoader />
  if (!topic) return null

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <GoBack title={topic.titleUz} />

      <div className="rounded-xl border bg-card p-6 text-center">
        <p dir="rtl" className="font-arabic text-4xl font-bold">
          {topic.titleAr}
        </p>
        <p className="mt-3 text-muted-foreground">{topic.summaryUz}</p>
        <Badge variant="outline" className="mt-3">
          {t(`kind.${topic.kind}`)}
        </Badge>
      </div>

      <div className="rounded-lg border p-5">
        <RichText className="text-[0.95rem]">{topic.bodyUz}</RichText>
      </div>

      {topic.example && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('example_verse')} · {topic.example.sura}:{topic.example.ayah}
          </h2>
          <div className="rounded-lg border bg-muted/20 p-4">
            <p dir="rtl" className="font-arabic text-2xl leading-loose">
              {topic.example.text}
            </p>
            {topic.exampleNoteUz && (
              <div className="mt-3 border-t pt-3">
                <RichText>{topic.exampleNoteUz}</RichText>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
