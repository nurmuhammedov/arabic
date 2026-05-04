import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login, logout, me, register } from '@topcoder/store'
import { IAuth, IUser } from '@topcoder/types'

const initialState: IAuth = {
  user: null,
  isLoading: true,
  isLoggingOut: false,
  isLogging: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLogging = true
        state.user = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload
        state.isLogging = false
      })
      .addCase(login.rejected, (state) => {
        state.isLogging = false
        state.user = null
      })
      .addCase(register.pending, (state) => {
        state.isLogging = true
        state.user = null
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload
        state.isLogging = false
      })
      .addCase(register.rejected, (state) => {
        state.isLogging = false
        state.user = null
      })
      .addCase(me.pending, (state) => {
        state.isLoading = true
        state.user = null
      })
      .addCase(me.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(me.rejected, (state) => {
        state.isLoading = false
        state.user = null
      })
      .addCase(logout.pending, (state) => {
        state.isLoggingOut = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isLoggingOut = false
      })
      .addCase(logout.rejected, (state) => {
        state.isLoggingOut = false
      })
  },
})

export const { reducer } = authSlice
