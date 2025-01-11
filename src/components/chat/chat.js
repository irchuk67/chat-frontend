import {useDispatch, useSelector} from "react-redux";
import {open as openSideBar} from "../../redux/slices/sideBarSlice";
import {selectChat} from "../../redux/slices/selectedChatSlice";
import {useEffect, useState} from "react";
import Messages from "../messages/messages";
import {randomJoke} from "../../chucknorisAPI";
import './chat.scss';
import user from '../../img/user.jpg';
import {getChatMessages} from "../../api/chat";
import {Send} from "@mui/icons-material";
import {sendWebSocketMessage} from "../../services/webSocketService";

const sendMessageFunc = (messageText, chatId) => {
    const newMessage = {
        content: messageText,
        chatId: chatId,
    }

    sendWebSocketMessage(JSON.stringify(newMessage));
}

const Chat = ({shouldRerenderMessages, handleRenderMessages}) => {
    const selectedChat = useSelector(state => state.selectedChat.chat);
   const isSideBarOpen = useSelector(state => state.sideBar.isOpen);
   const dispatch = useDispatch();

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

    console.log(selectedChat.id)
    if (selectedChat.id) {
        const {firstName, lastName, latestMessage} = selectedChat;

        return (
            <div className={className}>
                <div className={'user'}>
                    {generateButton()}
                    <div className={'user__img'}>
                        <img src={user} alt="Companion" className="img"/>
                        {/*{companionIsActive ? <CheckCircleOutlined className={'is-active'}/> : null}*/}
                    </div>
                    <p className="user__name">
                        {firstName + " " + (lastName ? lastName : "")}
                    </p>
                </div>
                <div className={"messages"}>
                    <Messages shouldRerenderMessages={shouldRerenderMessages}/>
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
            </div>
        )
    }
    return <div className={className}/>

}

export default Chat;