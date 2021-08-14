import { useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';

import { setMemories, setTaggedMemories } from "../../store/memories";
import { setTags} from '../../store/tags';

import './Tags.css';

const Tags = () => {

    const sessionUser = useSelector((state) => state?.session.user);
    const userId = sessionUser?.id
    const dispatch = useDispatch();
    
    useEffect(() => {
            dispatch(setMemories())
            dispatch(setTags(userId))
        }, [dispatch, userId])
  
      
   
    const tags = useSelector(state => state?.tags)

    return(
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
    )
}

export default Tags;