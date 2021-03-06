import { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { Redirect} from "react-router-dom";
import MemoryList from '../MemoryList';
import Tags from '../Tags';
import MemoryForm from '../MemoryForm'
import MemoryDisplay from '../MemoryDisplay';
import Search from '../Search';
import { setMemories, logoutMemories } from "../../store/memories";
import { setTags, logoutTags } from '../../store/tags';
import { setTextEditor, setMemoryCards, setSearchComponent} from '../../store/mainContent'
import { logoutSession } from '../../store/session';
import './Homepage.css';

const Homepage = () => {
  const sessionUser = useSelector((state) => state?.session.user);
  const userId = sessionUser?.id
  const dispatch = useDispatch();
  const [tagsDisplay, setTagsDisplay] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    dispatch(setMemories())
    dispatch(setTags(userId))
    dispatch(setMemoryCards())
  }, [dispatch, userId])
  
  const mainContent = useSelector((state) => state?.mainContent?.setting)
  const memoryId = useSelector((state) => state?.mainContent?.memoryId)
  
  
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
    setTagsDisplay(false)
  }

  const showAllMemories = () => {
    dispatch(setMemories())
    dispatch(setMemoryCards())
    setTagsDisplay(false)
  }

  const displaySearch = () => {
    dispatch(setSearchComponent())
    setTagsDisplay(false)
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
          <div><button className="homepage-button" onClick={showAllMemories}>Show all memories</button></div>
          <div><button className="homepage-button" onClick={memoryForm}>Record a memory</button></div>
          <div><button className='homepage-button' onClick={displaySearch} >Search your memories</button></div>
          <div><button className='homepage-button' onClick={toggleTags} >Display tags</button></div>
        </div>
        <div className='logout-button-container'>
          <button className='logout-button' onClick={()=>onLogout()}>Logout</button>
        </div>
        <div className='homepage-about-container'>
          <div className='about-text'>Created By:</div>
          <div className='about-name'>Robert Burroughs</div>
          <div><a className='about-link' href='https://www.linkedin.com/in/robert-burroughs-436300b7/'>LinkedIn</a></div>
          <div><a className='about-link' href='https://github.com/ClifDevelops/'>Github</a></div>
        </div>
      </div>


      
      {
      tagsDisplay ? (
        <Tags toggleTags={toggleTags} />
      ) : null
      }


      {
      mainContent === 'cards' || mainContent === undefined ? (
        <MemoryList searchTerm={searchTerm} />
      ) : 
      mainContent === 'editor' ? (
        <MemoryForm />
      ) : 
      mainContent === 'search' ? (
        <Search />
      ) :
      mainContent === 'content' && memoryId !== 0 ? (
        <MemoryDisplay memoryId={memoryId} setTagsDisplay={setTagsDisplay}/>
      ) : null
      }
      
    </div>
  );
}
    
export default Homepage;