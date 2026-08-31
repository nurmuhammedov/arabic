import { UserRole } from '@topcoder/constants'
import { z } from 'zod'

const identityFields = {
  username: z.string().trim().min(5, 'login_min_length').max(30, 'login_max_length'),
  fullName: z.string().trim().min(1, 'required_field').max(150, 'invalid_value'),
  phoneNumber: z.string().trim().max(20, 'invalid_value').optional().or(z.literal('')),
  email: z.string().trim().email('invalid_value'),
  role: z.nativeEnum(UserRole),
}

export const userBaseSchema = z.object({
  ...identityFields,
  password: z.string().trim().min(8, 'password_min_length').max(72, 'password_max_length'),
  confirmPassword: z.string().trim().min(8, 'password_min_length'),
})

export type UserSchemaType = z.infer<typeof userBaseSchema>

export const userSchema = userBaseSchema.refine((data) => data.password === data.confirmPassword, {
  message: 'passwords_do_not_match',
  path: ['confirmPassword'],
})

export const userEditBaseSchema = z.object({
  ...identityFields,
  changePassword: z.boolean(),
  password: z.string().trim().optional(),
  confirmPassword: z.string().trim().optional(),
})

export type UserEditSchemaType = z.infer<typeof userEditBaseSchema>

export const userEditSchema = userEditBaseSchema
  .refine((data) => !data.changePassword || (!!data.password && data.password.length >= 8), {
    message: 'password_min_length',
    path: ['password'],
  })
  .refine((data) => !data.changePassword || data.password === data.confirmPassword, {
    message: 'passwords_do_not_match',
    path: ['confirmPassword'],
  })
