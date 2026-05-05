import { z } from 'zod'

export const regionSchema = z.object({
  name: z.string().min(1, 'required_field'),
  soato: z.string().min(1, 'required_field'),
})

export type RegionSchemaType = z.infer<typeof regionSchema>
