import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    term: ""
}

export const searchTermSlice = createSlice({
    name: "searchTerm",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.term = action.payload;
        }
    }
})

export const { setSearchTerm } = searchTermSlice.actions;