import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: { chatId: null, chatName: null },
    reducers: {
        setChat: (state, action) => {
            state.chatId = action.payload.chatId;
            state.chatName = action.payload.chatName;
        },
    },
});

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;
