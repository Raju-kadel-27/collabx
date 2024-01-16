import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedGroups: []
}

export const groupSlice = createSlice({
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
    addToGroup,
    removeFromGroup
} = groupSlice.actions

export default groupSlice.reducer

export const groupSelector = (state) => state.classroom.groupSlice