import React from "react";
import {  useDispatch  } from 'react-redux';

import { setMemoryContent } from "../../store/mainContent";
import "./MemoryCard.css";

function MemoryCard({memory}) {
    const dispatch = useDispatch();
    if (!memory) return null;

    return (
        <div className="single-memory-container">
            <div onClick={() => dispatch(setMemoryContent(memory?.id))} className='memory-box-title'>{memory?.title}</div>
            <div className='memory-box-date'>{memory?.dateOfMemory}</div>
            {memory?.pictureUrl ? (
                <img src={memory.pictureUrl} alt='memory' className='memory-box-picture' />
            ): null}
        </div>

    )


}

export default MemoryCard;