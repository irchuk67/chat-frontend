import {createSlice} from "@reduxjs/toolkit";
import userChats from '../../userChats.json';

const initialState = {
    chats: userChats.chats
}
export const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        loadChats: (state, action) => {
            state.chats = action.payload;
        }
    }
})