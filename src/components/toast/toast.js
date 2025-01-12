import React from "react";
import "./toast.scss";

const Toast = ({ message, firstName, lastName = "", type = "info", onClose }) => {
    return (
        <div className={`toast toast-${type}`}>
            <p>{firstName} {lastName}: <span>{message}</span></p>
            <button className="toast-close" onClick={onClose}>
                &times;
            </button>
        </div>
    );
};

export default Toast;
