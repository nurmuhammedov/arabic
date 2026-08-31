import { ContentLoader } from '@topcoder/components'
import { Badge, Button } from '@topcoder/components/ui'
import { cn } from '@topcoder/lib'
import { Check, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useAddDeck, useAvailableDecks, useMyDecks, useRemoveDeck } from '../study.api'

export default function StudyDecksScreen() {
  const { t } = useTranslation(['study', 'common'])
  const { data: decks, isLoading } = useAvailableDecks()
  const { data: mine } = useMyDecks()
  const { mutate: add, isPending: isAdding } = useAddDeck()
  const { mutate: remove, isPending: isRemoving } = useRemoveDeck()

  if (isLoading) return <ContentLoader />

  const active = new Set((mine ?? []).filter((entry) => entry.isActive).map((entry) => entry.deckId))

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-semibold">{t('decks_title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('decks_hint')}</p>
      </div>

      <div className="grid gap-3">
        {(decks ?? []).map((deck) => {
          const enrolled = active.has(deck.id)

          return (
            <div
              key={deck.id}
              className={cn(
                'flex flex-col gap-3 rounded-lg border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between',
                enrolled && 'border-primary/40 bg-primary/5'
              )}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-medium">{deck.titleUz}</h2>
                  <Badge variant="outline">{t('word_count', { count: deck.wordCount })}</Badge>
                  {deck.coverage !== null && (
                    <Badge variant="info">{t('deck_coverage', { value: Math.round(deck.coverage * 100) })}</Badge>
                  )}
                </div>
                {deck.description && <p className="mt-1 text-sm text-muted-foreground">{deck.description}</p>}
              </div>

              {enrolled ? (
                <Button variant="outline" disabled={isRemoving} onClick={() => remove(deck.id)}>
                  <Check className="mr-2 size-4 text-emerald-600" />
                  {t('enrolled')}
                </Button>
              ) : (
                <Button disabled={isAdding} onClick={() => add({ deckId: deck.id })}>
                  <Plus className="mr-2 size-4" />
                  {t('start_deck')}
                </Button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
