import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'required_field')
    .min(5, 'login_min_length')
    .max(30, 'login_max_length')
    .regex(/^\S*$/, 'no_spaces')
    .regex(/^[a-zA-Z0-9_]+$/, 'login_alphanumeric')
    .regex(/^(?!_)[a-zA-Z0-9_]+(?<!_)$/, 'login_underscore_edge')
    .regex(/^(?!.*_{2})/, 'login_consecutive_underscore'),
  password: z
    .string()
    .trim()
    .min(1, 'required_field')
    .min(6, 'password_min_length')
    .max(30, 'password_max_length')
    .regex(/^\S*$/, 'no_spaces')
    .regex(/^[a-zA-Z0-9!@#%^&*()_$]+$/, 'password_allowed_chars'),
})
