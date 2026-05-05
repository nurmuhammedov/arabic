import { useDetail } from '@topcoder/api/hooks'
import { DetailCardAccordion, DetailRow, GoBack } from '@topcoder/components'
import { Badge, Button, FileInput } from '@topcoder/components/ui'
import { BASE_URL } from '@topcoder/config'
import { IVocabulary, VocabularyStatus } from '@topcoder/modules/vocabulary/vocabulary.types'
import { format } from 'date-fns'
import { Edit, FileText, ImageIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

export default function VocabularyDetailScreen() {
  const { t } = useTranslation(['vocabulary', 'common', 'table'])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data: vocabulary, isLoading } = useDetail<IVocabulary>('vocabulary', id, ['vocabulary', id!])

  if (isLoading) {
    return <div className="flex h-32 items-center justify-center">Loading...</div>
  }

  if (!vocabulary) {
    return <div className="p-4 text-center">Vocabulary item not found</div>
  }

  const getStatusVariant = (status: VocabularyStatus) => {
    switch (status) {
      case VocabularyStatus.NEW:
        return 'info'
      case VocabularyStatus.LEARNING:
        return 'warning'
      case VocabularyStatus.REVIEW:
        return 'secondary'
      case VocabularyStatus.LEARNED:
        return 'success'
      case VocabularyStatus.ARCHIVED:
        return 'outline'
      default:
        return 'default'
    }
  }

  const getFullUrl = (path: string) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    // Normalize slashes and ensure it starts with /
    const normalizedPath = path.replace(/\\/g, '/').replace(/^\/?/, '/')
    return `${BASE_URL}${normalizedPath}`
  }

  const renderValue = (value: string | undefined | null) => {
    if (!value || value === '-') {
      return <span className="font-medium text-destructive">{t('not_available', { ns: 'common' })}</span>
    }
    return value
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <GoBack title={t('detail')} />
        <Button onClick={() => navigate(`../edit/${vocabulary.id}`)}>
          <Edit className="mr-2 h-4 w-4" />
          {t('edit', { ns: 'common' })}
        </Button>
      </div>

      <DetailCardAccordion defaultValue={['main', 'media']}>
        <DetailCardAccordion.Item value="main" title={t('main_info', { ns: 'common' })}>
          <div className="grid grid-cols-1 gap-1">
            <DetailRow
              title={t('arabic')}
              value={
                <div className="flex items-center gap-4">
                  <span dir="rtl" className="font-arabic text-3xl">
                    {vocabulary.arabic}
                  </span>
                  {vocabulary.transcriptionAr && (
                    <span className="text-muted-foreground">[{vocabulary.transcriptionAr}]</span>
                  )}
                </div>
              }
            />
            <DetailRow title={t('uzbek')} value={renderValue(vocabulary.uzbek)} />
            <DetailRow title={t('russian')} value={renderValue(vocabulary.russian)} />
            <DetailRow
              title={t('english')}
              value={
                vocabulary.english ? (
                  <div className="flex items-center gap-2">
                    <span>{vocabulary.english}</span>
                    {vocabulary.transcriptionEn && (
                      <span className="text-muted-foreground">[{vocabulary.transcriptionEn}]</span>
                    )}
                  </div>
                ) : (
                  renderValue(null)
                )
              }
            />
            <DetailRow
              title={t('status')}
              value={<Badge variant={getStatusVariant(vocabulary.status)}>{t(`statuses.${vocabulary.status}`)}</Badge>}
            />
            <DetailRow
              title={t('created_date', { ns: 'table' })}
              value={
                vocabulary.createdAt ? format(new Date(vocabulary.createdAt), 'dd.MM.yyyy HH:mm') : renderValue(null)
              }
            />
            <DetailRow
              title={t('description')}
              value={
                vocabulary.description ? (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{vocabulary.description}</div>
                ) : (
                  renderValue(null)
                )
              }
            />
          </div>
        </DetailCardAccordion.Item>

        <DetailCardAccordion.Item value="media" title={t('files')}>
          <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold">
                <ImageIcon className="h-4 w-4" /> {t('image')}
              </h4>
              {vocabulary.images?.length ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {vocabulary.images.map((img) => (
                    <a
                      key={img.id}
                      href={getFullUrl(img.path)}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative block aspect-video overflow-hidden rounded-lg border bg-muted"
                    >
                      <img
                        src={getFullUrl(img.path)}
                        alt={vocabulary.arabic}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t('no_image', { ns: 'common' })}</p>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold">
                <FileText className="h-4 w-4" /> {t('files')}
              </h4>
              <div className="w-full">
                {vocabulary.files?.length ? (
                  <FileInput
                    disabled
                    showFileSize
                    showPreview
                    showDownload
                    value={vocabulary.files.map((f) => f.id)}
                    initialFilesData={vocabulary.files.map((f) => ({
                      ...f,
                      url: f.path,
                      originalName: f.name,
                    }))}
                    multiple
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{t('no_additional_files', { ns: 'common' })}</p>
                )}
              </div>
            </div>
          </div>
        </DetailCardAccordion.Item>
      </DetailCardAccordion>
    </div>
  )
}
