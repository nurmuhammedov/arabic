import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input } from '@topcoder/components'
import { cn } from '@topcoder/lib'
import { ARABIC_MAP, parseArabicText } from '@topcoder/lib/arabic-mapper'
import { showMessage } from '@topcoder/lib/show-message'
import { Copy, Keyboard } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const QWERTY_ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', "'"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

interface ArabicKeyboardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ArabicKeyboardModal: React.FC<ArabicKeyboardModalProps> = ({ open, onOpenChange }) => {
  const { t } = useTranslation(['common', 'labels', 'form'])
  const [text, setText] = useState('')

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setText(parseArabicText(value))
  }

  const handleCopy = () => {
    if (!text) return

    const fallbackCopy = () => {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
      showMessage(t('copied_to_clipboard', { ns: 'common' }), 'success')
    }

    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(
          () => showMessage(t('copied_to_clipboard', { ns: 'common' }), 'success'),
          () => fallbackCopy()
        )
      } else {
        fallbackCopy()
      }
    } catch {
      fallbackCopy()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[95vh] w-[95vw] !max-w-[1000px] flex-col gap-0 overflow-hidden p-0 sm:!max-w-[1000px] sm:rounded-xl">
        <DialogHeader className="shrink-0 border-b bg-muted/20 p-6">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Keyboard className="h-6 w-6 text-primary" />
            {t('arabic_virtual_keyboard', { ns: 'common' })}
          </DialogTitle>
        </DialogHeader>

        <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-4 sm:p-8">
          <div className="group relative flex min-h-[180px] items-center justify-center rounded-2xl border-2 border-primary/10 bg-muted/30 p-8 shadow-inner transition-all hover:bg-muted/40">
            <div
              className="font-arabic cursor-text select-all break-all text-center text-5xl font-bold leading-tight text-primary sm:text-7xl"
              style={{ direction: 'rtl' }}
            >
              {text}
            </div>

            {text && (
              <Button
                size="icon"
                variant="outline"
                className="absolute right-4 top-4 bg-background shadow-sm transition-transform hover:scale-110"
                onClick={handleCopy}
                title={t('copy', { ns: 'common' })}
              >
                <Copy className="h-5 w-5" />
              </Button>
            )}
          </div>

          <div className="space-y-1.5 px-1">
            <label className="text-sm font-medium">{t('text', { ns: 'labels' })}</label>
            <Input
              autoFocus
              className="h-10 rounded-md border shadow-sm focus-visible:ring-primary"
              onChange={handleTextChange}
              placeholder={t('enter', { ns: 'form' })}
            />
          </div>

          <div className="space-y-5 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
            <div>
              <div className="mb-4 flex items-center gap-2.5 border-b pb-3">
                <span className="flex size-6 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                  1
                </span>
                <h4 className="text-sm font-bold uppercase tracking-wider">{t('character_map', { ns: 'common' })}</h4>
              </div>
              <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                {QWERTY_ROWS.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-1 sm:gap-1.5">
                    {row.map((key) => {
                      const arabic = ARABIC_MAP[key]
                      return (
                        <div
                          key={key}
                          className={cn(
                            'group flex h-14 w-9 flex-col items-center justify-center rounded-lg border transition-all sm:h-16 sm:w-14',
                            arabic
                              ? 'cursor-pointer bg-background hover:-translate-y-0.5 hover:border-primary hover:shadow-md'
                              : 'cursor-default bg-muted/40 opacity-40'
                          )}
                        >
                          <span className="text-[11px] font-medium text-muted-foreground group-hover:text-primary">
                            {key}
                          </span>
                          <span className="font-arabic text-lg font-bold leading-none sm:text-2xl">{arabic || ''}</span>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2.5 border-b pb-3">
                <span className="flex size-6 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                  2
                </span>
                <h4 className="text-sm font-bold uppercase tracking-wider">{t('combinations', { ns: 'common' })}</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { key: 'sh', val: 'ش' },
                  { key: 'kh', val: 'خ' },
                  { key: 'gh', val: 'غ' },
                  { key: 'th', val: 'ث' },
                  { key: 'dh', val: 'ذ' },
                  { key: 'aa', val: 'ا' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1.5"
                  >
                    <code className="text-sm font-bold text-primary">{item.key}</code>
                    <span className="text-xs text-muted-foreground">➤</span>
                    <span className="font-arabic text-xl font-bold">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2.5 border-b pb-3">
                <span className="flex size-6 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                  3
                </span>
                <h4 className="text-sm font-bold uppercase tracking-wider">{t('special_keys', { ns: 'common' })}</h4>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Shift bilan
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { key: 'H', val: 'ه' },
                      { key: 'A', val: 'أ' },
                      { key: 'I', val: 'إ' },
                      { key: 'M', val: 'آ' },
                      { key: 'L', val: 'لا' },
                      { key: 'W', val: 'ؤ' },
                      { key: 'E', val: 'ئ' },
                      { key: 'Y', val: 'ى' },
                      { key: 'U', val: 'أ' },
                      { key: 'D', val: 'ض' },
                      { key: 'T', val: 'ط' },
                      { key: 'Z', val: 'ظ' },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1.5"
                      >
                        <code className="text-sm font-bold text-primary">{item.key}</code>
                        <span className="text-xs text-muted-foreground">➤</span>
                        <span className="font-arabic text-xl font-bold">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Maxsus harflar
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { key: 'h', val: 'ح' },
                      { key: 'c', val: 'ص' },
                      { key: 'x', val: 'خ' },
                      { key: 'g', val: 'غ' },
                      { key: "'", val: 'ع' },
                      { key: 'p', val: 'ة' },
                      { key: 'e', val: 'ء' },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1.5"
                      >
                        <code className="text-sm font-bold text-primary">{item.key}</code>
                        <span className="text-xs text-muted-foreground">➤</span>
                        <span className="font-arabic text-xl font-bold">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Harakatlar
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { key: 'a / o', val: 'َ' },
                      { key: 'i', val: 'ِ' },
                      { key: 'u', val: 'ُ' },
                      { key: '0', val: 'ْ' },
                      { key: '4', val: 'ّ' },
                      { key: '1', val: 'ً' },
                      { key: '2', val: 'ٌ' },
                      { key: '3', val: 'ٍ' },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1.5"
                      >
                        <code className="text-sm font-bold text-primary">{item.key}</code>
                        <span className="text-xs text-muted-foreground">➤</span>
                        <span className="font-arabic text-xl font-bold">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Qur'on belgilari
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { key: '5', val: 'ٰ' },
                      { key: '6', val: 'ٔ' },
                      { key: '7', val: 'ٕ' },
                      { key: '8', val: 'ٱ' },
                      { key: '9', val: 'ـ' },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1.5"
                      >
                        <code className="text-sm font-bold text-primary">{item.key}</code>
                        <span className="text-xs text-muted-foreground">➤</span>
                        <span className="font-arabic text-xl font-bold">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-dashed border-primary/20 bg-primary/5 px-3 py-2">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-primary">Maslahat:</strong> Harflarni ajratish uchun (-) ishlating. Masalan:{' '}
                    <code className="rounded bg-muted px-1 font-bold">t-h</code> ➤{' '}
                    <span className="font-arabic font-bold">ته</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
