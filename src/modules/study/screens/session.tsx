import { ContentLoader } from '@topcoder/components'
import { Badge, Button } from '@topcoder/components/ui'
import { cn } from '@topcoder/lib'
import { BookOpen, Check, RotateCcw, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { highlightAyah } from '../lib/highlight'
import { useAnswer, useSession, useStudyStats } from '../study.api'
import { type ISessionCard,ReviewGrade } from '../study.types'

const GRADES = [
  { grade: ReviewGrade.AGAIN, key: 'again', hotkey: '1', className: 'bg-destructive hover:bg-destructive/90' },
  { grade: ReviewGrade.HARD, key: 'hard', hotkey: '2', className: 'bg-amber-500 hover:bg-amber-500/90' },
  { grade: ReviewGrade.GOOD, key: 'good', hotkey: '3', className: 'bg-emerald-600 hover:bg-emerald-600/90' },
  { grade: ReviewGrade.EASY, key: 'easy', hotkey: '4', className: 'bg-sky-600 hover:bg-sky-600/90' },
] as const

const LANGUAGE_LABELS: Record<string, string> = { uz: 'uz', ru: 'ru', en: 'en' }

function AyahExample({ card }: { card: ISessionCard }) {
  const { t } = useTranslation('study')
  if (!card.example) return null

  const tokens = highlightAyah(card.example.text, card.example.surfaceForm)

  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {t('in_the_quran')} · {card.example.sura}:{card.example.ayah}
      </p>
      <p dir="rtl" className="font-arabic text-2xl leading-loose">
        {tokens.map(({ key, token, match }) => (
          <span key={key} className={cn(match && 'rounded bg-primary/15 px-1 font-bold text-primary')}>
            {token}{' '}
          </span>
        ))}
      </p>
    </div>
  )
}

function CardBack({ card }: { card: ISessionCard }) {
  const { t } = useTranslation('study')

  const glosses = Object.entries(card.glosses).filter(([, value]) => value)

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        {glosses.map(([lang, value]) => (
          <div key={lang} className="flex items-baseline gap-3">
            <span className="w-6 shrink-0 text-xs font-semibold uppercase text-muted-foreground">
              {LANGUAGE_LABELS[lang] ?? lang}
            </span>
            <span className="text-lg">{value}</span>
          </div>
        ))}
      </div>

      {(card.root || card.pattern) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {card.root && (
            <div className="rounded-lg border p-3">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t('root')}</p>
              <p dir="rtl" className="font-arabic text-2xl font-bold">
                {card.root.radicals}
              </p>
              {card.root.meaning && <p className="mt-1 text-sm text-muted-foreground">{card.root.meaning}</p>}
            </div>
          )}
          {card.pattern && (
            <div className="rounded-lg border p-3">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t('pattern')}</p>
              <p dir="rtl" className="font-arabic text-2xl font-bold">
                {card.pattern.wazn}
              </p>
              {card.pattern.meaning && <p className="mt-1 text-sm text-muted-foreground">{card.pattern.meaning}</p>}
            </div>
          )}
        </div>
      )}

      <AyahExample card={card} />
    </div>
  )
}

export default function StudySessionScreen() {
  const { t } = useTranslation(['study', 'common'])
  const { data: session, isLoading, refetch } = useSession(undefined, 20)
  const { data: stats } = useStudyStats()
  const { mutateAsync: answer, isPending } = useAnswer()

  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const shownAt = useRef(0)

  const cards = useMemo(() => session?.cards ?? [], [session])
  const card = cards[index]

  useEffect(() => {
    shownAt.current = Date.now()
  }, [index])

  const grade = useCallback(
    async (value: ReviewGrade) => {
      if (!card || isPending) return

      await answer({
        wordId: card.wordId,
        direction: card.direction,
        grade: value,
        durationMs: Date.now() - shownAt.current,
      })

      setRevealed(false)

      if (index + 1 < cards.length) {
        setIndex(index + 1)
      } else {
        setIndex(0)
        await refetch()
      }
    },
    [answer, card, cards.length, index, isPending, refetch]
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return

      const isReveal = event.key === ' ' || event.code === 'Space' || event.key === 'Enter'

      if (!revealed && isReveal) {
        event.preventDefault()
        setRevealed(true)
        return
      }
      if (revealed) {
        const match = GRADES.find((option) => option.hotkey === event.key)
        if (match) {
          event.preventDefault()
          void grade(match.grade)
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [grade, revealed])

  if (isLoading) return <ContentLoader />

  if (!card) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <Check className="size-12 text-emerald-600" />
        <h2 className="text-xl font-semibold">{t('all_done')}</h2>
        <p className="max-w-sm text-sm text-muted-foreground">{t('all_done_hint')}</p>
        <Button asChild variant="outline">
          <Link to="/student/decks">
            <BookOpen className="mr-2 size-4" />
            {t('choose_deck')}
          </Link>
        </Button>
      </div>
    )
  }

  const progress = ((index + 1) / cards.length) * 100

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {index + 1} / {cards.length}
          </span>
          {stats && <span>{t('coverage', { value: stats.quranCoverage })}</span>}
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-center gap-2">
          {card.isNew ? (
            <Badge variant="info" className="gap-1">
              <Sparkles className="size-3" />
              {t('new_word')}
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1">
              <RotateCcw className="size-3" />
              {t('review')}
            </Badge>
          )}
          {card.frequencyRank && <Badge variant="outline">#{card.frequencyRank}</Badge>}
        </div>

        <div className="mb-8 text-center">
          <p dir="rtl" className="font-arabic text-6xl font-bold leading-tight sm:text-7xl">
            {card.arabic}
          </p>
          {card.transcription && <p className="mt-3 text-muted-foreground">[{card.transcription}]</p>}
        </div>

        {revealed ? (
          <CardBack card={card} />
        ) : (
          <Button className="w-full" size="lg" onClick={() => setRevealed(true)}>
            {t('show_answer')}
            <kbd className="ml-2 rounded border border-primary-foreground/30 px-1.5 text-xs">Space</kbd>
          </Button>
        )}
      </div>

      {revealed && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {GRADES.map((option) => (
            <Button
              key={option.grade}
              className={cn('h-auto flex-col gap-0.5 py-3 text-white', option.className)}
              disabled={isPending}
              onClick={() => void grade(option.grade)}
            >
              <span className="font-medium">{t(option.key)}</span>
              <span className="text-[11px] opacity-75">{option.hotkey}</span>
            </Button>
          ))}
        </div>
      )}

      {session && (
        <p className="text-center text-xs text-muted-foreground">
          {t('queue_summary', {
            due: session.counts.due,
            new: session.counts.new,
            remaining: session.counts.remainingNewToday,
          })}
        </p>
      )}
    </div>
  )
}
