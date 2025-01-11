import React, {useEffect, useState} from "react";
import {Search} from "../../img/search.svg";
import './searchBar.scss';
import {setSearchTerm} from "../../redux/slices/searchTermSlice";
import {fetchChats} from "../../redux/slices/chatsSlice";
import {useDispatch} from "react-redux";

const SearchBar = () => {
    const [term, setTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(term);
        }, 500);

        return () => clearTimeout(handler);
    }, [term]);

    useEffect(() => {
        dispatch(fetchChats({token: localStorage.getItem('token'), searchTerm: term}));
    }, [debouncedTerm])
    const onSearchChange = (event) => {
        setTerm(event.target.value);
    }

    return (
        <div className={'search-bar'}>
            <input className={'search-bar__input'}
                   type={"text"}
                   placeholder={'Search or start new chat'}
                   value={term}
                   onChange={event => onSearchChange(event)}
            />
        </div>
    )
}

// export default connect(mapStateToProps, {searchChat})(SearchBar);
export default SearchBar;