import { createSlice } from '@reduxjs/toolkit'

const initialState = {
}


export const calendarSlice = createSlice({
    name: 'groupSlice',
    initialState,
    reducers: {
        addToGroup: (state, action) => {
            state.selectedGroups.push(action.payload)
        },
        removeFromGroup: (state, action) => {
            state.selectedGroups.filter(item => item.id !== action.payload.id)
        },
    },
})

export const {
} = groupSlice.actions

export default calendarSlice.reducer

export const calendarSelector = (state) => state.classroom.calendarSlice