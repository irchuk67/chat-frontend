import Sidebar from "../sidebar/sidebar";
import Chat from "../chat/chat";
import React, { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket } from "../../services/webSocketService";
import { useDispatch, useSelector } from "react-redux";
import { closeSocket, setError, setSessionId } from "../../redux/slices/webSocketSlice";
import { submitUser } from "../../api/chat";
import './chatWrapper.scss';
import { useToast } from "../toast/toastContainer";
import {setSendRandomMessages} from "../../redux/slices/sendRandomMessagesSlice";

const ChatWrapper = () => {
    const [shouldRerenderMessages, setShouldRerenderMessages] = useState(false);
    const [isWebSocketReady, setIsWebSocketReady] = useState(false);
    const [sessionId, setSessionId] = useState(false);
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const chats = useSelector(state => state.chats);

    useEffect(() => {
        try {
            connectWebSocket(
                "wss://chat-backend-811479879975.europe-central2.run.app/chat",
                handleWebSocketMessage,
                handleWebSocketClose
            );
        } catch (e) {
            dispatch(setError(e));
        }
    }, []);

    const handleRenderMessages = () => {
        setShouldRerenderMessages((prevState) => !prevState);
    };

    useEffect(() => {
        console.log(sessionId);
        if (sessionId) {
            submitUser(sessionId, localStorage.getItem("token"))
                .then(res => dispatch(setSendRandomMessages(res.sendRandomMessages)));
        }
    }, [sessionId]);

    const isObject = (data) => {
        try {
            JSON.parse(data);
            return true;
        } catch (error) {
            console.log(error);
        }
    };

    const handleWebSocketMessage = (data) => {
        console.log("Set sessionId" + (data && typeof data === "string"));
        if (data && !isObject(data)) {
            console.log("Set sessionId");
            setIsWebSocketReady(true);
            setSessionId(data);
        } else {
            console.log("Add message ", data);
            const message = JSON.parse(data);
            addToast(message.content,  message.firstName, message.lastName);
            handleRenderMessages();
        }
    };

    const handleWebSocketClose = () => {
        dispatch(closeSocket());
    };

    const displayMainPart = () => {
        return (
            <>
                <Sidebar shouldRerenderMessages={shouldRerenderMessages} />
                <Chat
                    shouldRerenderMessages={shouldRerenderMessages}
                    handleRenderMessages={handleRenderMessages}
                />
            </>
        );
    };

    return (
        <div className="chat-wrapper">
            {displayMainPart()}
        </div>
    );
};

export default ChatWrapper;
