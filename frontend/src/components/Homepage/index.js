import { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom";
import MemoryList from '../MemoryList';
import Tags from '../Tags';
import MemoryForm from '../MemoryForm'
import { setMemories, logoutMemories } from "../../store/memories";
import { setTags, logoutTags } from '../../store/tags';
import { setTextEditor, setMemoryCards, setMemoryContent} from '../../store/mainContent'
import { logoutSession } from '../../store/session';
import './Homepage.css';

const Homepage = () => {
  const sessionUser = useSelector((state) => state?.session.user);
  const userId = sessionUser?.id
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const [tagsDisplay, setTagsDisplay] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    dispatch(setMemories())
    dispatch(setTags(userId))
    dispatch(setMemoryCards())
  }, [dispatch, userId])
  const mainContent = useSelector((state) => state?.mainContent[0])
  console.log('here is the main shit', mainContent)
  
  if (!sessionUser){
    return <Redirect to="/" />;
  } 
      
  const onLogout = async () => {
    await dispatch(logoutMemories());
    await dispatch(logoutTags());
    await dispatch(logoutSession());
  }

  const toggleTags = () => {
    setTagsDisplay(!tagsDisplay)
  }

  const memoryForm = () => {
    dispatch(setTextEditor())
    // setForm(!form)
  }

    
  return (
    <div className="homepage-container">
      <div className='homepage-sidebar'>
        <div className='homepage-greeting'> Hello {sessionUser.username}! </div>
        <input
        className='memories-search-input'
        type="text"
        placeholder="Filter by title or year"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        />
        <div className="homepage-button-container">
          <button className="homepage-button" onClick={() => dispatch(setMemoryCards())}>Show all memories</button>
          <button className="homepage-button" onClick={() => memoryForm()}>Record a memory</button>
          <button onClick={toggleTags} className='homepage-button'>Display tags</button>
        
        </div>
        <div className='logout-button-container'>
          <button className='logout-button' onClick={()=>onLogout()}>Logout</button>
        </div>
      </div>
      {tagsDisplay ? (
        <Tags toggleTags={toggleTags} />
      ) : null}


      {mainContent === 'cards' || mainContent === undefined ? (
      <MemoryList searchTerm={searchTerm} />
      ) : 
      mainContent === 'editor' ?(
        <MemoryForm />
      ) : null}
      
    </div>
  );
}
    
export default Homepage;