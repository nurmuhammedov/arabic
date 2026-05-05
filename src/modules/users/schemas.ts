import { UserRole } from '@topcoder/constants'
import { z } from 'zod'

export const userBaseSchema = z.object({
  username: z.string().trim().min(3, 'invalid_value'),
  fullName: z.string().trim().min(1, 'required_field'),
  phoneNumber: z.string().trim().length(13, 'invalid_value'),
  email: z.string().trim().email('invalid_value'),
  regionId: z.string().trim().min(1, 'required_field'),
  districtId: z.string().trim().min(1, 'required_field'),
  role: z.nativeEnum(UserRole),
  password: z.string().trim().min(6, 'invalid_value'),
  confirmPassword: z.string().trim().min(6, 'invalid_value'),
})

export interface UserSchemaType extends z.infer<typeof userBaseSchema> {}

export const userSchema = userBaseSchema.refine((data) => data.password === data.confirmPassword, {
  message: 'invalid_value',
  path: ['confirmPassword'],
})

export const userEditBaseSchema = z.object({
  username: z.string().trim().min(3, 'invalid_value'),
  fullName: z.string().trim().min(1, 'required_field'),
  phoneNumber: z.string().trim().length(13, 'invalid_value'),
  email: z.string().trim().email('invalid_value'),
  regionId: z.string().trim().min(1, 'required_field'),
  districtId: z.string().trim().min(1, 'required_field'),
  role: z.nativeEnum(UserRole),
  changePassword: z.boolean(),
  password: z.string().trim().optional(),
  confirmPassword: z.string().trim().optional(),
})

export interface UserEditSchemaType extends z.infer<typeof userEditBaseSchema> {}

export const userEditSchema = userEditBaseSchema
  .refine(
    (data) => {
      if (data.changePassword) {
        return !!data.password && data.password.length >= 6
      }
      return true
    },
    {
      message: 'invalid_value',
      path: ['password'],
    }
  )
  .refine(
    (data) => {
      if (data.changePassword) {
        return data.password === data.confirmPassword
      }
      return true
    },
    {
      message: 'invalid_value',
      path: ['confirmPassword'],
    }
  )
