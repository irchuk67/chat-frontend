import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
}

export const deleteChatSlice = createSlice({
    name: "deleteChat",
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

export const {openForm, closeForm} = deleteChatSlice.actions;

