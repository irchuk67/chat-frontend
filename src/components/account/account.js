import React from "react";
import accountPhoto from '../../img/user.jpg';
import GoogleAuth from "../login/GoogleAuth";
import './account.scss';
import Toggle from "../toggle/toggle";

const Account = () => {
    return(
        <div className={'account'}>
            <div className={'account__user'}>
                <img alt={'Current user'}
                     src={accountPhoto}
                     className={'img'}
                />
            </div>
            <div className={'account__sign-out'}>
                <GoogleAuth/>
            </div>
        </div>

    )
}

export default Account;