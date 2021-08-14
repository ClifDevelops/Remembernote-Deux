import { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom";
import MemoryCard from '../MemoryCard';
import MemoryList from '../MemoryList';
import Tags from '../Tags';
import { setMemories, setTaggedMemories, logoutMemories } from "../../store/memories";
import { setTags, logoutTags } from '../../store/tags';
import { logoutSession } from '../../store/session';
import './Homepage.css';

const Homepage = () => {
  const sessionUser = useSelector((state) => state?.session.user);
  const userId = sessionUser?.id
  const dispatch = useDispatch();
  const [form, setForm] = useState(false)
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

  const memoryForm = () => {
    setForm(!form)
  }

    
  return (
    <div className="homepage-container">
      <div className='homepage-sidebar'>
        <div className='homepage-greeting'> Hello {sessionUser.username}! </div>
        <div><button className="homepage-button" onClick={() => memoryForm()}>Record a memory</button></div>
        <input
        className='memories-search-input'
        type="text"
        placeholder="Filter by title or year"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        />
        <Tags />
        <div className='logout-button-container'><button className='logout-button' onClick={()=>onLogout()}>Logout</button></div>
      </div>

      <MemoryList searchTerm={searchTerm} />
    </div>
  );
}
    
export default Homepage;