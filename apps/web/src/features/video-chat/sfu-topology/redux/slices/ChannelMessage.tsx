import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: []
}

export const channelMessageSlice = createSlice({
    name: 'channelMessage',
    initialState,
    reducers: {
        storeNewMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    },
})

export const { storeNewMessage } = channelMessageSlice.actions;

export default channelMessageSlice.reducer;

export const channelMessageSelector = (state) => state.sfu.channelMessage;
