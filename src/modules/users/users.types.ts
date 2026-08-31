import type { UserRole } from '@topcoder/constants'

export interface IUser {
  id: string
  username: string
  password?: string
  fullName: string
  phoneNumber?: string
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export type IUserCreatePayload = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>

export type IUserUpdatePayload = Partial<IUserCreatePayload>
