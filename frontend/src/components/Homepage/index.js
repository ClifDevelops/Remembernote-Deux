import { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { useParams, Route, Redirect, NavLink } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import { setMemories } from "../../store/memories";
import './Homepage.css';

const Homepage = ({isLoaded}) => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const memories = useSelector(state => state?.memories);
    
     
    
    useEffect(() => {
      dispatch(setMemories())
      console.log(memories)
    }, [dispatch])
    
    if (!sessionUser){
      return <Redirect to="/" />;
    } 
    
        return (
          <div className="homepage-container">
            <div className='homepage-greeting'> Hello {sessionUser.username}! Go ahead and <NavLink to='memoryForm'>write down another memory!</NavLink></div>

            <div className="memory-list-container">
              {Object.values(memories).map((memory) => {
                return (
                  <div className="single-memory-container">
                    <h2 className="memory-title">{memory?.title}</h2>
                    <div>{memory?.dateOfMemory}</div>
                    <div>{memory?.memoryRating}</div>
                    <div>{ReactHtmlParser(memory?.body)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
}
    
    export default Homepage;