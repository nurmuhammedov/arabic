import { z } from 'zod'

import { PartOfSpeech } from './admin-dictionary.types'

export const wordSchema = z.object({
  arabic: z.string().trim().min(1, 'required').max(96),
  transcription: z.string().trim().max(96).optional(),
  uz: z.string().trim().max(255).optional(),
  ru: z.string().trim().max(255).optional(),
  en: z.string().trim().max(255).optional(),
  description: z.string().trim().optional(),
  pos: z.nativeEnum(PartOfSpeech),
})

export type WordSchemaType = z.infer<typeof wordSchema>
