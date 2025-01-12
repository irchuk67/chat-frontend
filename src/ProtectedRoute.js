import React from 'react';
import {connect, useSelector} from "react-redux";
import {Navigate, Route, useNavigate} from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Chat from "./components/chat/chat";
import {ToastProvider} from "./components/toast/toastContainer";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? <ToastProvider>{children}</ToastProvider> : <Navigate to="/login" />;
};

export default ProtectedRoute;