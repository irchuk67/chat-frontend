import React, {useEffect, useRef, useState} from "react";
import Message from "../message/message";
import {connect, useSelector} from "react-redux";
import user from '../../img/user.jpg';
import './messages.scss';
import {getChatMessages} from "../../api/chat";

const Messages = (props) => {
    const selectedChat = useSelector(state => state.selectedChat.chat);
    const [messagesList, setMessagesList] = useState([]);

    useEffect(() => {
        getChatMessages(selectedChat.id, localStorage.getItem('token'))
            .then(response => setMessagesList(response))
    }, [selectedChat]);



    return messagesList.map(message => {
        const MyMessage = () => {
            return(
                <div className={'my-message'}>
                    <Message message={message} />
                </div>)
        }
        const CompanionMessage = () => {
            return(
                <div className={'not-my-message'}>
                    <Message message={message}/>
                </div>
            )
        }

        return (
            (message.messageType === "SENT") ?  <MyMessage key={message.sendDateTime}/> : <CompanionMessage key={message.sendDateTime}/>
        )
    });


}

export default Messages;