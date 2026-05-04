import { z } from 'zod'
import { UserRole } from '@topcoder/constants'

export const userSchema = z.object({
  username: z.string().trim().min(3, 'username_too_short'),
  password: z.string().trim().min(6, 'password_too_short'),
  fullName: z.string().trim().min(1, 'required_field'),
  phoneNumber: z.string().trim().min(1, 'required_field'),
  email: z.string().trim().email('invalid_email'),
  regionId: z.string().trim().min(1, 'required_field'),
  districtId: z.string().trim().min(1, 'required_field'),
  role: z.nativeEnum(UserRole),
})
