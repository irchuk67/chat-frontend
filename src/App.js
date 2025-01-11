import React from "react";
import './App.scss';
import Sidebar from "./components/sidebar/sidebar";
import {useSelector} from "react-redux";
import Chat from "./components/chat/chat";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LogIn from "./components/login/logIn";
import ChatWrapper from "./components/chat-wrapper/chatWrapper";

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path={'/login'} element={<LogIn/>}/>
                    <Route
                        path="/chat"
                        element={
                            <ProtectedRoute
                                element={<ChatWrapper/>}
                            />
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>

    );
}


export default App;
