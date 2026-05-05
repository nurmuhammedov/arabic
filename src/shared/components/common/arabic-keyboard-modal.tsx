import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from '@topcoder/components'
import { Copy, Keyboard } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ARABIC_MAP, parseArabicText } from 'src/shared/lib/arabic-mapper'
import { showMessage } from 'src/shared/lib/show-message'

interface ArabicKeyboardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ArabicKeyboardModal: React.FC<ArabicKeyboardModalProps> = ({ open, onOpenChange }) => {
  const { t } = useTranslation(['common', 'labels'])
  const [text, setText] = useState('')

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setText(parseArabicText(value))
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    showMessage(t('copied_to_clipboard', { ns: 'common' }), 'success')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            {t('arabic_virtual_keyboard', { ns: 'common' })}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="relative">
            <Textarea
              value={text}
              onChange={handleTextChange}
              placeholder={t('type_here_to_convert', { ns: 'common' })}
              className="dir-rtl min-h-[200px] text-right text-4xl leading-relaxed"
              style={{ direction: 'rtl' }}
            />
            <Button
              size="icon"
              variant="outline"
              className="absolute bottom-2 right-2"
              onClick={handleCopy}
              title={t('copy', { ns: 'common' })}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <h4 className="mb-2 text-sm font-medium">{t('character_map', { ns: 'common' })}</h4>
            <div className="grid grid-cols-4 gap-2 text-xs sm:grid-cols-6 md:grid-cols-8">
              {Object.entries(ARABIC_MAP)
                .filter(([key]) => key.length === 1)
                .map(([latin, arabic]) => (
                  <div key={latin} className="flex flex-col items-center rounded border bg-background p-1">
                    <span className="font-bold text-primary">{latin}</span>
                    <span className="text-lg">{arabic}</span>
                  </div>
                ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <p className="font-medium">{t('combinations', { ns: 'common' })}:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded border bg-background px-1">sh ➔ ش</span>
                  <span className="rounded border bg-background px-1">kh ➔ خ</span>
                  <span className="rounded border bg-background px-1">gh ➔ غ</span>
                  <span className="rounded border bg-background px-1">aa ➔ ا</span>
                  <span className="rounded border bg-background px-1">ii ➔ ي</span>
                  <span className="rounded border bg-background px-1">uu ➔ و</span>
                </div>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-left font-medium">{t('special_keys', { ns: 'common' })}:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded border bg-background px-1">Shift+H ➔ ح</span>
                  <span className="rounded border bg-background px-1">Shift+S ➔ ص</span>
                  <span className="rounded border bg-background px-1">o ➔ ْ (Sukun)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
