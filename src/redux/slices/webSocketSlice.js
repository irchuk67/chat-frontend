import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sessionId: '',
    message: '',
    loading: false,
    error: '',
    results: [],
};

export const webSocketSlice = createSlice({
    name: 'webSocket',
    initialState,
    reducers: {
        setSessionId: (state, action) => {
            if (typeof action.payload === 'string') {
                console.log('setSessionId', action.payload);
                state.sessionId = action.payload;
                if (state.results.length === 0) {
                    state.loading = true;
                } else {
                    state.loading = false;
                }
            }
        },
        writeMessage: (state, action) => {
            state.message = action.payload;
        },
        clearMessage: (state) => {
            state.message = '';
            if (state.results.length === 0) {
                state.loading = true;
            }
        },
        writeResults: (state, action) => {
            state.results = action.payload;
            state.loading = false;
        },
        clearResults: (state) => {
            state.results = [];
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        closeSocket: (state) => {
            state.sessionId = '';
            state.message = '';
            state.loading = false;
        },
    },
});

export const {
    setSessionId,
    writeMessage,
    clearMessage,
    writeResults,
    setError,
    clearResults,
    closeSocket,
} = webSocketSlice.actions;

export default webSocketSlice.reducer;