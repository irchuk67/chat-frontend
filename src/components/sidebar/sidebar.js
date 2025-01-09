import SearchBar from "../search-bar/searchBar";
import Account from "../account/account";
import ChatList from "../chat-list/chatList";
import {useRef} from "react";
import {useSelector} from "react-redux";
import './sidebar.scss';

const Sidebar = () => {
    const isSidebarOpen = useSelector(state => state.sideBar.isOpen);
    return (
        <div className="sidebar">
            <Account />
            <SearchBar/>
            <ChatList />
        </div>
    )
}

export default Sidebar