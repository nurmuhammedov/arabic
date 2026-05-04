import { z } from 'zod'

export const individualSchema = z.object({
  identity: z
    .number({ message: 'required_field' })
    .min(10000000000000, 'invalid_value')
    .transform((v) => (v ? v?.toString() : null)),
  name: z.string({ message: 'required_field' }).min(1, 'invalid_value'),
  phone: z.string({ message: 'required_field' }).length(13, 'invalid_value'),
  email: z
    .string({ message: 'required_field' })
    .email({ message: 'required_field' })
    .optional()
    .nullable()
    .or(z.literal(''))
    ?.transform((v) => (v ? v : null)),
  birthDate: z.string({ message: 'required_field' }).min(1, 'required_field'),
  roles: z.array(z.string({ message: 'required_field' })).min(1, 'required_field'),
  regionId: z.string({ message: 'required_field' }).min(1, 'required_field'),
  districtId: z.string({ message: 'required_field' }).min(1, 'required_field'),
  address: z.string({ message: 'required_field' }).min(1, 'required_field'),
})

export const organizationSchema = z.object({
  identity: z
    .number({ message: 'required_field' })
    .min(100000000, 'required_field')
    .max(999999999, 'required_field')
    .transform((v) => (v ? v?.toString() : null)),
  name: z.string({ message: 'required_field' }).min(1, 'required_field'),
  directorName: z.string({ message: 'required_field' }).min(1, 'required_field'),
  phone: z.string({ message: 'required_field' }).length(13, 'required_field'),
  regionId: z.string({ message: 'required_field' }).min(1, 'required_field'),
  districtId: z.string({ message: 'required_field' }).min(1, 'required_field'),
  address: z.string({ message: 'required_field' }).min(1, 'required_field'),
  roles: z.array(z.string({ message: 'required_field' })).min(1, 'required_field'),
})

export const employeeSchema = z.object({
  identity: z
    .number({ message: 'required_field' })
    .min(10000000000000, 'required_field')
    .transform((v) => (v ? v?.toString() : null)),
  name: z.string({ message: 'required_field' }).min(1, 'required_field'),
  phone: z.string({ message: 'required_field' }).length(13, 'required_field'),
  permissions: z.array(z.string({ message: 'required_field' })).min(1, 'required_field'),
  branchIds: z.array(z.string()),
})
