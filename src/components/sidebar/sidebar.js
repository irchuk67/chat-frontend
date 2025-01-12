import SearchBar from "../search-bar/searchBar";
import Account from "../account/account";
import ChatList from "../chat-list/chatList";
import {useRef} from "react";
import {useSelector} from "react-redux";
import Toggle from "../toggle/toggle";
import './sidebar.scss';
import {manageRandomMessagesSending} from "../../api/chat";

const Sidebar = ({shouldRerenderMessages}) => {
    const handleClick = (isOn) => {
        manageRandomMessagesSending(isOn, localStorage.getItem("token"));
    }
    return (
        <div className="sidebar">
            <Account />
            <Toggle label={"Random messages"} handleClick={handleClick} />
            <SearchBar/>
            <ChatList shouldRerenderMessages={shouldRerenderMessages}/>
        </div>
    )
}

export default Sidebar