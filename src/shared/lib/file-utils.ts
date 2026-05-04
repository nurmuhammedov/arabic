import { BASE_URL } from '@topcoder/config'

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const truncateFilename = (filename: string, maxLength: number = 20): string => {
  if (filename.length <= maxLength) return filename
  const extension = filename.split('.').pop()
  const name = filename.substring(0, filename.lastIndexOf('.'))
  return `${name.substring(0, maxLength - 3)}...${extension}`
}

export const getFullUrl = (url: string | null | undefined): string => {
  if (!url) return ''
  if (url.startsWith('http') || url.startsWith('blob:')) return url
  return `${BASE_URL}${url}`
}

export const openFileInNewTab = async (url: string, fileName: string = 'file') => {
  try {
    const fullUrl = getFullUrl(url)
    const response = await fetch(fullUrl)
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.target = '_blank'
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100)
  } catch (error) {
    console.error(error)
    window.open(getFullUrl(url), '_blank')
  }
}
