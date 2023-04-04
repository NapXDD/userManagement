import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: []
}

export const searchList = createSlice({
    name: "searchList",
    initialState,
    reducers:{
        searchListData: (state, action) => {
            state.list = action.payload
        }
    }
})

export const {searchListData} = searchList.actions

export default searchList.reducer