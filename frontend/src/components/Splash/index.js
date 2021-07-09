import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "./Splash.css";
import Logo from '../../images/remembernote-logo.png'
import * as sessionActions from '../../store/session';

const Splash = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('Demomemories');
    const [password, setPassword] = useState('password');
    const [errors, setErrors] = useState([]);
    
    const demoLogin = async () => {
        await dispatch(sessionActions.login({credential, password}))
        if (sessionUser) return (<Redirect to="/homepage" />);
    }

    if (sessionUser) return (
        <Redirect to="/homepage" />
      );
    
    return (
        <div className='splash-container'>
            <div>
                <img className='splash-logo' src={Logo} alt='logo'/>
            </div>
            <div className='splash-text'> Remembernote is a site designed to help you record your life one memory at a time! Tag and date your memories, add pictures if you please, and ultimately have an easily searchable, private journal of your life!</div>
            <div className='splash-links-container'>
                <NavLink className='splash-links' to='/login'>Login Here</NavLink>
                <NavLink className='splash-links' to='/signup'>Signup Here</NavLink>
                <div><button className='demo-login-button' onClick={demoLogin}>Demo Login</button></div>
            </div>
            
            
           
            <div className='splash-banner-1'></div>

        </div>
    )
}

export default Splash;