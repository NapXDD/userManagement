import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: {
        _id: "",
        username: "",
        email: "",
        avatar: "",
        birthDay: "",
        bio: "",
    }
}

export const user = createSlice({
    name: "user",
    initialState,
    reducers:{
        userData: (state, action) => {
            state.data = {
                ...state,
                _id: action.payload._id,
                username: action.payload.username,
                email: action.payload.email,
                avatar: action.payload.avatar,
                birthDay: action.payload.birthDay,
                bio: action.payload.bio
            }
        },
    }
})

export const {userData} = user.actions

export default user.reducer