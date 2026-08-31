import { ContentLoader, GoBack } from '@topcoder/components'
import { Badge } from '@topcoder/components/ui'
import { ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { usePatterns } from '../patterns.api'
import type { PatternCategory } from '../patterns.types'

export default function PatternFamilyScreen() {
  const { t } = useTranslation(['patterns', 'common'])
  const navigate = useNavigate()
  const { category } = useParams<{ category: string }>()
  const { data: patterns, isLoading } = usePatterns(category as PatternCategory)

  if (isLoading) return <ContentLoader />

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <GoBack title={t(`category.${category}`)} />

      <p className="text-sm text-muted-foreground">{t(`category_hint.${category}`)}</p>

      <div className="divide-y overflow-hidden rounded-lg border">
        {(patterns ?? []).map((pattern) => (
          <button
            key={pattern.id}
            type="button"
            onClick={() => navigate(`/student/patterns/${pattern.id}`)}
            className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-muted/50"
          >
            <span dir="rtl" className="font-arabic w-28 shrink-0 text-2xl">
              {pattern.wazn}
            </span>

            <div className="min-w-0 flex-1">
              <p className="font-medium">{pattern.meaningUz}</p>
              {pattern.exampleWord && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  <span dir="rtl" className="font-arabic text-base">
                    {pattern.exampleWord}
                  </span>
                  {pattern.exampleMeaning ? ` — ${pattern.exampleMeaning}` : ''}
                </p>
              )}
            </div>

            <Badge variant="outline" className="shrink-0">
              {t('word_n', { count: pattern.wordCount })}
            </Badge>
            <ChevronLeft className="size-4 shrink-0 rotate-180 text-muted-foreground" />
          </button>
        ))}
      </div>

      {!patterns?.length && (
        <div className="rounded-lg border p-8 text-center text-muted-foreground">{t('family_empty')}</div>
      )}
    </div>
  )
}
