import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@topcoder/components'
import { useTranslation } from 'react-i18next'

export function LanguageSelector() {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'uz', name: 'O‘zbekcha' },
    { code: 'ar', name: 'العربية' },
  ]

  const currentLanguage = i18n.language.split('-')[0]

  return (
    <Select value={currentLanguage} onValueChange={(lang) => i18n.changeLanguage(lang)}>
      <SelectTrigger className="h-9 w-[120px] border-none bg-transparent shadow-none focus:ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="text-sm font-medium">{lang.name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
