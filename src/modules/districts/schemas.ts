import { z } from 'zod'

export const districtSchema = z.object({
  name: z.string().min(1, 'required_field'),
  soato: z.string().min(1, 'required_field'),
  regionId: z.string().min(1, 'required_field'),
})

export type DistrictSchemaType = z.infer<typeof districtSchema>
