import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    date: ""
}

export const date = createSlice({
    name: "date",
    initialState,
    reducers: {
        dateData: (state, action) => {
            state.date = action.payload
        }
    }
})

export const {dateData} = date.actions

export default date.reducer