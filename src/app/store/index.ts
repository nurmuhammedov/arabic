import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@topcoder/store/rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  devTools: false,
})

export type AppDispatch = typeof store.dispatch
export type TypeRootState = ReturnType<typeof store.getState>
export * from './rootActions'
export * from './rootReducer'
