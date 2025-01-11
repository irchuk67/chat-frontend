import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
}

export const addChatSlice = createSlice({
    name: "addChat",
    initialState,
    reducers: {
        openForm: (state, action) => {
            state.isOpen = true;
        },
        closeForm: (state, action) => {
            state.isOpen = false;
        }
    }
})

export const {openForm, closeForm} = addChatSlice.actions;