import React, {useEffect, useState} from "react";
import Message from "../message/message";
import {useDispatch, useSelector} from "react-redux";
import './messages.scss';
import {getChatMessages} from "../../api/chat";
import {sendWebSocketMessage} from "../../services/webSocketService";
import {selectChat} from "../../redux/slices/selectedChatSlice";

const Messages = ({shouldRerenderMessages, handleRenderMessages}) => {
    const selectedChat = useSelector(state => state.selectedChat.chat);
    const [messagesList, setMessagesList] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getChatMessages(selectedChat.id, localStorage.getItem('token'))
            .then(response => {
                setMessagesList(response);
                if (selectedChat.unreadMessagesCount > 0) {
                    const unreadMessages = {
                        type: 'SET_AS_READ',
                        messages: response
                            .filter(message => !message.isRead)
                            .map(message => message._id)

                    }
                    sendWebSocketMessage(JSON.stringify(unreadMessages));
                    dispatch(selectChat({...selectedChat, unreadMessagesCount: 0}));
                    handleRenderMessages();
                }
            })
            .catch(error => console.error("Failed to fetch messages:", error));


    }, [selectedChat, shouldRerenderMessages]);

    const MyMessage = ({message}) => (
        <div className={'my-message'}>
            <Message message={message}/>
        </div>
    );

    const CompanionMessage = ({message}) => (
        <div className={'not-my-message'}>
            <Message message={message}/>
        </div>
    );

    return messagesList.map(message => (
        (message.messageType === "SENT") ?
            <MyMessage key={message.id} message={message}/> :
            <CompanionMessage key={message.id} message={message}/>
    ));
};

export default Messages;
