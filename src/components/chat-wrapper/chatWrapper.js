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
    const [shouldRerenderMessages, setShouldRerenderMessages] = useState(false);
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

    const handleRenderMessages = () => {
        setShouldRerenderMessages(prevState => !prevState);
    }

    useEffect(() => {
        console.log(sessionId)
        if (sessionId){
            submitUser(sessionId, localStorage.getItem("token"))
        }
    }, [isWebSocketReady]);

    const isObject = (data) => {
        try {
            JSON.parse(data);
            return true;
        } catch (error) {
            console.log(error);
        }
    };

    const handleWebSocketMessage = (data) => {
        console.log('Set sessionId' + (data && typeof data === 'string'));
        if (data && !isObject(data)) {
            console.log('Set sessionId');
            setIsWebSocketReady(true);
            dispatch(setSessionId(data));
        }else{
            console.log("Add message ", data);
            handleRenderMessages();
        }
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
                    <Sidebar shouldRerenderMessages={shouldRerenderMessages}/>
                    <Chat shouldRerenderMessages={shouldRerenderMessages}
                          handleRenderMessages={handleRenderMessages} />
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