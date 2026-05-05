import { IFile } from '@topcoder/types'

export enum VocabularyStatus {
  NEW = 'NEW',
  LEARNING = 'LEARNING',
  REVIEW = 'REVIEW',
  LEARNED = 'LEARNED',
  ARCHIVED = 'ARCHIVED',
}

export interface IVocabulary {
  id: string
  createdAt: string
  updatedAt: string
  arabic: string
  transcriptionAr?: string
  uzbek: string
  russian?: string
  english?: string
  transcriptionEn?: string
  images?: IFile[]
  files?: IFile[]
  status: VocabularyStatus
  description?: string
}

export type IVocabularyCreatePayload = Omit<
  IVocabulary,
  'id' | 'createdAt' | 'updatedAt' | 'images' | 'files' | 'status'
> & {
  imageIds?: string[]
  fileIds?: string[]
  status?: VocabularyStatus
}
