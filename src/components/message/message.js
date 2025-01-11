import React from "react";
import user from '../../img/user.jpg';
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

const Message = ({message}) => {
    console.log(message)
    const dateTime = transformDateTime(message.date);
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
        </div>
    )
};

export default Message;