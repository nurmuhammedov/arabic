import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '@topcoder/api'
import { ILoginResponse, IUser } from '@topcoder/types'

export const login = createAsyncThunk<ILoginResponse, Record<string, unknown>>('auth/login', async (credentials) => {
  return AuthService.login(credentials)
})

export const me = createAsyncThunk<IUser>('auth/me', async () => {
  return AuthService.me()
})

export const register = createAsyncThunk<ILoginResponse, Record<string, unknown>>('auth/register', async (data) => {
  return AuthService.register(data)
})

export const logout = createAsyncThunk<string>('auth/logout', async () => {
  return AuthService.logout()
})
