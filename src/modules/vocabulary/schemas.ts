import { z } from 'zod'

import { VocabularyStatus } from './vocabulary.types'

export const vocabularySchema = z.object({
  arabic: z.string().min(1, 'required_field'),
  transcriptionAr: z.string().optional(),
  uzbek: z.string().min(1, 'required_field'),
  russian: z.string().optional(),
  english: z.string().optional(),
  transcriptionEn: z.string().optional(),
  imageIds: z.array(z.string()).optional(),
  fileIds: z.array(z.string()).optional(),
  status: z.nativeEnum(VocabularyStatus).default(VocabularyStatus.NEW),
  description: z.string().optional(),
})
