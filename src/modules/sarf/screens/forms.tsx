import { ContentLoader } from '@topcoder/components'
import { Badge } from '@topcoder/components/ui'
import { cn } from '@topcoder/lib'
import { ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useVerbForms } from '../sarf.api'
import { FormCategory, type IVerbForm } from '../sarf.types'

const CATEGORY_ORDER: FormCategory[] = [
  FormCategory.TRILITERAL_BARE,
  FormCategory.TRILITERAL_AUGMENTED,
  FormCategory.QUADRILITERAL_BARE,
  FormCategory.QUADRILITERAL_AUGMENTED,
]

function FormRow({ form, max, onClick }: { form: IVerbForm; max: number; onClick: () => void }) {
  const { t } = useTranslation('sarf')
  const share = max > 0 ? (form.tokenCount / max) * 100 : 0

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 p-3 text-left transition-colors hover:bg-muted/50"
    >
      <div className="flex w-28 shrink-0 flex-col items-end gap-0.5">
        <span dir="rtl" className="font-arabic text-xl leading-none">
          {form.pastPattern}
        </span>
        <span dir="rtl" className="font-arabic text-sm leading-none text-muted-foreground">
          {form.presentPattern}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium">{form.code}</span>
          {form.exampleWord && (
            <span dir="rtl" className="font-arabic text-base text-muted-foreground">
              {form.exampleWord}
            </span>
          )}
          {form.exampleMeaning && <span className="text-sm text-muted-foreground">{form.exampleMeaning}</span>}
        </div>

        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-1.5 w-full max-w-40 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary/70" style={{ width: `${share}%` }} />
          </div>
          <span className="whitespace-nowrap text-xs text-muted-foreground">
            {form.tokenCount > 0 ? t('form_weight', { verbs: form.lemmaCount, tokens: form.tokenCount }) : t('not_in_quran')}
          </span>
        </div>
      </div>

      <ChevronLeft className="size-4 shrink-0 rotate-180 text-muted-foreground" />
    </button>
  )
}

export default function SarfFormsScreen() {
  const { t } = useTranslation('sarf')
  const navigate = useNavigate()
  const { data: forms, isLoading } = useVerbForms()

  if (isLoading) return <ContentLoader />

  const max = Math.max(...(forms ?? []).map((form) => form.tokenCount), 1)

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold">{t('forms_title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('forms_hint')}</p>
      </div>

      {CATEGORY_ORDER.map((category) => {
        const group = (forms ?? []).filter((form) => form.category === category)
        if (!group.length) return null

        const groupTokens = group.reduce((sum, form) => sum + form.tokenCount, 0)

        return (
          <section key={category}>
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {t(`category.${category}`)}
              </h2>
              <Badge variant="outline">{group.length}</Badge>
              {groupTokens > 0 && <Badge variant="info">{t('tokens', { count: groupTokens })}</Badge>}
            </div>

            <div className={cn('divide-y overflow-hidden rounded-lg border')}>
              {group.map((form) => (
                <FormRow
                  key={form.id}
                  form={form}
                  max={max}
                  onClick={() => navigate(`/student/sarf/forms/${encodeURIComponent(form.code)}`)}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
