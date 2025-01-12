import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    sendRandomMessages: false
}

export const sendRandomMessagesSlice = createSlice({
    name: "sendRandomMessagesSlice",
    initialState,
    reducers: {
        setSendRandomMessages: (state, action) => {
            state.sendRandomMessages = action.payload;
        },
    }
})

export const {setSendRandomMessages} = sendRandomMessagesSlice.actions;