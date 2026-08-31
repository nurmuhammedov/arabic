import type { IWord } from '@topcoder/modules/dictionary/dictionary.types'

export enum GlossStatus {
  MISSING = 'MISSING',
  DRAFT = 'DRAFT',
  VERIFIED = 'VERIFIED',
}

export enum WordSource {
  QURAN = 'QURAN',
  PERSONAL = 'PERSONAL',
}

export enum PartOfSpeech {
  NOUN = 'NOUN',
  VERB = 'VERB',
  PARTICLE = 'PARTICLE',
}

export interface IAdminWord extends IWord {
  source: WordSource
  ownerId: string | null
}

export interface IWordPayload {
  arabic: string
  transcription?: string
  uz?: string
  ru?: string
  en?: string
  description?: string
  pos: PartOfSpeech
  verbForm?: number
  glossStatus?: GlossStatus
}
