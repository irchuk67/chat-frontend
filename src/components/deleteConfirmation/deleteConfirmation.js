import Dialog from "../dialog/dialog";
import {useDispatch, useSelector} from "react-redux";
import {closeForm} from "../../redux/slices/deleteSlice";
import {deleteChat} from "../../api/chat";
import {fetchChats} from "../../redux/slices/chatsSlice";
import {selectChat} from "../../redux/slices/selectedChatSlice";

const DeleteConfirmation = () => {
    const isOpen = useSelector(state => state.deleteChat);
    const dispatch = useDispatch();
    const selectedChat = useSelector(state => state.selectedChat.chat);
    const searchTerm = useSelector(state => state.searchTerm);
    const handleSubmit = () => {
        deleteChat(selectedChat.id, localStorage.getItem('token'));
        dispatch(closeForm());
        dispatch(fetchChats({token: localStorage.getItem('token'), searchTerm}))
        dispatch(selectChat({}));
    }
    return (
        <Dialog isOpen={isOpen} onClose={closeForm}>
            <h2>Are you sure, you want to delete this chat?</h2>
            <div className={'form__buttons'}>
                <button type="button"
                        style={{marginRight: "10px"}}
                        className={'form__btn form__btn--submit'}
                        onClick={() => handleSubmit()}>
                    Yes
                </button>
                <button type="button" onClick={() => dispatch(closeForm())}
                        className={'form__btn form__btn--cancel'}>
                    No
                </button>
            </div>
        </Dialog>
    )
}

export default DeleteConfirmation;