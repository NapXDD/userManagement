import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './features/setAuth'
import userReducer from './features/setUser'
import dateReducer from './features/setDate'
import currentUserReducer from "./features/setCurrentUser"
import userListReducer  from './features/setUseList'
import searchListReducer from "./features/setSearchList"
import allUserListReducer from "./features/setAllUserList"

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    user: userReducer,
    date: dateReducer,
    currentUser: currentUserReducer,
    userList: userListReducer,
    searchList: searchListReducer,
    allUserList: allUserListReducer
  },
})