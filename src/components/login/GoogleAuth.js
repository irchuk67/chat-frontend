import React, { useEffect, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, googleLogout  } from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import logout from "../../img/logout.svg";
import './GoogleAuth.scss';

const GoogleAuth = () => {
    const navigate = useNavigate();
    const handleLoginSuccess = (credentialResponse) => {
        console.log("Login Success:", credentialResponse);
        localStorage.setItem("token", credentialResponse.credential);
        navigate("/chat")
    };

    const handleLogout = () => {
        googleLogout(); // Clears the Google session
        localStorage.removeItem("token"); // Clear user data from localStorage if stored
        console.log("User logged out successfully");
        navigate("/login");
    };

    const handleLoginFailure = () => {
        console.error("Login Failed");
    };

    return (
        <GoogleOAuthProvider clientId="811479879975-77634rmv1grsr1l1125jf3jvqlb26pqi.apps.googleusercontent.com">
            {
                localStorage.getItem("token") ?
                    <button onClick={handleLogout} className={"log-out__btn"}>
                        <img src={logout} alt="Log out" className={"log-out__icon"}/>
                    </button> :
                    <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure}/>
            }
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;
