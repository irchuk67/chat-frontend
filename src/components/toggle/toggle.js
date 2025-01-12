import React, { useState } from 'react';
import './toggle.scss';
import {useDispatch, useSelector} from "react-redux";
import {setSendRandomMessages} from "../../redux/slices/sendRandomMessagesSlice";

const Toggle = ({ label, handleClick }) => {
    const isOn = useSelector(state => state.sendRandomMessages.sendRandomMessages)
    const dispatch = useDispatch();
    const handleToggle = () => {
        dispatch(setSendRandomMessages(!isOn));
        handleClick(!isOn);
    };

    return (
        <div className="toggle-container" onClick={handleToggle}>
            {label && <span className="toggle-label">{isOn ? `${label}: On` : `${label}: Off`}</span>}

            <div className={`toggle-switch ${isOn ? 'on' : ''}`}>
                <div className="toggle-circle"></div>
            </div>
        </div>
    );
};

export default Toggle;
