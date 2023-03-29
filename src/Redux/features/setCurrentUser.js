import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: {
        _id: "",
        username: "",
        email: "",
        avatar: ""
    }
}

export const currentUser = createSlice({
    name: "currentUser",
    initialState,
    reducers:{
        currentUserData: (state, action) => {
            state.data = {
                ...state,
                _id: action.payload._id,
                username: action.payload.username,
                email: action.payload.email,
                avatar: action.payload.avatar
            }
        },
    }
})

export const {currentUserData} = currentUser.actions

export default currentUser.reducer