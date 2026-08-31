import { ContentLoader } from '@topcoder/components'
import { Badge, Button } from '@topcoder/components/ui'
import { cn } from '@topcoder/lib'
import { ArrowRight, Check, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { usePatternDrill, usePatternFamilies } from '../patterns.api'
import type { PatternCategory } from '../patterns.types'

export default function PatternDrillScreen() {
  const { t } = useTranslation(['patterns', 'common'])
  const [category, setCategory] = useState<PatternCategory | undefined>()
  const [picked, setPicked] = useState<string | null>(null)

  const { data: families } = usePatternFamilies()
  const { data: drill, isLoading, isFetching, refetch } = usePatternDrill(category)

  const next = async () => {
    setPicked(null)
    await refetch()
  }

  if (isLoading) return <ContentLoader />
  if (!drill) return null

  const revealed = picked !== null
  const correct = picked === drill.answerId

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <div>
        <h1 className="text-xl font-semibold">{t('drill_title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('drill_hint')}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => {
            setCategory(undefined)
            setPicked(null)
          }}
          className={cn(
            'rounded-full border px-3 py-1 text-xs transition-colors',
            !category ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted'
          )}
        >
          {t('all_families')}
        </button>
        {(families ?? []).map((family) => (
          <button
            key={family.category}
            type="button"
            onClick={() => {
              setCategory(family.category)
              setPicked(null)
            }}
            className={cn(
              'rounded-full border px-3 py-1 text-xs transition-colors',
              category === family.category
                ? 'border-primary bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            )}
          >
            {t(`category.${family.category}`)} · {family.patternCount}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
        {drill.word ? (
          <>
            <p dir="rtl" className="font-arabic text-4xl font-bold">
              {drill.word.arabic}
            </p>
            <p className="mt-2 text-muted-foreground">{drill.word.uz}</p>
            {drill.word.radicals && (
              <p className="mt-3 text-sm text-muted-foreground">
                {t('from_root')}{' '}
                <span dir="rtl" className="font-arabic text-base text-foreground">
                  {drill.word.radicals}
                </span>
                {drill.word.rootMeaningUz ? ` — ${drill.word.rootMeaningUz}` : ''}
              </p>
            )}
          </>
        ) : (
          <p dir="rtl" className="font-arabic text-4xl font-bold">
            {drill.wazn}
          </p>
        )}

        <p className="mt-4 border-t pt-4 text-sm text-muted-foreground">{t('which_shape')}</p>
      </div>

      <div className="space-y-2">
        {drill.options.map((option) => {
          const isAnswer = option.id === drill.answerId
          const isPicked = option.id === picked

          return (
            <button
              key={option.id}
              type="button"
              disabled={revealed}
              onClick={() => setPicked(option.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors',
                !revealed && 'hover:bg-muted/50',
                revealed && isAnswer && 'border-emerald-600 bg-emerald-600/10',
                revealed && isPicked && !isAnswer && 'border-destructive bg-destructive/10'
              )}
            >
              <span dir="rtl" className="font-arabic w-24 shrink-0 text-xl">
                {option.wazn}
              </span>
              <span className="min-w-0 flex-1 text-sm">{option.meaningUz}</span>
              {revealed && isAnswer && <Check className="size-4 shrink-0 text-emerald-600" />}
              {revealed && isPicked && !isAnswer && <X className="size-4 shrink-0 text-destructive" />}
            </button>
          )
        })}
      </div>

      {revealed ? (
        <div className="space-y-3">
          <div
            className={cn(
              'rounded-lg border p-4',
              correct ? 'border-emerald-600/40 bg-emerald-600/5' : 'border-destructive/40 bg-destructive/5'
            )}
          >
            <p className="font-medium">{correct ? t('correct') : t('incorrect')}</p>
            <p className="mt-2 text-sm">
              <span dir="rtl" className="font-arabic text-lg">
                {drill.wazn}
              </span>
              {' — '}
              {t(`category.${drill.category}`)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{t(`category_hint.${drill.category}`)}</p>
          </div>

          <Button className="w-full" onClick={() => void next()} loading={isFetching}>
            {t('next_word')}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      ) : (
        <div className="flex justify-center">
          <Badge variant="outline">{t('pick_one')}</Badge>
        </div>
      )}
    </div>
  )
}
