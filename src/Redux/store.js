import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './features/setAuth'
import userReducer from './features/setUser'
import dateReducer from './features/setDate'
import currentUserReducer from "./features/setCurrentUser"

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    user: userReducer,
    date: dateReducer,
    currentUser: currentUserReducer
  },
})