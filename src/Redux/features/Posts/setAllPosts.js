import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: []
}

export const allPostsList = createSlice({
    name: "allPostsList",
    initialState,
    reducers:{
        allPostsListData: (state, action) => {
            state.list = action.payload
        }
    }
})

export const {allPostsListData} = allPostsList.actions

export default allPostsList.reducer