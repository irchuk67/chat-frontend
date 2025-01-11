import React, { useEffect, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {useNavigate} from "react-router-dom";

const GoogleAuth = () => {
    const navigate = useNavigate();
    const handleLoginSuccess = (credentialResponse) => {
        console.log("Login Success:", credentialResponse);
        localStorage.setItem("token", credentialResponse.credential);
        navigate("/chat")
    };

    const handleLoginFailure = () => {
        console.error("Login Failed");
    };

    return (
        <GoogleOAuthProvider clientId="811479879975-77634rmv1grsr1l1125jf3jvqlb26pqi.apps.googleusercontent.com">
            <div>
                <h1>Sign In with Google</h1>
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;
