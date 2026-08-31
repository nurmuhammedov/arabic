import { ContentLoader } from '@topcoder/components'
import { Badge, Button } from '@topcoder/components/ui'
import { cn } from '@topcoder/lib'
import { ArrowRight, Check, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useIrabCauses, useIrabChallenge } from '../nahw.api'
import { IrabCase, type IrabCause } from '../nahw.types'

const OPTIONS: IrabCase[] = [IrabCase.NOMINATIVE, IrabCase.ACCUSATIVE, IrabCase.GENITIVE]

export default function NahwIrabScreen() {
  const { t } = useTranslation(['nahw', 'common'])
  const [cause, setCause] = useState<IrabCause | undefined>()
  const [picked, setPicked] = useState<IrabCase | null>(null)

  const { data: causes } = useIrabCauses()
  const { data: challenge, isLoading, isFetching, refetch } = useIrabChallenge(cause)

  // The verse is split on whitespace, so wordIndex lines up with the corpus position.
  const tokens = useMemo(() => {
    if (!challenge?.text) return []
    return challenge.text.split(/\s+/).map((token, index) => ({
      token,
      key: `${index}-${token}`,
      isTarget: index + 1 === challenge.wordIndex,
    }))
  }, [challenge])

  const next = async () => {
    setPicked(null)
    await refetch()
  }

  if (isLoading) return <ContentLoader />
  if (!challenge) return null

  const revealed = picked !== null
  const correct = picked === challenge.irabCase

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <div>
        <h1 className="text-xl font-semibold">{t('irab_title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('irab_hint')}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => {
            setCause(undefined)
            setPicked(null)
          }}
          className={cn(
            'rounded-full border px-3 py-1 text-xs transition-colors',
            !cause ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted'
          )}
        >
          {t('all_causes')}
        </button>
        {(causes ?? []).map((item) => (
          <button
            key={item.cause}
            type="button"
            onClick={() => {
              setCause(item.cause)
              setPicked(null)
            }}
            className={cn(
              'rounded-full border px-3 py-1 text-xs transition-colors',
              cause === item.cause ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted'
            )}
          >
            {t(`cause.${item.cause}`)} · {item.count}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {challenge.sura}:{challenge.ayah}
        </p>

        <p dir="rtl" className="font-arabic text-3xl leading-loose">
          {tokens.map(({ key, token, isTarget }) => (
            <span
              key={key}
              className={cn(
                isTarget && 'rounded bg-primary/20 px-1.5 font-bold text-primary underline decoration-primary/50'
              )}
            >
              {token}{' '}
            </span>
          ))}
        </p>

        <p className="mt-4 border-t pt-4 text-center text-sm text-muted-foreground">
          {t('which_case')}{' '}
          <span dir="rtl" className="font-arabic text-xl text-foreground">
            {challenge.surfaceForm}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {OPTIONS.map((option) => {
          const isAnswer = option === challenge.irabCase
          const isPicked = option === picked

          return (
            <button
              key={option}
              type="button"
              disabled={revealed}
              onClick={() => setPicked(option)}
              className={cn(
                'flex flex-col items-center gap-1 rounded-lg border p-3 text-sm transition-colors',
                !revealed && 'hover:bg-muted/50',
                revealed && isAnswer && 'border-emerald-600 bg-emerald-600/10',
                revealed && isPicked && !isAnswer && 'border-destructive bg-destructive/10'
              )}
            >
              <span dir="rtl" className="font-arabic text-lg">
                {t(`case_ar.${option}`)}
              </span>
              <span className="text-xs text-muted-foreground">{t(`case.${option}`)}</span>
              {revealed && isAnswer && <Check className="size-4 text-emerald-600" />}
              {revealed && isPicked && !isAnswer && <X className="size-4 text-destructive" />}
            </button>
          )
        })}
      </div>

      {revealed && (
        <div className="space-y-3">
          <div
            className={cn(
              'rounded-lg border p-4',
              correct ? 'border-emerald-600/40 bg-emerald-600/5' : 'border-destructive/40 bg-destructive/5'
            )}
          >
            <p className="font-medium">{correct ? t('correct') : t('incorrect')}</p>
            <p className="mt-2 text-sm">
              {t('because')} <strong>{t(`cause.${challenge.cause}`)}</strong>
              {challenge.triggerForm && (
                <>
                  {' — '}
                  <span dir="rtl" className="font-arabic text-lg">
                    {challenge.triggerForm}
                  </span>
                </>
              )}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{t(`cause_note.${challenge.cause}`)}</p>
          </div>

          <Button className="w-full" onClick={() => void next()} loading={isFetching}>
            {t('next_challenge')}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      )}

      {!revealed && (
        <div className="flex justify-center">
          <Badge variant="outline">{t('pick_one')}</Badge>
        </div>
      )}
    </div>
  )
}
