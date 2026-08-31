import { ContentLoader } from '@topcoder/components'
import { Badge } from '@topcoder/components/ui'
import { ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useRootClasses } from '../sarf.api'

export default function SarfClassesScreen() {
  const { t } = useTranslation('sarf')
  const navigate = useNavigate()
  const { data: classes, isLoading } = useRootClasses()

  if (isLoading) return <ContentLoader />

  const totalRoots = (classes ?? []).reduce((sum, item) => sum + item.rootCount, 0)
  const weak = (classes ?? []).filter((item) => item.code !== 'SOUND')
  const weakRoots = weak.reduce((sum, item) => sum + item.rootCount, 0)

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <div>
        <h1 className="text-xl font-semibold">{t('classes_title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('classes_hint')}</p>
        {totalRoots > 0 && (
          <p className="mt-2 text-sm">
            {t('weak_share', {
              weak: weakRoots,
              total: totalRoots,
              percent: Math.round((weakRoots / totalRoots) * 100),
            })}
          </p>
        )}
      </div>

      <div className="divide-y overflow-hidden rounded-lg border">
        {(classes ?? []).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(`/student/sarf/classes/${item.code}`)}
            className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-muted/50"
          >
            <span dir="rtl" className="font-arabic w-24 shrink-0 text-xl">
              {item.nameAr}
            </span>

            <div className="min-w-0 flex-1">
              <p className="font-medium">{item.nameUz}</p>
              {item.exampleRoot && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  <span dir="rtl" className="font-arabic">
                    {item.exampleRoot}
                  </span>
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1">
              <Badge variant="outline">{t('root_count', { count: item.rootCount })}</Badge>
              <span className="text-xs text-muted-foreground">{t('tokens', { count: item.tokenCount })}</span>
            </div>

            <ChevronLeft className="size-4 shrink-0 rotate-180 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}
