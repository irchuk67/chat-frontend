import Sidebar from "../sidebar/sidebar";
import Chat from "../chat/chat";
import React, {useEffect, useState} from "react";
import {connectWebSocket, disconnectWebSocket} from "../../services/webSocketService";
import {useDispatch, useSelector} from "react-redux";
import {closeSocket, setError, setSessionId} from "../../redux/slices/webSocketSlice";
import ErrorMessage from "../errorMessage/errorMessage";
import Loading from "../loading/loading";
import {submitUser} from "../../api/chat";
import './chatWrapper.scss';

const ChatWrapper = (props) => {
    const [isWebSocketReady, setIsWebSocketReady] = useState(false);
    const dispatch = useDispatch();
    const {isLoading, error, sessionId} = useSelector((state) => state.webSocket);
    useEffect(() => {
        try {
            connectWebSocket(
                'ws://localhost:8000/chat',
                handleWebSocketMessage,
                handleWebSocketClose,
            );
        } catch (e) {
            dispatch(setError(e));
        }

    }, []);

    useEffect(() => {
        console.log(sessionId)
        if (sessionId){
            submitUser(sessionId, localStorage.getItem("token"))
        }
    }, [isWebSocketReady]);

    const handleWebSocketMessage = (data) => {
        console.log('Set sessionId' + (data && typeof data === 'string'));
        setIsWebSocketReady(true);
        dispatch(setSessionId(data));
    };

    const handleWebSocketClose = () => {
        dispatch(closeSocket());
    };

    const displayMainPart = () => {
        if (isLoading && !error && !sessionId) {
            return <Loading/>;
        } else if (error !== '' && !isLoading && !sessionId) {
            return <ErrorMessage message={error}/>;
        } else {
            return (
                <>
                    <Sidebar />
                    <Chat />
                </>
            );

        }

    }
    return (
        <div className="chat-wrapper">
            {
                displayMainPart()
            }
        </div>
    )
}

export default ChatWrapper;