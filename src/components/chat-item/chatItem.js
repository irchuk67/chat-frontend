import React, {useEffect, useRef} from 'react';
import './chatItem.scss'
import {connect} from "react-redux";
import user from '../../img/user.jpg';

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
    // const prevNumberOfSentMessages = useRef(0);
    // useEffect(()=>{
    //     console.log(chat)
    //     prevNumberOfSentMessages.current = sentMessages;
    // });
    //
    // const hasNewMessage = () => {
    //     if (selectedChat.chatId !== chat.chatId){
    //         if(chat.latestMessage.isNewMessage){
    //             return 'newMessage'
    //         }
    //     }else{
    //         let chats = JSON.parse(window.sessionStorage.getItem('chatList'));
    //         for (let i = 0; i < chats.length; i++) {
    //             if(chats[i].chatId === chat.chatId){
    //                 chats[i].latestMessage.isNewMessage = false
    //             }
    //         }
    //         window.sessionStorage.setItem('chatList', JSON.stringify(chats));
    //     }
    // }
    //
    // const setSoundPlayed = () => {
    //     let chats = JSON.parse(window.sessionStorage.getItem('chatList'));
    //     for (let i = 0; i < chats.length; i++) {
    //         if(chats[i].chatId === chat.chatId){
    //             chats[i].latestMessage.hadSoundPlayed = true
    //         }
    //     }
    //     window.sessionStorage.setItem('chatList', JSON.stringify(chats));
    // }
    //
    // const sound = () => {
    //     if(!chat.latestMessage.hadSoundPlayed){
    //         console.log(chat.latestMessage)
    //         setSoundPlayed();
    //         return soundReceived
    //     }
    //     return null
    // }
    console.log(chat)
    const {firstName, lastName, latestMessage} = chat;

    return (
        // <div className={`chat-item ${hasNewMessage()}`}
        //      onClick={onSelect}
        // >
        <div className={'chat-item'} onClick={onSelect}>
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
            {
                latestMessage &&
                <p className={'chat-item__last-date'}>
                    {dateToNecessaryFormat(latestMessage.date)}
                </p>
            }

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