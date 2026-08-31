import { z } from 'zod'

export const registerSchema = z
  .object({
    username: z.string().trim().min(5, 'login_min_length').max(30, 'login_max_length'),
    password: z.string().trim().min(8, 'password_min_length').max(72, 'password_max_length'),
    confirmPassword: z.string().trim().min(8, 'password_min_length'),
    fullName: z.string().trim().min(1, 'required_field').max(150, 'invalid_value'),
    phoneNumber: z.string().trim().max(20, 'invalid_value').optional().or(z.literal('')),
    email: z.string().trim().email('invalid_value'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwords_do_not_match',
    path: ['confirmPassword'],
  })
