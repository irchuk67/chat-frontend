import React from "react";
import './App.scss';
import Sidebar from "./components/sidebar/sidebar";
import {useSelector} from "react-redux";
import Chat from "./components/chat/chat";

const App = () => {
    const selectedChat = useSelector((state) => state.selectedChat.chat)
    return (
        <div className="app">
            <Sidebar/>
            <Chat/>
        </div>
    );
}


export default App;
