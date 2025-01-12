import message from "../message/message";
import Dialog from "../dialog/dialog";
import {useDispatch} from "react-redux";
import {useState} from "react";
import './chatForm.scss';

const ChatForm = ({isFormOpen, title, handleSubmit, firstName = "", lastName = "", closeDialogue}) => {
    const dispatch = useDispatch();
    const [firstNameValue, setFirstNameValue] = useState(firstName);
    const [lastNameValue, setLastNameValue] = useState(lastName);

    const handleFirstNameChange = (e) => setFirstNameValue(e.target.value);
    const handleLastNameChange = (e) => setLastNameValue(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit({ firstName: firstNameValue, lastName: lastNameValue });
        dispatch(closeDialogue());
    };

    return (
        <Dialog isOpen={isFormOpen} onClose={() => dispatch(closeDialogue())}>
            <h2 className={'form__title'}>{title}</h2>
            <form onSubmit={onSubmit} className={'form'}>
                <div style={{marginBottom: "15px"}} className={'form__field'}>
                    <label htmlFor="firstName" style={{display: "block"}} className={'form__field--label'}>First name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        style={{width: "100%", padding: "8px"}}
                        value={firstNameValue}
                        onChange={handleFirstNameChange}
                        className={'form__field--input'}
                    />
                </div>
                <div style={{marginBottom: "15px"}} className={'form__field'}>
                    <label htmlFor="lastName" style={{display: "block"}} className={'form__field--label'}>Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        style={{width: "100%", padding: "8px"}}
                        value={lastNameValue}
                        required
                        onChange={handleLastNameChange}
                        className={'form__field--input'}
                    />
                </div>
                <div className={'form__buttons'}>
                    <button type="submit" style={{marginRight: "10px"}} className={'form__btn form__btn--submit'}>Submit</button>
                    <button type="button" onClick={() => dispatch(closeDialogue())} className={'form__btn form__btn--cancel'}>Cancel</button>
                </div>
            </form>
        </Dialog>
    )
}

export default ChatForm;