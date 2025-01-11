import ChatItem from "../chat-item/chatItem";
import {useDispatch, useSelector} from "react-redux";
import {close as closeSideBar} from "../../redux/slices/sideBarSlice";
import {selectChat} from "../../redux/slices/selectedChatSlice";
import './chatList.scss';
import {useEffect} from "react";
import {fetchChats} from "../../redux/slices/chatsSlice";
import Loading from "../loading/loading";
import ErrorMessage from "../errorMessage/errorMessage";

const ChatList = (props) => {
    const {loading, error, data} = useSelector((state) => state.chats);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchChats(localStorage.getItem('token')));
    }, []);

    const openChat = (chat) => {
        dispatch(selectChat(chat));
        dispatch(closeSideBar())
    }

    const chats = data?.map((chat) => {
        console.log(chat);
        return <ChatItem key={chat.id} chat={chat} onSelect={() => openChat(chat)} selectedChat/>
    })

    return(
        <div className={'chats'}>
            {loading && !error && !data && <Loading/>}
            {
                !loading && error && <ErrorMessage/>
            }
            {
                <>
                    <h5>Chats</h5>
                    {chats}
                </>
            }
        </div>
    )
}

export default ChatList;