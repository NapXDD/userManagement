import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: Boolean,
}

export const authentication = createSlice({
    name: "auth",
    initialState,
    reducers:{
        loginSuccess: (state) => {
            state.value = true
        },
        loginFail: (state) => {
            state.value = false
        },
        logout: (state) => {
            state.value = false
        }
    }
})

export const {loginSuccess, loginFail, logout} = authentication.actions

export default authentication.reducer