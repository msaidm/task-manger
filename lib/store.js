import { configureStore } from '@reduxjs/toolkit'
import {authSlice} from '../lib/slices/authSlice'

export const makeStore = () => {
  const authReducer = authSlice.reducer
  return configureStore({
    reducer: {authReducer}
  })
}