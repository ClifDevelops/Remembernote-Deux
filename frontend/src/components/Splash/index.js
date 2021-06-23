import React from "react";
import { NavLink } from "react-router-dom";
import "./Splash.css";
import Logo from '../../images/remembernote-logo.png'

const Splash = () => {

    return (
        <div className='splash-container'>
            <div>
                <img className='splash-logo' src={Logo} alt='logo'/>
            </div>
            <div className='splash-text'> Remembernote is a site designed to help you record your life one memory at a time! Tag and date your memories, add pictures if you please, and ultimately have an easily searchable, private journal of your life!</div>
            <div className='splash-links-container'>
                <NavLink className='splash-links' to='/login'>Login Here</NavLink>
                <NavLink className='splash-links' to='/signup'>Signup Here</NavLink>
            </div>
            
            
           
            <div className='splash-banner-1'></div>

        </div>
    )
}

export default Splash;