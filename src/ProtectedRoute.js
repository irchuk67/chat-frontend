import React from 'react';
import {connect, useSelector} from "react-redux";
import {Navigate, Route, useNavigate} from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Chat from "./components/chat/chat";

const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    // If signed in, render the passed element (Sidebar + Chat)
    if (token) {
        return element;
    } else {
        // If not signed in, redirect to login page
        return null;
    }
};

export default ProtectedRoute;