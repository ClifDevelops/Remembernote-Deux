import { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';

import { setMemories, setTaggedMemories } from "../../store/memories";
import { setTags} from '../../store/tags';
import { setMemoryCards } from '../../store/mainContent';

import './Tags.css';

const Tags = ({toggleTags}) => {

    const sessionUser = useSelector((state) => state?.session.user);
    const userId = sessionUser?.id
    const dispatch = useDispatch();
    const [tagSearch, setTagSearchTerm] = useState("");
    
    useEffect(() => {
            // dispatch(setMemories())
            dispatch(setTags(userId))
        }, [dispatch, userId])
  
    
   
    const tags = useSelector(state => state?.tags)
    
    const tagIsClicked = async (tagId) => {
        await dispatch(setTaggedMemories(tagId));
        dispatch(setMemoryCards())
    }
    return(
        <div className='homepage-tags-container'>
            {/* <div><button onClick={toggleTags}>Hide tags</button></div> */}
            {/* <div>
                <button className='homepage-tag-button' onClick={()=> dispatch(setMemories())}>Show all memories</button>
            </div> */}
            {Object.values(tags)
            .map((tag) => {
            return (
                <button className='homepage-tag-button' key={tag?.id} onClick={()=> tagIsClicked(tag?.id)}>{tag?.tagName}</button>
            )
            })}
        </div>
    )
}

export default Tags;