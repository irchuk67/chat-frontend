import React, { createContext, useContext, useState } from "react";
import Toast from "./toast";
import './toastContainer.scss';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, firstName, lastName) => {
        const id = Date.now();
        setToasts((prevToasts) => [...prevToasts, { id, message, firstName, lastName }]);

        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            <div className="toast-container">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        firstName={toast.firstName}
                        lastName={toast.lastName}
                        onClose={() =>
                            setToasts((prevToasts) =>
                                prevToasts.filter((t) => t.id !== toast.id)
                            )
                        }
                    />
                ))}
            </div>
            {children}
        </ToastContext.Provider>
    );
};
