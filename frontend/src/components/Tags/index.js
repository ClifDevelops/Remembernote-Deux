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
  
    
   
    const tags = useSelector(state => Object.values(state?.tags))
    
    const tagIsClicked = async (tagId) => {
        await dispatch(setTaggedMemories(tagId));
        dispatch(setMemoryCards())
    }
    return(
        <div className='homepage-tags-container'>
            {tags?.length ? (
            tags.map((tag) => {
            return (
                <button className='homepage-tag-button' key={tag?.id} onClick={()=> tagIsClicked(tag?.id)}>{tag?.tagName}</button>
            
            )
            })) : (
                <div className='tag-message'> There are no tagged memories</div>
            )}
        </div>
    )
}

export default Tags;