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
    
    useEffect(() => {
      dispatch(setMemories())
    }, [dispatch])
    
    if (!sessionUser){
      return <Redirect to="/" />;
    } 
    
        return (
          <div className="homepage-container">
            <div className='homepage-sidebar'>
              <div className='homepage-greeting'> Hello {sessionUser.username}! Go ahead and <NavLink to='memoryForm'>record another memory!</NavLink></div>
            </div>
            <div className="memory-list-container">
              {Object.values(memories).map((memory) => {
                return (
                  <MemoryCard memory={memory} />
                );
              })}
            </div>
          </div>
        );
}
    
    export default Homepage;