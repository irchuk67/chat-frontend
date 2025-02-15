import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: true
}
export const sideBarSlice = createSlice({
    name: "sideBar",
    initialState,
    reducers: {
        open: (state, action) => {
            state.isOpen = true;
        },
        close: (state, action) => {
            state.isOpen = false;
        }
    }
})

export const {open, close} = sideBarSlice.actions;