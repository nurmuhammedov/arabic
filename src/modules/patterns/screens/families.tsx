import { ContentLoader } from '@topcoder/components'
import { Badge, Button } from '@topcoder/components/ui'
import { ChevronLeft, Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { usePatternFamilies } from '../patterns.api'

export default function PatternFamiliesScreen() {
  const { t } = useTranslation(['patterns', 'common'])
  const navigate = useNavigate()
  const { data: families, isLoading } = usePatternFamilies()

  if (isLoading) return <ContentLoader />

  const heaviest = Math.max(...(families ?? []).map((family) => family.tokenCount), 1)

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold">{t('title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('hint')}</p>
      </div>

      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
        <p className="text-sm">{t('drill_teaser')}</p>
        <Button asChild className="mt-3">
          <Link to="/student/patterns/drill">
            <Target className="mr-2 size-4" />
            {t('drill_cta')}
          </Link>
        </Button>
      </div>

      <div className="divide-y overflow-hidden rounded-lg border">
        {(families ?? []).map((family) => (
          <button
            key={family.category}
            type="button"
            onClick={() => navigate(`/student/patterns/family/${family.category}`)}
            className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-muted/50"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{t(`category.${family.category}`)}</p>
                <Badge variant="outline">{t('pattern_n', { count: family.patternCount })}</Badge>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{t(`category_hint.${family.category}`)}</p>

              {/* Bar widths are relative to the heaviest family, so the shape of the
                  distribution is visible rather than a row of near-full bars. */}
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.max(2, (family.tokenCount / heaviest) * 100)}%` }}
                  />
                </div>
                <span className="w-28 shrink-0 text-right text-xs text-muted-foreground">
                  {t('share_n', { percent: (family.share * 100).toFixed(1) })}
                </span>
              </div>
            </div>

            <ChevronLeft className="size-4 shrink-0 rotate-180 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}
