import React, {useEffect, useState} from "react";
import Message from "../message/message";
import {useSelector} from "react-redux";
import './messages.scss';
import {getChatMessages} from "../../api/chat";

const Messages = ({shouldRerenderMessages}) => {
    const selectedChat = useSelector(state => state.selectedChat.chat);
    const [messagesList, setMessagesList] = useState([]);

    useEffect(() => {
        getChatMessages(selectedChat.id, localStorage.getItem('token'))
            .then(response => setMessagesList(response))
            .catch(error => console.error("Failed to fetch messages:", error));
    }, [selectedChat, shouldRerenderMessages]);

    const MyMessage = ({ message }) => (
        <div className={'my-message'}>
            <Message message={message} />
        </div>
    );

    const CompanionMessage = ({ message }) => (
        <div className={'not-my-message'}>
            <Message message={message} />
        </div>
    );

    return messagesList.map(message => (
        (message.messageType === "SENT") ?
            <MyMessage key={message.id} message={message} /> :
            <CompanionMessage key={message.id} message={message} />
    ));
};

export default Messages;
