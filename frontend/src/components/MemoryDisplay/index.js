import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import {addTag, deleteTag, setMemory, deleteMemory} from "../../store/memories";
import {setMemoryCards} from '../../store/mainContent'
import "./MemoryDisplay.css"




const MemoryDisplay = ({memoryId, setTagsDisplay}) => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setMemory(memoryId))
      // setTagsDisplay(false)
    }, [dispatch, memoryId])

    const memory = useSelector(state => state?.memories[memoryId]);
    const tags = useSelector(state => state?.memories[memoryId]?.Tags)
    const userId = useSelector((state) => state.session.user.id);

    
    const history= useHistory();
    const [tagFormToggle, setTagFormToggle] = useState(false)
    const [tag, setTag] = useState("")
   
    
    const headHome = () => {
      history.push("/homepage");
    };

    const editMemory = () => {
      history.push(`/memories/${memoryId}/edit/`);
    };
     
    const toggleForm = () => {
      if (tagFormToggle === false) {
        setTagFormToggle(true)
      } else {
        setTagFormToggle(false)
      }
      
    }

    const handleTagSubmit = async (e) => {
      e.preventDefault();
      const payload = {
        tag,
        memoryId,
        userId
      }
      
      const addedTag = await dispatch(addTag(payload))
      await dispatch(setMemory(memoryId))
      if (addedTag) {
        setTag("")
      }
    }

    const handleTagDelete = async (e, tagId) => {
      e.preventDefault();
      const payload = {
        tagId,
        memoryId
      }
      await dispatch(deleteTag(payload))
      await dispatch(setMemory(memoryId))
    }

    const handleMemoryDelete = async (e, memoryId) => {
      e.preventDefault();
      const payload = {
        memoryId
      }
      await dispatch(deleteMemory(payload))
      await dispatch(setMemoryCards())
    }

    if(!memory) history.push("/homepage")

    return (
      <div className="memory-display">
        <div className='memory-display-container'>
          <div className="memory-display-title">{memory?.title}</div>
          <div className='memory-details-container'>
            <div className="memory-detail">{memory?.dateOfMemory}</div>
            <div className="memory-detail">{memory?.location}</div>
            <div className="memory-detail">Memory Rating: {memory?.memoryRating}</div>
          </div>
          {memory?.pictureUrl ? (
            <img src={memory.pictureUrl} alt='memory' className='memory-display-image'/>

          ) : null}
          <div className="memory-display-body">{ReactHtmlParser(memory?.body)}</div>
        </div>
        <div className='memory-display-navigation'>
          <div className='memory-nav-button-container'>
          <button className="memory-display-button" onClick={editMemory}>
            Edit
          </button>
          <button className="memory-display-button red" onClick={(e)=>handleMemoryDelete(e, memoryId)}>
            Delete memory
          </button>
          <button className='memory-display-button' onClick={() =>toggleForm()}>
            Tag your memory
          </button>
        </div>
            {tagFormToggle ? (
              <form onSubmit={handleTagSubmit} className="tag-form">
                <input type="text" placeholder='Tag here!' value={tag} onChange={(e) =>setTag(e.target.value)} className='tags-input'>
                </input>
                <button type="submit" className="tag-form-button">Commit your tag</button>
              </form>
            ) : (
              ""
            )}
          <div className='tags-display'>
            <div className='tags-title'>Tags</div>
            {tags?.length ? (
                tags?.map((tag) => {
                  return (
                    <div key={tag?.id} className='individual-tag'>
                      <div className='tag-name'>{tag?.tagName}</div>
                      <button className='tag-delete-button' onClick={(e) => handleTagDelete(e, tag.id)}>Delete</button>
                    </div>
                  )
                })
              
            ) : (
              <div>Tag this memory if you want.</div>
            )
            }
          </div>
        </div>
      </div>
    );
}

export default MemoryDisplay;