import ChatForm from "../chatForm/chatForm";
import {useDispatch, useSelector} from "react-redux";
import {closeForm} from "../../redux/slices/addChatSlice";
import {addChat} from "../../api/chat";
import {fetchChats} from "../../redux/slices/chatsSlice";

const AddChat = () => {
    const isOpen = useSelector((state) => state.addChat.isOpen);
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.searchTerm);
    const onSubmit = (formData) => {
        addChat(localStorage.getItem("token"), formData.firstName, formData.lastName).then(() => dispatch(fetchChats({token: localStorage.getItem('token'), searchTerm})));
    }
    return (
        <ChatForm isFormOpen={isOpen}
                  handleSubmit={onSubmit}
                  title="Add Chat"
                  closeDialogue={closeForm}
        />
    )
}

export default AddChat