import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input } from '@topcoder/components'
import { ARABIC_MAP, parseArabicText } from '@topcoder/lib/arabic-mapper'
import { showMessage } from '@topcoder/lib/show-message'
import { Copy, Keyboard } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ArabicKeyboardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ArabicKeyboardModal: React.FC<ArabicKeyboardModalProps> = ({ open, onOpenChange }) => {
  const { t } = useTranslation(['common', 'labels'])
  const [text, setText] = useState('')

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setText(parseArabicText(value))
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    showMessage(t('copied_to_clipboard', { ns: 'common' }), 'success')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] min-h-[500px] w-[95vw] !max-w-[1000px] flex-col gap-0 overflow-hidden p-0 sm:!max-w-[1000px] sm:rounded-xl">
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

          <div className="px-1">
            <Input
              autoFocus
              className="h-14 rounded-xl border-2 text-xl shadow-sm focus-visible:ring-primary"
              onChange={handleTextChange}
            />
          </div>

          <div className="space-y-6 rounded-2xl border-2 border-primary/5 bg-muted/20 p-6">
            <div>
              <h4 className="mb-4 flex items-center gap-2 text-base font-semibold">
                <span className="size-2 rounded-full bg-primary" />
                {t('character_map', { ns: 'common' })}
              </h4>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
                {Object.entries(ARABIC_MAP)
                  .filter(([key]) => key.length === 1)
                  .map(([latin, arabic]) => (
                    <div
                      key={latin}
                      className="group flex flex-col items-center rounded-xl border bg-background p-2 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
                    >
                      <span className="text-xs font-bold text-muted-foreground group-hover:text-primary">{latin}</span>
                      <span className="font-arabic text-2xl font-bold">{arabic}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 border-t border-primary/5 pt-4 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm font-bold uppercase tracking-wider text-primary">
                  {t('combinations', { ns: 'common' })}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['sh ➔ ش', 'kh ➔ خ', 'gh ➔ غ', 'aa ➔ ا', 'ii ➔ ي', 'uu ➔ و'].map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border bg-background px-3 py-1.5 text-sm font-medium shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-bold uppercase tracking-wider text-primary">
                  {t('special_keys', { ns: 'common' })}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Shift+H ➔ ح', 'Shift+S ➔ ص', 'o ➔ ْ (Sukun)'].map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border bg-background px-3 py-1.5 text-sm font-medium shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
