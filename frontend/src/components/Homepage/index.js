import { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { useParams, Route, Redirect, NavLink } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import MemoryCard from '../MemoryCard';
import { setMemories } from "../../store/memories";
import './Homepage.css';

const Homepage = ({isLoaded}) => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const memories = useSelector(state => state?.memories);
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
      dispatch(setMemories())
    }, [dispatch])
    
    if (!sessionUser){
      return <Redirect to="/" />;
    } 
    
        return (
          <div className="homepage-container">
            <div className='homepage-sidebar'>
              <div className='homepage-greeting'> Hello {sessionUser.username}! 
              Go ahead and <NavLink className='greeting-link' to='memoryForm'>record another memory!</NavLink></div>
              <input
            className='memories-search-input'
            type="text"
            placeholder="Search your memories"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
            </div>

            <div className="memory-list-container">
              {Object.values(memories)
              .filter((memory) => {
              if (searchTerm === "") {
                return memory;
              } else if (
                memory?.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) 
              ) {
                return memory;
              }
            }).map((memory) => {
                return (
                  <MemoryCard memory={memory} />
                );
              })}
            </div>
          </div>
        );
}
    
    export default Homepage;