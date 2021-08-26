import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "./Splash.css";
import Logo from '../../images/black-logo.png'
import * as sessionActions from '../../store/session';

const Splash = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // eslint-disable-next-line
    const [credential, setCredential] = useState('Demomemories');
    // eslint-disable-next-line
    const [password, setPassword] = useState('password');
    
    const demoLogin = async () => {
        await dispatch(sessionActions.login({credential, password}))
        if (sessionUser) return (<Redirect to="/homepage" />);
    }

    if (sessionUser) return (
        <Redirect to="/homepage" />
      );
    
    return (
        <div className='splash-container'>
            <img src='https://i.pinimg.com/originals/d6/5e/7e/d65e7e7abf4055a03be418c63485d969.jpg' alt='background' className='splash-background-image' />
            <div>
                <img className='splash-logo' src={Logo} alt='logo'/>
            </div>
            <div className='splash-text'> Remembernote is a site designed to help you record your life one memory at a time! Tag and date your memories, add pictures if you please, and ultimately have an easily searchable, private journal of your life!</div>
            <div className='splash-links-container'>
                <div><NavLink className='splash-links' to='/login'>Login</NavLink></div>
                <div><NavLink className='splash-links' to='/signup'>Signup</NavLink></div>
                <div><button className='demo-login-button' onClick={demoLogin}>Demo Login</button></div>
            </div>
            
            
           
            <div className='splash-banner-1'></div>

        </div>
    )
}

export default Splash;