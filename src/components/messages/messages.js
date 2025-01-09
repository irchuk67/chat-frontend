import React, { useEffect, useRef} from "react";
import Message from "../message/message";
import {connect, useSelector} from "react-redux";
import './messages.scss';

const Messages = (props) => {
    const selectedChat = useSelector(state => state.selectedChat);
    const messagesList = useSelector(state => state.messages);
    const prevMessages = useRef(messagesList.messages);
    useEffect(() => {
        prevMessages.current = messagesList.messages;
    })

    const {chatId, companionImage} = selectedChat;

    if((window.sessionStorage.getItem(selectedChat.chatId) === null) ||  prevMessages.current !== messagesList.messages){
        // props.getMessageHistory(selectedChat.chatId);
        window.sessionStorage.setItem(selectedChat.chatId, JSON.stringify(messagesList.messages));
    }

    const messages = JSON.parse(window.sessionStorage.getItem(chatId));

    return messages.map(message => {
        const MyMessage = () => {
            return(
                <div className={'my-message'}>
                    <Message message={message} />
                </div>)
        }
        const CompanionMessage = () => {
            return(
                <div className={'not-my-message'}>
                    <Message message={message}  companion={companionImage}/>
                </div>
            )
        }

        return (
            message.isMyMessage ?  <MyMessage key={message.sendDateTime}/> : <CompanionMessage key={message.sendDateTime}/>
        )
    });


}

export default Messages;