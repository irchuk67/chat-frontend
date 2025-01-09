import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    messages: [],
}

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        changeMessageHistory: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages = [...state.messages, action.payload];
        },

    }
})

export const {changeMessageHistory, addMessage} = messagesSlice.actions;