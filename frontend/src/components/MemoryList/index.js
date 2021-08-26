import {  useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import MemoryCard from '../MemoryCard';
import { setMemories} from "../../store/memories";
import './MemoryList.css';

const MemoryList = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setMemories())
      }, [dispatch])
    const memories = useSelector(state => Object.values(state?.memories));


    return (
        <div className="memory-list-container">
          <img src='https://i.pinimg.com/originals/d6/5e/7e/d65e7e7abf4055a03be418c63485d969.jpg' alt='background' className='memory-list-background-image' />
          {memories?.length ? (
            // eslint-disable-next-line
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