import React, { useState } from 'react'
import logo from '../logo.png';
import './myStyles.css'
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { globalContext } from '../Contex/ContextProvider';
import { getLoggedUser } from './misc/utili';


function Group() {
    var [availableGroup, setavailableGroup] = useState('Group1');
    
    const navigate = useNavigate();
    const user = getLoggedUser();
    if(!user){
        navigate('/');
    }
    return (
        <div className='group-container'>
            <div className='gp-header'>
                <img src={logo} style={{ width: "20px" }} alt='logo' className='gp-header-logo'></img>
                <p style={{
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontSize: "1rem",
                    color: "rgba(0, 0, 0, 0.54)",
                    fontWeight: "bold"
                }}>Available Groups</p>
            </div>
            <div className='gp-search'>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <input className='sb-search-input' placeholder='search'></input>
            </div>
            <div className='gp-list'>
                <div className='gp-item'>
                    <p className='con-icon'>G</p>
                    <p className='con-title'>Group</p>
                </div>
                <div className='gp-item'>
                    <p className='con-icon'>G</p>
                    <p className='con-title'>Group</p>
                </div>
                <div className='gp-item'>
                    <p className='con-icon'>G</p>
                    <p className='con-title'>Group</p>
                </div>
                <div className='gp-item'>
                    <p className='con-icon'>G</p>
                    <p className='con-title'>Group</p>
                </div>
                <div className='gp-item'>
                    <p className='con-icon'>G</p>
                    <p className='con-title'>Group</p>
                </div>
                <div className='gp-item'>
                    <p className='con-icon'>G</p>
                    <p className='con-title'>Group</p>
                </div>
                <div className='gp-item'>
                    <p className='con-icon'>G</p>
                    <p className='con-title'>Group</p>
                </div>
                <div className='gp-item'>
                    <p className='con-icon'>G</p>
                    <p className='con-title'>Group</p>
                </div>
                <div className='gp-item'>
                    <p className='con-icon'>G</p>
                    <p className='con-title'>Group</p>
                </div>
                <div className='gp-item'>
                    <p className='con-icon'>G</p>
                    <p className='con-title'>Group</p>
                </div>
                <div className='gp-item'>
                    <p className='con-icon'>G</p>
                    <p className='con-title'>Group</p>
                </div>
            </div>

        </div>
    )
}

export default Group