import ChatItem from "../chat-item/chatItem";
import {useDispatch, useSelector} from "react-redux";
import {close as closeSideBar} from "../../redux/slices/sideBarSlice";
import {selectChat} from "../../redux/slices/selectedChatSlice";
import './chatList.scss';
import {useEffect} from "react";
import {fetchChats} from "../../redux/slices/chatsSlice";
import Loading from "../loading/loading";
import ErrorMessage from "../errorMessage/errorMessage";
import {openForm} from "../../redux/slices/addChatSlice";
import AddChat from "../addChat/addChat";

const ChatList = ({shouldRerenderMessages}) => {
    const {loading, error, data} = useSelector((state) => state.chats);
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.searchTerm.term);
    const isFormOpen = useSelector(state => state.addChat.isOpen);
    useEffect(() => {
        dispatch(fetchChats({token: localStorage.getItem('token'), searchTerm}));
    }, []);

    useEffect(() => {
        dispatch(fetchChats({token: localStorage.getItem('token'), searchTerm}));
    }, [shouldRerenderMessages]);

    const openChat = (chat) => {
        dispatch(selectChat(chat));
        dispatch(closeSideBar())
    }


    const chats = data?.map((chat) => {
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
                    <div className={'chats__heading'}>
                        <h5>Chats</h5>
                        <button className={"chats__add-btn"} onClick={() => dispatch(openForm())}>
                            +
                        </button>
                    </div>
                    {chats}
                    {isFormOpen && <AddChat/>}
                </>
            }
        </div>
    )
}

export default ChatList;