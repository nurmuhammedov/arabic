import { ContentLoader, GoBack, RichText } from '@topcoder/components'
import { Badge } from '@topcoder/components/ui'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useParticle } from '../huruf.api'
import { GrammarEffect } from '../huruf.types'

export default function HurufDetailScreen() {
  const { t } = useTranslation('huruf')
  const { id } = useParams<{ id: string }>()
  const { data: particle, isLoading } = useParticle(id)

  if (isLoading) return <ContentLoader />
  if (!particle) return null

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <GoBack title={particle.arabic} />

      <div className="rounded-xl border bg-card p-6 text-center">
        <p dir="rtl" className="font-arabic text-5xl font-bold">
          {particle.arabic}
        </p>
        {particle.transliteration && <p className="mt-2 text-muted-foreground">[{particle.transliteration}]</p>}
        {particle.shortUz && <p className="mt-3 text-lg">{particle.shortUz}</p>}

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Badge variant="outline">{t(`category.${particle.category}`)}</Badge>
          <Badge variant="outline">{t(`attachment_${particle.attachment.toLowerCase()}`)}</Badge>
          <Badge variant="info">{t('tokens', { count: particle.frequency })}</Badge>
        </div>
      </div>

      {particle.grammarEffect !== GrammarEffect.NONE && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('grammar_effect')}
          </h2>
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="mb-2 font-medium">{t(`effect.${particle.grammarEffect}`)}</p>
            {particle.effectNoteUz && <RichText>{particle.effectNoteUz}</RichText>}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t('explanation')}
        </h2>
        <div className="rounded-lg border p-4">
          <RichText>{particle.meaningUz}</RichText>
        </div>
      </section>

      {particle.example && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('example_verse')} · {particle.example.sura}:{particle.example.ayah}
          </h2>
          <div className="rounded-lg border bg-muted/20 p-4">
            <p dir="rtl" className="font-arabic text-2xl leading-loose">
              {particle.example.text}
            </p>
            {particle.exampleNoteUz && (
              <div className="mt-3 border-t pt-3">
                <RichText>{particle.exampleNoteUz}</RichText>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
