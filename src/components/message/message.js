import React from "react";
import user from '../../img/user.jpg';
import deleteIcon from "../../img/delete.svg";
import {useSelector} from "react-redux";
import {deleteChatMessage, updateChatMessage} from "../../api/chat";
import editIcon from "../../img/pencil.svg";
import './message.scss';

const transformDateTime = (dateTime) => {
    const date = new Date(dateTime);

    const options = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

const Message = ({message, handleRenderMessages, canEdit=false, setMessageText, setMessageId, setUpdate}) => {
    const dateTime = transformDateTime(message.date);
    const selectedChat = useSelector(state => state.selectedChat.chat);
    const handleDelete = (messageId) => {
        deleteChatMessage(selectedChat.id, messageId, localStorage.getItem("token"))
            .then(res => handleRenderMessages());
    }

    const handleUpdateChange = (messageId, messageContent) => {
        setUpdate(true);
        setMessageId(messageId);
        setMessageText(messageContent);
    }

    return(
        <div className={`message`}>
            {(message.messageType === "RECEIVED") ? <img src={user} className={'img'} alt={'Companion Image'}/> : null}
            <div className="message__content">
                <div className={'message__notification'}>
                    <p className="message__text">
                    {message.content}
                </p>

                </div>
                <p className={'message__date'}>
                    {dateTime}
                </p>
            </div>
            <div className={"message__change"}>
                <img src={deleteIcon}
                     alt={"delete"}
                     onClick={
                         () => handleDelete(message._id)
                     }
                />
                {
                    canEdit &&
                    <img src={editIcon}
                         alt={"edit"}
                         onClick={
                             () => handleUpdateChange(message._id, message.content)
                         }
                    />
                }
            </div>
        </div>
    )
};

export default Message;