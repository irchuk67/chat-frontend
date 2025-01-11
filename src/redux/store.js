import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger/src';
import {chatsSlice} from "./slices/chatsSlice";
import {selectedChatSlice} from "./slices/selectedChatSlice";
import {sideBarSlice} from "./slices/sideBarSlice";
import userSlice from "./slices/userSlice";
import {webSocketSlice} from "./slices/webSocketSlice";
import {searchTermSlice} from "./slices/searchTermSlice";
import {addChatSlice} from "./slices/addChatSlice";
import {updateChatSlice} from "./slices/updateChatSlice";

const store = configureStore({
    reducer: {
        chats: chatsSlice.reducer,
        sideBar: sideBarSlice.reducer,
        selectedChat: selectedChatSlice.reducer,
        user: userSlice.reducer,
        webSocket: webSocketSlice.reducer,
        searchTerm: searchTermSlice.reducer,
        addChat: addChatSlice.reducer,
        updateChat: updateChatSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;