import ChatForm from "../chatForm/chatForm";
import {useDispatch, useSelector} from "react-redux";
import {closeForm} from "../../redux/slices/updateChatSlice";
import {addChat, updateChat} from "../../api/chat";
import {fetchChats} from "../../redux/slices/chatsSlice";
import {selectChat} from "../../redux/slices/selectedChatSlice";

const UpdateChat = () => {
    const isOpen = useSelector((state) => state.updateChat.isOpen);
    const {firstName, lastName, id} = useSelector(state => state.selectedChat.chat);
    const searchTerm = useSelector((state) => state.searchTerm);
    const dispatch = useDispatch();
    const chats = useSelector(state => state.chats);

    const onSubmit = (formData) => {
        updateChat(id, localStorage.getItem("token"), formData.firstName, formData.lastName)
            .then(() => {
                dispatch(fetchChats({token: localStorage.getItem('token'), searchTerm}))
                dispatch(selectChat(chats.data.filter(chat => chat.id === id)));
            });
    }

    return <ChatForm isFormOpen={isOpen}
                     firstName={firstName}
                     lastName={lastName}
                     handleSubmit={onSubmit}
                     title={"Update Chat"}
                     closeDialogue={closeForm}
    />
}

export default UpdateChat;