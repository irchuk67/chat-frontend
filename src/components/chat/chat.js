import {useDispatch, useSelector} from "react-redux";
import {open as openSideBar} from "../../redux/slices/sideBarSlice";
import {selectChat} from "../../redux/slices/selectedChatSlice";
import React, {useEffect, useState} from "react";
import Messages from "../messages/messages";
import {randomJoke} from "../../chucknorisAPI";
import user from '../../img/user.jpg';
import {getChatMessages} from "../../api/chat";
import {Send} from "@mui/icons-material";
import {sendWebSocketMessage} from "../../services/webSocketService";
import deleteIcon from "../../img/delete.svg";
import editIcon from "../../img/pencil.svg";
import './chat.scss';
import UpdateChat from "../updateChat/updateChat";
import {openForm} from "../../redux/slices/updateChatSlice";
import {openForm as openDeleteForm} from "../../redux/slices/deleteSlice";
import DeleteConfirmation from "../deleteConfirmation/deleteConfirmation";

const sendMessageFunc = (messageText, chatId) => {
    const newMessage = {
        type: "NEW_MESSAGE",
        message: {
            content: messageText,
            chatId: chatId,
        },
    }

    sendWebSocketMessage(JSON.stringify(newMessage));
}

const Chat = ({shouldRerenderMessages, handleRenderMessages}) => {
    const selectedChat = useSelector(state => state.selectedChat.chat);
    const isSideBarOpen = useSelector(state => state.sideBar.isOpen);
    const dispatch = useDispatch();
    const isUpdateFormOpen = useSelector(state => state.updateChat.isOpen);
    const isDeleteOpen = useSelector(state => state.deleteChat.isOpen);

    const onBackClick = () => {
        dispatch(openSideBar());
        dispatch(selectChat({chat: {}}));
    }

    const generateButton = () => {
        if (window.innerWidth <= 700) {
            return (
                <div className={'user__button'} onClick={() => onBackClick()}>
                    &larr;
                </div>
            )
        }
    }

    const [messageText, setMessageText] = useState('');
    const className = `chat ${isSideBarOpen ? 'invisible' : ''}`;

    const onMessageChange = (event) => {
        setMessageText(event.target.value);
    }

    const onMessageSend = (e) => {
        e.preventDefault();

        if (messageText) {
            sendMessageFunc(messageText, selectedChat.id);
            setMessageText('');
            handleRenderMessages()
        }
    }

    if (selectedChat.id) {
        const {firstName, lastName, latestMessage} = selectedChat;

        return (
            <div className={className}>
                <div className={'user'}>
                    {generateButton()}
                    <div className={'user__info'}>
                        <img src={user} alt="Companion" className="img"/>
                        <p className="user__name">
                            {firstName + " " + (lastName ? lastName : "")}
                        </p>
                    </div>
                    <div className={"change-chat"}>
                        <img src={editIcon}
                             alt={"edit"}
                             onClick={
                                 () => dispatch(openForm())
                             }/>
                        <img src={deleteIcon}
                             alt={"delete"}
                             onClick={
                                 (chatId) => {
                                     dispatch(openDeleteForm())
                                 }
                             }
                        />
                    </div>
                </div>
                <div className={"messages"}>
                    <Messages shouldRerenderMessages={shouldRerenderMessages} handleRenderMessages={handleRenderMessages}/>
                </div>
                <div className="write-field">
                    <form onSubmit={(e) => onMessageSend(e)}>
                        <input placeholder={'Type your message'}
                               value={messageText}
                               onChange={event => onMessageChange(event)}
                        />
                        <Send className={'send'} onClick={(e) => onMessageSend(e)}/>
                    </form>
                </div>
                {isUpdateFormOpen && <UpdateChat/>}
                {isDeleteOpen && <DeleteConfirmation/>}
            </div>
        )
    }
    return <div className={className}/>

}

export default Chat;