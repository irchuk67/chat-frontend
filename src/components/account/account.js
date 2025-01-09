import React from "react";
import accountPhoto from '../../img/user.jpg';
import './account.scss';

const Account = () => {
    return(
        <div className={'account'}>
            <div className={'account__user'}>
                <img alt={'Current user'}
                     src={accountPhoto}
                     className={'img'}
                />
                {/*<CheckCircleOutline className={'is-active'}/>*/}
            </div>
            {/*<div className={'account__sign-out'}>*/}
            {/*    <GoogleAuth/>*/}
            {/*</div>*/}
        </div>

    )
}

export default Account;