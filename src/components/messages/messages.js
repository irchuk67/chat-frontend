import React, {useEffect, useState} from "react";
import Message from "../message/message";
import {useDispatch, useSelector} from "react-redux";
import {getChatMessages} from "../../api/chat";
import {sendWebSocketMessage} from "../../services/webSocketService";
import {selectChat} from "../../redux/slices/selectedChatSlice";
import './messages.scss';

const Messages = ({shouldRerenderMessages, handleRenderMessages, setMessageId, setUpdate, setMessageText}) => {
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
            <Message message={message}
                     canEdit={true}
                     handleRenderMessages={handleRenderMessages}
                     setMessageText={setMessageText}
                     setUpdate={setUpdate}
                     setMessageId={setMessageId}
            />
        </div>
    );

    const CompanionMessage = ({message}) => (
        <div className={'not-my-message'}>
            <Message message={message} handleRenderMessages={handleRenderMessages} />
        </div>
    );

    return messagesList.map(message => (
        (message.messageType === "SENT") ?
            <MyMessage key={message.id} message={message}/> :
            <CompanionMessage key={message.id} message={message}/>
    ));
};

export default Messages;
