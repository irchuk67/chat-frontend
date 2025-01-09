import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger/src';
import {chatsSlice} from "./slices/chatsSlice";
import {selectedChatSlice} from "./slices/selectedChatSlice";
import {sideBarSlice} from "./slices/sideBarSlice";
import {messagesSlice} from "./slices/messagesSlice";

const store = configureStore({
    reducer: {
        chats: chatsSlice.reducer,
        sideBar: sideBarSlice.reducer,
        messages: messagesSlice.reducer,
        selectedChat: selectedChatSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;