import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import {addTag, deleteTag, setMemory} from "../../store/memories"
import "./MemoryDisplay.css"




const MemoryDisplay = () => {
    const {memoryId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setMemory(memoryId))
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
      console.log(payload)
      await dispatch(deleteTag(payload))
      await dispatch(setMemory(memoryId))

    }

    if(!memory) history.push("/homepage")

    return (
      <div className="memory-display">
        <div className='memory-display-navigation'>
          <button className="memory-display-button" onClick={headHome}>
            Head Back Home
          </button>
          <NavLink className='memory-edit-link' to={`/memories/${memoryId}/edit/`}>Edit this memory</NavLink>
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
          <button className='memory-display-button' onClick={() =>toggleForm()}>Tag your memory</button>
          {tagFormToggle ? (
            <form onSubmit={handleTagSubmit} className="tag-form">
              <input type="text" placeholder='Tag here!' value={tag} onChange={(e) =>setTag(e.target.value)} className='tags-input'>
              </input>
              <button type="submit" className="tag-form-button">Commit your tag</button>
            </form>
          ) : (
            ""
          )}
        </div>
        <div className='memory-display-container'>
          <div className="memory-display-title">{memory?.title}</div>
          <div className="memory-display-date">{memory?.dateOfMemory}</div>
          <div className="memory-display-location">{memory?.location}</div>
          <div className="memory-display-rating">
            Memory Rating: {memory?.memoryRating}
          </div>
          <div className="memory-display-body">{ReactHtmlParser(memory?.body)}</div>
        </div>
      </div>
    );
}

export default MemoryDisplay;