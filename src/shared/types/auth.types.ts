import { UserRole } from '@topcoder/constants'

export interface IUser {
  id: string
  name: string
  role: UserRole
  username: string
  email?: string
  phoneNumber?: string
}

export interface ILoginResponse {
  user: IUser
  accessToken: string
  refreshToken: string
}

export interface IAuth {
  user: IUser | null
  isLoading: boolean
  isLoggingOut: boolean
  isLogging: boolean
}
