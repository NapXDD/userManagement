import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: []
}

export const allUserList = createSlice({
    name: "allUserList",
    initialState,
    reducers:{
        allUserListData: (state, action) => {
            state.list = action.payload
        }
    }
})

export const {allUserListData} = allUserList.actions

export default allUserList.reducer
