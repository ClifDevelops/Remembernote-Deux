import React from "react";

import { NavLink} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import "./MemoryCard.css";

function MemoryCard({memory}) {
    if (!memory) return null;

    return (
        <div className="single-memory-container">
        <NavLink to={`/memories/${memory?.id}`} className="memory-box-link">
            <div >{memory?.title}</div>
        </NavLink>
            <div className='memory-box-details'>
                <div className='memory-box-date'>{memory?.dateOfMemory}</div>
                {/* <div className='memory-box-rating'>Rating: {memory?.memoryRating}</div>
                <div className='memory-box-body'>{ReactHtmlParser(memory?.body)}</div> */}
            </div>
        </div>

    )


}

export default MemoryCard;