import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    chat: {}
}
export const selectedChatSlice = createSlice({
    name: "selectedChat",
    initialState,
    reducers: {
        selectChat: (state, action) => {
            state.chat = action.payload;
        }
    }
})

export const {selectChat} = selectedChatSlice.actions;