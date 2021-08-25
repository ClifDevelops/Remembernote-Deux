import { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom";
import MemoryCard from '../MemoryCard';
import { setMemories, setTaggedMemories, logoutMemories } from "../../store/memories";
import { setTags, logoutTags } from '../../store/tags';
import { logoutSession } from '../../store/session';
import './MemoryList.css';

const MemoryList = (props) => {
    const sessionUser = useSelector((state) => state?.session.user);
    const userId = sessionUser?.id
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setMemories())
      }, [dispatch])
    const memories = useSelector(state => Object.values(state?.memories));


    return (
        <div className="memory-list-container">
          {memories?.length ? (
          memories.filter((memory) => {
          if (props.searchTerm === "") {
            return memory;
          } else if (
            memory?.title
              .toLowerCase()
              .includes(props.searchTerm.toLowerCase()) ||
              memory?.dateOfMemory
              .toLowerCase()
              .includes(props.searchTerm.toLowerCase())
            
          ) {
            return memory;
          }
        }).map((memory) => {
            return (
              <MemoryCard key={memory.id} memory={memory} />
            );
          })) : (
            <div className='memory-list-message'>Click 'Record a memory' on the left to start your Remembernote journey!</div>
          )}
      </div>
    )
}

export default MemoryList;