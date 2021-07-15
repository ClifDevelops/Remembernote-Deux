import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import "./MemoryDisplay.css"




const MemoryDisplay = () => {
    const {memoryId} = useParams();
    const memory = useSelector(state => state?.memories[memoryId]);
    const dispatch = useDispatch();
    const history= useHistory();
    const [tagFormToggle, setTagFormToggle] = useState(false)
    const [tags, setTags] = useState([])
    const headHome = () => {
      history.push("/homepage");
    };
     
    const toggleForm = () => {
      if (tagFormToggle === false) {
        setTagFormToggle(true)
      } else {
        setTagFormToggle(false)
      }
      console.log(tagFormToggle)
    }

    if(!memory) history.push("/homepage")

    return (
      <div className="memory-display">
        <div className='memory-display-navigation'>
          <button className="memory-display-button" onClick={headHome}>
            Head Back Home
          </button>
          <NavLink className='memory-edit-link' to={`/memories/${memoryId}/edit/`}>Edit this memory</NavLink>
          <button className='memory-display-button' onClick={toggleForm}>Tag your memory</button>
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