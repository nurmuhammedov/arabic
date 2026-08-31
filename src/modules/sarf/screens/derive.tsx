import { ContentLoader } from '@topcoder/components'
import { Badge, Button } from '@topcoder/components/ui'
import { cn } from '@topcoder/lib'
import { ArrowRight, Check, Lightbulb, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useDerivation } from '../sarf.api'

/** Deterministic shuffle so the options do not jump around on re-render. */
function shuffle<T>(items: T[], seed: string): T[] {
  const scored = items.map((item, index) => ({
    item,
    score: [...`${seed}${index}`].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) % 100000, 7),
  }))
  return scored.sort((a, b) => a.score - b.score).map((entry) => entry.item)
}

export default function SarfDeriveScreen() {
  const { t } = useTranslation(['sarf', 'common'])
  const { data, isLoading, refetch, isFetching } = useDerivation()
  const [picked, setPicked] = useState<string | null>(null)

  const challenge = data?.challenge ?? null
  const answer = challenge?.answer.uz ?? ''

  const options = useMemo(() => {
    if (!challenge || !answer) return []
    const pool = [answer, ...(data?.distractors ?? []).filter((option) => option && option !== answer)]
    return shuffle(pool.slice(0, 4), challenge.wordId)
  }, [answer, challenge, data?.distractors])

  const next = async () => {
    setPicked(null)
    await refetch()
  }

  if (isLoading) return <ContentLoader />

  if (!data?.available || !challenge) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center">
        <Lightbulb className="size-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">{t('derive_locked')}</h2>
        <p className="text-sm text-muted-foreground">{t('derive_locked_hint')}</p>
        <Button asChild>
          <Link to="/student/study">{t('go_study')}</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold">{t('derive_title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('derive_hint')}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-600/30 bg-emerald-600/5 p-4">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {t('you_know_root')}
          </p>
          <p dir="rtl" className="font-arabic text-2xl font-bold">
            {challenge.root.radicals}
          </p>
          {challenge.root.meaning && <p className="mt-1 text-sm">{challenge.root.meaning}</p>}
        </div>

        <div className="rounded-lg border border-emerald-600/30 bg-emerald-600/5 p-4">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {t('you_know_pattern')}
          </p>
          <p dir="rtl" className="font-arabic text-2xl font-bold">
            {challenge.pattern.wazn}
          </p>
          {challenge.pattern.meaning && <p className="mt-1 text-sm">{challenge.pattern.meaning}</p>}
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t('new_word_is')}</p>
        <p dir="rtl" className="font-arabic text-5xl font-bold">
          {challenge.arabic}
        </p>
        <Badge variant="outline" className="mt-3">
          {t('occurs', { count: challenge.frequency })}
        </Badge>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const isCorrect = option === answer
          const isPicked = option === picked
          const revealed = picked !== null

          return (
            <button
              key={option}
              type="button"
              disabled={revealed}
              onClick={() => setPicked(option)}
              className={cn(
                'flex items-center gap-2 rounded-lg border p-3 text-left text-sm transition-colors',
                !revealed && 'hover:bg-muted/50',
                revealed && isCorrect && 'border-emerald-600 bg-emerald-600/10',
                revealed && isPicked && !isCorrect && 'border-destructive bg-destructive/10'
              )}
            >
              {revealed && isCorrect && <Check className="size-4 shrink-0 text-emerald-600" />}
              {revealed && isPicked && !isCorrect && <X className="size-4 shrink-0 text-destructive" />}
              <span>{option}</span>
            </button>
          )
        })}
      </div>

      {picked !== null && (
        <div className="space-y-3">
          <div className="rounded-lg border p-4 text-sm">
            <p>
              <span dir="rtl" className="font-arabic text-lg">
                {challenge.root.radicals}
              </span>
              <span className="text-muted-foreground"> ({challenge.root.meaning}) + </span>
              <span dir="rtl" className="font-arabic text-lg">
                {challenge.pattern.wazn}
              </span>
              <span className="text-muted-foreground"> ({challenge.pattern.meaning}) = </span>
              <strong>{answer}</strong>
            </p>
            {(challenge.answer.ru || challenge.answer.en) && (
              <p className="mt-2 text-muted-foreground">
                {[challenge.answer.ru, challenge.answer.en].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>

          <Button className="w-full" onClick={() => void next()} loading={isFetching}>
            {t('next_word')}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
