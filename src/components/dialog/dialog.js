import React, { useState } from "react";
import "./dialog.scss";

const Dialog = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <button className="dialog-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Dialog;
