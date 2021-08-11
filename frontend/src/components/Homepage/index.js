import { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom";
import MemoryCard from '../MemoryCard';
import { setMemories, setTaggedMemories, logoutMemories } from "../../store/memories";
import { setTags, logoutTags } from '../../store/tags';
import { logoutSession } from '../../store/session';
import './Homepage.css';

const Homepage = () => {
  const sessionUser = useSelector((state) => state?.session.user);
  const userId = sessionUser?.id
  const dispatch = useDispatch();
  useEffect(() => {
        dispatch(setMemories())
        dispatch(setTags(userId))
      }, [dispatch, userId])
  
      
      const memories = useSelector(state => state?.memories);
      const tags = useSelector(state => state?.tags)
      
      const [searchTerm, setSearchTerm] = useState("");
      if (!sessionUser){
        return <Redirect to="/" />;
      } 
      
      const onLogout = async () => {
        await dispatch(logoutMemories());
        await dispatch(logoutTags());
        await dispatch(logoutSession());
      }

    
  return (
    <div className="homepage-container">
      <div className='homepage-sidebar'>
        <div className='homepage-greeting'> Hello {sessionUser.username}! 
        Go ahead and <NavLink className='greeting-link' to='memoryForm'>record another memory!</NavLink>
        </div>
        <input
        className='memories-search-input'
        type="text"
        placeholder="Filter by title or year"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        />
        <div className='homepage-tags-container'>
        <div>
          <button className='homepage-tag-button' onClick={()=> dispatch(setMemories())}>Show all memories</button>
        </div>
        {Object.values(tags)
        .map((tag) => {
          return (
            <button className='homepage-tag-button' key={tag?.id} onClick={()=> dispatch(setTaggedMemories(tag?.id))}>{tag?.tagName}</button>
          )
        })}
        </div>
        <div className='logout-button-container'><button className='logout-button' onClick={()=>onLogout()}>Logout</button></div>
      </div>

      <div className="memory-list-container">
        {Object.values(memories)
        .filter((memory) => {
        if (searchTerm === "") {
          return memory;
        } else if (
          memory?.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            memory?.dateOfMemory
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
          
        ) {
          return memory;
        }
      }).map((memory) => {
          return (
            <MemoryCard key={memory.id} memory={memory} />
          );
        })}
      </div>
    </div>
  );
}
    
export default Homepage;