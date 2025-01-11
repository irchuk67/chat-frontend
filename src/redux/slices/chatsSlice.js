import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userChats from '../../userChats.json';
import {getAllChats} from "../../api/chat";

const initialState = {
    loading: false,
    data: [],
    error: "",
}

export const fetchChats = createAsyncThunk(
    "chats/fetchChats",
    async ({token, searchTerm}) => {
        return  await getAllChats(token, searchTerm);
    }
)
export const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChats.pending, state => {
            state.loading = true;
            state.data = [];
            state.error = "";
        })

        builder.addCase(fetchChats.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = ""
        })

        builder.addCase(fetchChats.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error.message ? action.error.message : "error";
        })
    }
})