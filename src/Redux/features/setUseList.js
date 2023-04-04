import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: []
}

export const userList = createSlice({
    name: "userList",
    initialState,
    reducers:{
        userListData: (state, action) => {
            state.list = action.payload
        }
    }
})

export const {userListData} = userList.actions

export default userList.reducer
