import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedChat: null,
    notification: [],
    chats: []
}

export const chatSlice = createSlice({
    name: 'textChat',
    initialState,
    reducers: {
        handleSelectedChat: (state, action) => {
            state.selectedChat = action.payload
        },
        handleNotification: (state, action) => {
            state.notification = action.payload
        },
        handleChats: (state, action) => {
            state.chats = action.payload
        },
    },
})

export const {
    handleChats,
    handleSelectedChat,
    handleNotification
} = chatSlice.actions

export default chatSlice.reducer

export const textChatSelector = (state) => state.root.textChat.textChat

