import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchedMemories } from "../../store/memories";
import { setMemoryContent } from "../../store/mainContent";
import './Search.css'

const Search = () => {
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('')
    const memories = useSelector(state => Object.values(state?.memories));

    const retrieveSearchedMemories = async (e) => {
        
        if (searchInput.length % 2 === 0) {
            setSearchInput(e.target.value)
        } else {
            setSearchInput(e.target.value)
            await dispatch(setSearchedMemories(searchInput));
        }

    }
    return (
        <div className='search-grid'>
            <div className='search-container'>
                <input
                type="text"
                placeholder="Search by titles, locations, or text!"
                value={searchInput}
                onChange={retrieveSearchedMemories}
                className="search-component-input"
                />
                <div>{searchInput}</div>
            </div>
            <div className='searched-memories-container'>
                {memories?.length ? (
                    memories.map((memory) => {
                        return (
                            <div onClick={() => dispatch(setMemoryContent(memory?.id))} className='searched-memories-link'>{memory?.title}</div>
                        )
                    })
                ) : null}
            </div>
        </div>
    )
}

export default Search;