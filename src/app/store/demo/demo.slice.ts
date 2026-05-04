import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
  demos: { id: number }[]
}

const initialState: IState = {
  demos: [],
}

export const demoSlice = createSlice({
  name: 'demos',
  initialState,
  reducers: {
    addDemo: (state, action: PayloadAction<{ id: number }>) => {
      const exists = state.demos.some((demo) => demo.id == action.payload.id)
      if (!exists) {
        state.demos.push(action.payload)
      }
    },
    deleteDemo: (state, action: PayloadAction<number>) => {
      state.demos = state.demos.filter((demo) => demo.id != action.payload)
    },
    updateDemo: (state, action: PayloadAction<{ id: number }>) => {
      const index = state.demos.findIndex((demo) => demo.id == action.payload.id)
      if (index !== -1) {
        state.demos[index] = action.payload
      }
    },
    clearDemos: (state) => {
      state.demos = []
    },
  },
})

export const { addDemo, deleteDemo, updateDemo, clearDemos } = demoSlice.actions

export const { reducer } = demoSlice
