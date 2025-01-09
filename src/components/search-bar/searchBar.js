import React, {useEffect, useState} from "react";
import {Search} from "../../img/search.svg";
import './searchBar.scss';

const SearchBar = (props) => {
    const [term, setTerm] = useState('');

    useEffect(() => {
        // props.searchChat(term)
    }, [term])

    const onSearchChange = (event) => {
        setTerm(event.target.value);
    }


    return (
        <div className={'search-bar'}>
            <input className={'search-bar__input'}
                   type={"text"}
                   placeholder={'Search or start new chat'}
                   value={term}
                   onChange={event => onSearchChange(event)}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        searchTerm: state.searchTerm
    }
}

// export default connect(mapStateToProps, {searchChat})(SearchBar);
export default SearchBar;