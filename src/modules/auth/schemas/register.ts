import { z } from 'zod'

export const registerSchema = z
  .object({
    username: z.string().trim().min(3, 'invalid_value'),
    password: z.string().trim().min(6, 'invalid_value'),
    confirmPassword: z.string().trim().min(6, 'invalid_value'),
    fullName: z.string().trim().min(1, 'required_field'),
    phoneNumber: z.string().trim().min(1, 'required_field'),
    email: z.string().trim().email('invalid_value'),
    regionId: z.string().trim().min(1, 'required_field'),
    districtId: z.string().trim().min(1, 'required_field'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'invalid_value',
    path: ['confirmPassword'],
  })
