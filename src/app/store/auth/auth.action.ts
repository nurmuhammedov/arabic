import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '@topcoder/api'
import { IUser, TypeAny } from '@topcoder/types'

export const login = createAsyncThunk<IUser, TypeAny>('auth/login', async (credentials) => {
  return AuthService.login(credentials)
})

export const oneIDLogin = createAsyncThunk<IUser, TypeAny>('auth/one-id', async (credentials) => {
  return AuthService.oneIDLogin(credentials)
})

export const me = createAsyncThunk<IUser>('auth/me', async () => {
  return AuthService.me()
})

export const register = createAsyncThunk<IUser, TypeAny>('auth/register', async (data) => {
  return AuthService.register(data)
})

export const logout = createAsyncThunk<string>('auth/logout', async () => {
  return AuthService.logout()
})
