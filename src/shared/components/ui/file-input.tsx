import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@topcoder/api'
import { Input } from '@topcoder/components'
import { BASE_URL } from '@topcoder/config'
import { FileTypes } from '@topcoder/constants'
import { cn } from '@topcoder/lib'
import { AxiosProgressEvent } from 'axios'
import { Download, Eye, Paperclip, Trash2 } from 'lucide-react'
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export interface FileData {
  id?: string
  url: string
  originalName?: string
  name?: string
  size?: number
  type?: string
  blob?: Blob
  blobUrl?: string
}

interface FileControlsProps {
  fileData: FileData | null
  fileUrl: string
  isLoading: boolean
  showPreview?: boolean
  showDownload?: boolean
  showRemove?: boolean
  onPreviewClick: () => void
  onRemoveClick: () => void
}

const FileControls: React.FC<FileControlsProps> = ({
  fileData,
  fileUrl,
  isLoading,
  showPreview = false,
  showDownload = false,
  showRemove = true,
  onPreviewClick,
  onRemoveClick,
}) => {
  const getFullUrl = (url: string) => {
    if (!url) return ''
    if (url.startsWith('http') || url.startsWith('blob:')) return url
    return `${BASE_URL}${url}`
  }

  return (
    <div className="flex flex-shrink-0 items-center border-l border-gray-100 pl-1">
      {showPreview && (
        <button
          type="button"
          onClick={onPreviewClick}
          disabled={isLoading}
          className={cn(
            'p-2 text-gray-500 transition-colors',
            isLoading ? 'cursor-not-allowed' : 'hover:text-blue-500'
          )}
        >
          {isLoading ? (
            <div className="size-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          ) : (
            <Eye size={16} />
          )}
        </button>
      )}

      {showDownload && (
        <a
          href={fileData?.blobUrl || getFullUrl(fileUrl)}
          download={fileData?.originalName}
          target="_blank"
          rel="noreferrer"
          className="p-2 text-gray-500 transition-colors hover:text-blue-500"
          onClick={(e) => e.stopPropagation()}
        >
          <Download size={16} />
        </a>
      )}

      {showRemove && (
        <button
          type="button"
          onClick={onRemoveClick}
          className="p-2 text-gray-500 transition-colors hover:text-destructive"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  )
}

interface FileRowProps {
  fileData: FileData
  isLoading?: boolean
  progress?: number
  hasError?: boolean
  showPreview?: boolean
  showDownload?: boolean
  showFileSize?: boolean
  showRemove?: boolean
  maxFilenameLength: number
  onRemove: () => void
  onPreview: () => void
}

const FileRow = memo(
  ({
    fileData,
    isLoading,
    progress,
    hasError,
    showPreview,
    showDownload,
    showFileSize,
    showRemove = true,
    maxFilenameLength,
    onRemove,
    onPreview,
  }: FileRowProps) => {
    const { t } = useTranslation('form')
    const displayFileName = useMemo(() => {
      const name = fileData.originalName || t('unnamed_file')
      if (name.length <= maxFilenameLength) return name

      const extIndex = name.lastIndexOf('.')
      if (extIndex > -1 && name.length - extIndex <= 6) {
        const ext = name.substring(extIndex)
        const truncLen = maxFilenameLength - ext.length - 3
        if (truncLen > 0) {
          return name.substring(0, truncLen) + '...' + ext
        }
      }
      return name.substring(0, maxFilenameLength) + '...'
    }, [fileData.originalName, maxFilenameLength, t])

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    }

    return (
      <div
        className={cn(
          'flex w-full items-center overflow-hidden rounded-md border bg-white transition-all duration-150',
          hasError ? 'border-destructive' : 'border-input hover:border-primary',
          'mb-2 last:mb-0'
        )}
      >
        <div className="flex h-9 items-center justify-center border-r border-border bg-muted px-2.5 text-primary">
          {isLoading ? (
            <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <Paperclip className="h-4 w-4 text-primary" />
          )}
        </div>

        <div
          className="flex min-w-0 flex-grow items-center justify-between px-3 py-2 text-sm font-medium"
          onClick={!isLoading ? onPreview : undefined}
        >
          {isLoading ? (
            <span className="text-muted-foreground">{`${t('uploading')}... (${progress}%)`}</span>
          ) : (
            <>
              <span className="cursor-pointer truncate text-primary hover:underline" title={fileData.originalName}>
                {displayFileName}
                {showFileSize && fileData.size && `, ${formatFileSize(fileData.size)}`}
              </span>
            </>
          )}
        </div>

        {!isLoading && (
          <FileControls
            fileData={fileData}
            fileUrl={fileData.url}
            isLoading={!!isLoading}
            showPreview={showPreview}
            showDownload={showDownload}
            showRemove={showRemove}
            onPreviewClick={onPreview}
            onRemoveClick={onRemove}
          />
        )}
      </div>
    )
  }
)
FileRow.displayName = 'FileRow'

export interface FileInputProps {
  value?: string | string[] | null
  onChange?: (value: string | string[] | null) => void
  name?: string
  accept?: FileTypes[]
  className?: string
  maxSize?: number
  disabled?: boolean
  showPreview?: boolean
  showFileSize?: boolean
  showDownload?: boolean
  uploadEndpoint?: string
  initialFilesData?:
    | Pick<FileData, 'id' | 'url' | 'originalName' | 'name' | 'size' | 'type'>
    | Pick<FileData, 'id' | 'url' | 'originalName' | 'name' | 'size' | 'type'>[]
  multiple?: boolean
  maxFiles?: number
  buttonText?: string
  maxFilenameLength?: number
  hasError?: boolean
}

const FileInputComponent = ({
  value,
  onChange,
  name,
  className,
  maxSize = 10,
  disabled = false,
  showPreview = false,
  showFileSize = false,
  showDownload = false,
  accept = [FileTypes.PDF],
  uploadEndpoint = 'attachments/registry-files',
  initialFilesData,
  multiple = false,
  maxFiles = 10,
  buttonText = 'attach_file',
  maxFilenameLength = 20,
  hasError,
}: FileInputProps) => {
  const { setError, clearErrors } = useFormContext() || {}
  const { t } = useTranslation('form')

  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [fileList, setFileList] = useState<FileData[]>([])

  useEffect(() => {
    const currentUrls = Array.isArray(value) ? value : value ? [value] : []

    if (currentUrls.length === 0) {
      if (fileList.length > 0) {
        fileList.forEach((f) => f.blobUrl && URL.revokeObjectURL(f.blobUrl))
        setFileList([])
      }
      return
    }

    const initDataArray = Array.isArray(initialFilesData)
      ? initialFilesData
      : initialFilesData
        ? [initialFilesData]
        : undefined

    const newFileList = currentUrls.map((urlOrId: string) => {
      const existing = fileList.find((f) => f.id === urlOrId || f.url === urlOrId)
      if (existing) return existing

      const initData = initDataArray?.find((d) => d.id === urlOrId || d.url === urlOrId)

      return {
        id: initData?.id || urlOrId,
        url: initData?.url || urlOrId,
        originalName:
          initData?.originalName ||
          initData?.name ||
          (urlOrId ? urlOrId?.toString().split('/').pop() || t('unnamed_file') : t('file')),
        size: initData?.size,
      } as FileData
    })

    if (JSON.stringify(newFileList.map((f) => f.url)) !== JSON.stringify(fileList.map((f) => f.url))) {
      setFileList(newFileList)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    return () => {
      fileList.forEach((file) => {
        if (file.blobUrl) URL.revokeObjectURL(file.blobUrl)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const acceptTypes = useMemo(() => accept.join(','), [accept])

  const handleUploadProgress = useCallback((progressEvent: AxiosProgressEvent) => {
    const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
    setUploadProgress(percent)
  }, [])

  const { mutate, isPending } = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData()
      files.forEach((file) => formData.append('file', file))

      const response = await apiClient.post(uploadEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: handleUploadProgress,
      })
      const data = response.data.data || response.data
      if (Array.isArray(data)) {
        return data.map((d) => d?.id || d?.path || d?.url || d)
      }
      return data?.id || data?.path || data?.url || data
    },
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const openFileDialog = useCallback(() => {
    if (!disabled && !isPending) {
      if (multiple && fileList.length >= maxFiles) return
      fileInputRef.current?.click()
    }
  }, [disabled, isPending, multiple, fileList.length, maxFiles])

  const validateFile = useCallback(
    (file: File): boolean => {
      const type = file.type
      const match = type.match(/^([^/]+)/)
      const typeMatch = match ? match[1] : ''
      const isImage = typeMatch === 'image'

      if (acceptTypes.includes(FileTypes.IMAGE) && isImage) return true

      if (!accept.includes(type as FileTypes) && !accept.some((t) => type.includes(t.replace('/*', '')))) {
        const fileExtension = file.name.split('.').pop()?.toUpperCase() || ''
        if (name && setError)
          setError(name, {
            type: 'manual',
            message: t('invalid_file_format', { type: fileExtension }),
          })
        return false
      }

      if (file.size > maxSize * 1024 * 1024) {
        if (name && setError)
          setError(name, {
            type: 'manual',
            message: t('file_size_exceeded', { size: maxSize }),
          })
        return false
      }
      return true
    },
    [maxSize, name, setError, acceptTypes, accept, t]
  )

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (!files || files.length === 0) return

      const filesArray = Array.from(files)

      if (multiple && fileList.length + filesArray.length > maxFiles) {
        if (name && setError)
          setError(name, {
            type: 'manual',
            message: t('max_files_exceeded', { count: maxFiles }),
          })
        return
      }

      const validFiles = filesArray.filter(validateFile)
      if (validFiles.length === 0) {
        if (event.target) event.target.value = ''
        return
      }

      if (name && clearErrors) clearErrors(name)
      setUploadProgress(0)

      const tempFilesData: FileData[] = validFiles.map((file) => ({
        url: '',
        originalName: file.name,
        size: file.size,
        type: file.type,
        blob: file,
        blobUrl: URL.createObjectURL(file),
      }))

      mutate(validFiles, {
        onSuccess: (responseUrls: string | string[]) => {
          const newUrls = Array.isArray(responseUrls) ? responseUrls : [responseUrls]

          const newFilesData = tempFilesData.map((t, idx) => ({
            ...t,
            url: newUrls[idx],
          }))

          // Pre-emptively update fileList so the useEffect finds existing file metadata!
          setFileList((prev) => [...prev, ...newFilesData])

          if (multiple) {
            const currentVal = Array.isArray(value) ? value : value ? [value] : []
            const updatedUrls = [...currentVal, ...newUrls]
            onChange?.(updatedUrls)
          } else {
            const url = newUrls[0]
            onChange?.(url)
          }
        },
        onError: (error) => {
          tempFilesData.forEach((f) => f.blobUrl && URL.revokeObjectURL(f.blobUrl))
          if (name && setError)
            setError(name, {
              type: 'manual',
              message: error.message || t('file_upload_error'),
            })
        },
      })

      if (event.target) event.target.value = ''
    },
    [clearErrors, mutate, onChange, name, validateFile, setError, multiple, fileList.length, maxFiles, value, t]
  )

  const removeFile = useCallback(
    (indexToRemove: number) => {
      const fileToRemove = fileList[indexToRemove]
      if (fileToRemove?.blobUrl) URL.revokeObjectURL(fileToRemove.blobUrl)

      if (multiple) {
        const currentUrls = Array.isArray(value) ? value : value ? [value] : []
        const newUrls = currentUrls.filter((_, index) => index !== indexToRemove)
        onChange?.(newUrls)
      } else {
        onChange?.(null)
      }
    },
    [onChange, fileList, multiple, value]
  )

  const handleOpenFile = useCallback((fileData: FileData) => {
    const url = fileData.blobUrl || (fileData.url.startsWith('http') ? fileData.url : `${BASE_URL}${fileData.url}`)
    window.open(url, '_blank')
  }, [])

  return (
    <div className={cn('file-upload-wrapper w-full select-none', className)}>
      {(multiple || fileList.length === 0) && (
        <div
          onClick={openFileDialog}
          className={cn(
            'flex w-full items-center',
            'overflow-hidden rounded-md border bg-white',
            'cursor-pointer transition-all duration-150 ease-in-out',
            hasError ? 'border-destructive' : 'border-input hover:border-primary hover:bg-primary/10',
            isPending && 'cursor-not-allowed opacity-50'
          )}
        >
          <div className="flex h-9 items-center justify-center border-r border-transparent px-2.5">
            {isPending ? (
              <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <Paperclip className="size-4 text-primary" />
            )}
          </div>
          <div className="flex-grow truncate whitespace-nowrap px-3 py-2 text-sm font-medium text-primary">
            {isPending ? `${t('uploading')}... (${uploadProgress}%)` : t(buttonText)}
          </div>
        </div>
      )}

      {fileList?.length > 0 && (
        <div className={`${multiple ? 'mt-2' : ''} flex flex-col`}>
          {fileList?.map((file, index) => (
            <FileRow
              key={`${file.url}-${index}`}
              fileData={file}
              maxFilenameLength={maxFilenameLength}
              showPreview={showPreview}
              showDownload={showDownload}
              showFileSize={showFileSize}
              showRemove={!disabled}
              onRemove={() => removeFile(index)}
              onPreview={() => handleOpenFile(file)}
            />
          ))}
        </div>
      )}

      <Input
        ref={fileInputRef}
        className="hidden"
        type="file"
        multiple={multiple}
        accept={acceptTypes}
        disabled={disabled || isPending}
        onChange={handleFileChange}
      />
    </div>
  )
}

export const FileInput = memo(FileInputComponent)
