import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import "./MemoryCard.css";

function MemoryCard({memory}) {
    if (!memory) return null;

    return (
        <div className="single-memory-container">
        <NavLink to={`/memories/${memory?.id}`} className="memory-box-link">
            <h2 className="memory-title">{memory?.title}</h2>
        </NavLink>
            <div>{memory?.dateOfMemory}</div>
            <div>{memory?.memoryRating}</div>
            <div>{ReactHtmlParser(memory?.body)}</div>
        </div>

    )


}

export default MemoryCard;