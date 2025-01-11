import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isSignedIn: false,
    idToken: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.isSignedIn = true;
            state.idToken = action.payload;
        },
        signOut: (state, action) => {
            state.isSignedIn = false;
            state.idToken = "";
        }
    },
})

export default userSlice;
export const {signIn, signOut} = userSlice.actions;