import React, {useEffect, useRef} from 'react';
import {connect} from "react-redux";
import user from '../../img/user.jpg';
import deleteIcon from '../../img/delete.svg';
import './chatItem.scss'

const dateToNecessaryFormat = (currentDate) => {
    let date = new Date(currentDate);
    const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return longEnUSFormatter.format(date);
}


const ChatItem = ({chat, onSelect, selectedChat, sentMessages}) => {
    const {firstName, lastName, latestMessage} = chat;

    return (
        // <div className={`chat-item ${hasNewMessage()}`}
        //      onClick={onSelect}
        // >
        <div className={'chat-item' + " " + ((chat.unreadMessagesCount > 0 && selectedChat.id !== chat.id) && "chat-item__unread")} onClick={onSelect}>
            {/*{prevNumberOfSentMessages.current < sentMessages ? <audio autoPlay={true} src={sound()}/> : null }*/}
            <div>
                <img src={user} alt="Companion" className="img"/>
            </div>
            <div className="chat-item__content">
                <p className="chat-item__content--user-name">
                    {firstName + " " + (lastName ? lastName : "")}
                </p>
                {
                    latestMessage &&
                    <p className="chat-item__content--last-message">
                        {latestMessage.content}
                    </p>
                }
            </div>
            <div className="chat-item__info">
                {
                    latestMessage &&
                    <p className={'chat-item__last-date'}>
                        {dateToNecessaryFormat(latestMessage.date)}
                    </p>
                }
                {
                    (chat.unreadMessagesCount > 0 && selectedChat.id !== chat.id)
                    &&
                    <p className={'chat-item__unread-messages'}>
                        {chat.unreadMessagesCount}
                    </p>
                }
            </div>


        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedChat: state.selectedChat,
        sentMessages: state.sentMessages,
        hadPlayed: state.hadPlayed
    }
}
export default connect(mapStateToProps)(ChatItem);