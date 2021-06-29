import { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { useParams, Route, Redirect, NavLink } from "react-router-dom";
import { setMemories } from "../../store/memories";
import './Homepage.css';

const Homepage = ({isLoaded}) => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    
    useEffect(() => {
      if (!sessionUser) return <Redirect to="/" />; 
      dispatch(setMemories())
    })
    
    
        return (
          <div className="homepage-container">
           <div> Hello {sessionUser.username}! Go ahead and <NavLink to='memoryForm'>write down another memory!</NavLink></div>
          </div>
        );
    }
    
    export default Homepage;