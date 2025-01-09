import ChatItem from "../chat-item/chatItem";
import {useDispatch, useSelector} from "react-redux";
import {close as closeSideBar} from "../../redux/slices/sideBarSlice";
import {selectChat} from "../../redux/slices/selectedChatSlice";
import './chatList.scss';

const ChatList = (props) => {
    const chatsList = useSelector((state) => state.chats.chats);
    const dispatch = useDispatch();

    const openChat = (chat) => {
        dispatch(selectChat(chat));
        dispatch(closeSideBar())
    }
    const chats = chatsList.map((chat) => {
        console.log(chat);
        return <ChatItem key={chat.chatId} chat={chat} onSelect={() => openChat(chat)} selectedChat/>
    })

    return(
        <div className={'chats'}>
            <h5>Chats</h5>
            {chats}
        </div>
    )
}

export default ChatList;