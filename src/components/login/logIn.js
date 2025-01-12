import React from 'react';
import GoogleAuth from "./GoogleAuth";
import './logIn.scss';
import {connect, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const LogIn = (props) => {
    const signedUser = useSelector((state) => state.user);
    const token = localStorage.getItem('token');
    if (!token){
        return (
            <div className={'log-in'}>
                <div className="log-in__content">
                    <p className="log-in__heading">
                        My Chat
                    </p>
                    <GoogleAuth className="log-in__button"/>
                </div>
            </div>
        )
    }else {
        return <Navigate to={'/chat'}/>
    }

}

export default LogIn;