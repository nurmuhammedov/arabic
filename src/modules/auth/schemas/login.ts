import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'required_field')
    .min(5, 'invalid_value')
    .max(30, 'invalid_value')
    .regex(/^\S*$/, 'invalid_value')
    .regex(/^[a-zA-Z0-9_]+$/, 'invalid_value')
    .regex(/^(?!_)[a-zA-Z0-9_]+(?<!_)$/, 'invalid_value')
    .regex(/^(?!.*_{2})/, 'invalid_value'),
  password: z
    .string()
    .trim()
    .min(1, 'required_field')
    .min(6, 'invalid_value')
    .max(30, 'invalid_value')
    .regex(/^\S*$/, 'invalid_value')
    .regex(/^[a-zA-Z0-9!@#%^&*()_$]+$/, 'invalid_value'),
})
