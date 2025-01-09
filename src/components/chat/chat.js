import {useDispatch, useSelector} from "react-redux";
import {open as openSideBar} from "../../redux/slices/sideBarSlice";
import {selectChat} from "../../redux/slices/selectedChatSlice";
import {useState} from "react";
import Messages from "../messages/messages";
import {addMessage} from "../../redux/slices/messagesSlice";
import {randomJoke} from "../../chucknorisAPI";
import './chat.scss';

const transformDate = (date) => {
    const howToWriteNumber = (number) => {
        return number < 10 ? `0${number}` : number
    }
    return howToWriteNumber(date.getMonth() + 1)
        + '/'
        + howToWriteNumber(date.getDate())
        + '/'
        + howToWriteNumber(date.getFullYear())
        + ' '
        + howToWriteNumber(date.getHours())
        + ':'
        + howToWriteNumber(date.getMinutes())
        + ':'
        + howToWriteNumber(date.getSeconds())
}

const sendMessageFunc = (sendNewMessage, messageText, chatId, isMyMessage, isNewMessage, soundPlayed) => {
    const date = new Date();
    const formattedDate = transformDate(date);
    const newMessage = {
        text: messageText,
        sendDatetime: formattedDate,
        isMyMessage: isMyMessage,
        isNewMessage: isNewMessage,
        hadSoundPlayed: soundPlayed
    }

    let chats = JSON.parse(window.sessionStorage.getItem('chatList'));
    for (let i = 0; i < chats.length; i++) {
        if (chats[i].chatId === chatId) {
            chats[i].latestMessage = {
                text: messageText,
                date: formattedDate,
                isNewMessage: isNewMessage,
                hadSoundPlayed: soundPlayed
            }
        }
    }
    window.sessionStorage.setItem('chatList', JSON.stringify(chats));
    window.sessionStorage.setItem(chatId, JSON.stringify([...JSON.parse(window.sessionStorage.getItem(chatId)), newMessage]))
    sendNewMessage();
}

const Chat = () => {
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
            sendMessageFunc(dispatch(addMessage), messageText, selectedChat.chatId, true, false, true);
            setMessageText('')
        }

        setTimeout(() => randomJoke().then(res => {
            if (res.value) {
                sendMessageFunc(dispatch(addMessage), res.value, selectedChat.chatId, false, true, false)
            }


        }), Math.random() * 5000 + 10000)
    }

    console.log(selectedChat.chatId)
    if (selectedChat.chatId ) {
        const {companionName, companionImage, companionIsActive} = selectedChat;

        return (
            <div className={className}>
                <div className={'user'}>
                    {generateButton()}
                    <div className={'user__img'}>
                        <img src={companionImage} alt="Companion" className="img"/>
                        {/*{companionIsActive ? <CheckCircleOutlined className={'is-active'}/> : null}*/}
                    </div>
                    <p className="user__name">
                        {companionName}
                    </p>
                </div>
                <div className={"messages"}>
                    <Messages/>
                </div>
                <div className="write-field">
                    <form onSubmit={(e) => onMessageSend(e)}>
                        <input placeholder={'Type your message'}
                               value={messageText}
                               onChange={event => onMessageChange(event)}
                        />
                        {/*<Send className={'send'} onClick={(e) => onMessageSend(e)}/>*/}
                    </form>

                </div>
            </div>
        )
    }
    return <div className={className}/>

}

export default Chat;