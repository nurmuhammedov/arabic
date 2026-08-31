import { ContentLoader } from '@topcoder/components'
import { Badge, Button } from '@topcoder/components/ui'
import { ChevronLeft, Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { useNahwTopics } from '../nahw.api'
import { NahwTopicKind } from '../nahw.types'

const KIND_ORDER: NahwTopicKind[] = [
  NahwTopicKind.CASE,
  NahwTopicKind.SENTENCE,
  NahwTopicKind.STRUCTURE,
  NahwTopicKind.ROLE,
]

export default function NahwTopicsScreen() {
  const { t } = useTranslation('nahw')
  const navigate = useNavigate()
  const { data: topics, isLoading } = useNahwTopics()

  if (isLoading) return <ContentLoader />

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold">{t('title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('hint')}</p>
      </div>

      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
        <p className="text-sm">{t('drill_teaser')}</p>
        <Button asChild className="mt-3">
          <Link to="/student/nahw/irab">
            <Target className="mr-2 size-4" />
            {t('drill_cta')}
          </Link>
        </Button>
      </div>

      {KIND_ORDER.map((kind) => {
        const group = (topics ?? []).filter((topic) => topic.kind === kind)
        if (!group.length) return null

        return (
          <section key={kind}>
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {t(`kind.${kind}`)}
              </h2>
              <Badge variant="outline">{group.length}</Badge>
            </div>

            <div className="divide-y overflow-hidden rounded-lg border">
              {group.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => navigate(`/student/nahw/${topic.slug}`)}
                  className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-muted/50"
                >
                  <span dir="rtl" className="font-arabic w-28 shrink-0 text-xl">
                    {topic.titleAr}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{topic.titleUz}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{topic.summaryUz}</p>
                  </div>

                  <ChevronLeft className="size-4 shrink-0 rotate-180 text-muted-foreground" />
                </button>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
