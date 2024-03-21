import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../pages/login/authSlice'

export const store = configureStore({
  reducer: {
    authSlice,
  },
})