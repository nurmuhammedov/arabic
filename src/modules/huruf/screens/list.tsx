import { ContentLoader } from '@topcoder/components'
import { Badge } from '@topcoder/components/ui'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useParticleGroups } from '../huruf.api'
import { Attachment } from '../huruf.types'

const ATTACHMENT_HINT: Record<Attachment, string> = {
  [Attachment.PREFIX]: 'attachment_prefix',
  [Attachment.SUFFIX]: 'attachment_suffix',
  [Attachment.STANDALONE]: 'attachment_standalone',
}

export default function HurufListScreen() {
  const { t } = useTranslation('huruf')
  const navigate = useNavigate()
  const { data: groups, isLoading } = useParticleGroups()

  if (isLoading) return <ContentLoader />

  const total = (groups ?? []).reduce((sum, group) => sum + group.frequency, 0)
  const count = (groups ?? []).reduce((sum, group) => sum + group.particles.length, 0)

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold">{t('title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('hint')}</p>
        {total > 0 && (
          <div className="mt-3 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
            {t('coverage_note', { count, tokens: total, percent: ((total / 130030) * 100).toFixed(1) })}
          </div>
        )}
      </div>

      {(groups ?? []).map((group) => (
        <section key={group.category}>
          <div className="mb-2 flex items-center gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {t(`category.${group.category}`)}
            </h2>
            <Badge variant="outline">{group.particles.length}</Badge>
            <Badge variant="info">{t('tokens', { count: group.frequency })}</Badge>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {group.particles.map((particle) => (
              <button
                key={particle.id}
                type="button"
                onClick={() => navigate(`/student/huruf/${particle.id}`)}
                className="flex items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50"
              >
                <span dir="rtl" className="font-arabic w-16 shrink-0 text-2xl">
                  {particle.arabic}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{particle.shortUz}</p>
                  <p className="text-xs text-muted-foreground">
                    {t(ATTACHMENT_HINT[particle.attachment])} · {particle.frequency}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
