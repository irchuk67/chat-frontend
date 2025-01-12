import React from 'react';
import {connect, useSelector} from "react-redux";
import {Navigate, Route, useNavigate} from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Chat from "./components/chat/chat";
import {ToastProvider} from "./components/toast/toastContainer";

const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    if (token) {
        return <ToastProvider>{element}</ToastProvider>;
    } else {
        return null;
    }
};

export default ProtectedRoute;