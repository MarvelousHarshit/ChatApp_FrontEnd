import React, { useContext, useEffect, useState } from 'react'
import './myStyles.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ConversationItem from './ConversationItem';
import { Navigate, useAsyncError, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ForumIcon from '@mui/icons-material/Forum';

import { toggleTheme } from '../features/darkMode';
import SbConContainer from './SbConContainer';
import BasicMenu from './BasicMenu';
import { globalContext } from '../Contex/ContextProvider';
function Sidebar({ socket, socketconnected }) {
    const { refresh, setrefresh, notifications, setNotifications } = useContext(globalContext);
    var dispatch = useDispatch();
    var lightTheme = useSelector((state) => { return state.lightTheme });
    var navigate = useNavigate();
    const dy = useParams();
    function setLightTheme() {
        dispatch(toggleTheme());
    }

    const chat_id = dy.id;

    // console.log('====================================');
    // console.log("chat id from sidebar", chat_id);
    // console.log('====================================');
    //     socket?.on("message recieved", (newMessageRecieved) => {
    //         console.log("new message in sidebar : ", newMessageRecieved);
    //     })
    return (
        <div className='Sidebar'>

            <div className={"sb-header" + (lightTheme ? "" : " dark")}>
                <div className='sb-header-div1'>
                    <BasicMenu />
                </div>

                <div className='sb-header-div2'>
                    {/* <IconButton > */}
                    <IconButton onClick={() => {
                        navigate('users');
                    }} >
                        <PersonAddIcon className={!lightTheme && "dark"} />
                    </IconButton>

                    {/* TO DO : connect with "group" api on backend and give functionality */}

                    {/* <IconButton onClick={() => {
                        navigate('groups');  // TODO: add available-group component
                    }} >
                        <GroupAddIcon className={!lightTheme && "dark"} />
                    </IconButton> */}

                    {/* <IconButton onClick={() => {
                        navigate('create-group');
                    }} >
                        <AddCircleIcon className={!lightTheme && "dark"} />
                    </IconButton> */}



                    <IconButton onClick={() => {
                        setLightTheme();
                    }}>
                        {!lightTheme && <LightModeIcon className={!lightTheme && "dark"} />}
                        {lightTheme && <NightlightIcon className={!lightTheme && "dark"} />}
                        {/* <NightlightIcon /> */}
                    </IconButton>
                </div>

                <div className='sb-header-div3'>
                    <IconButton onClick={() => {
                        navigate('chats')
                    }}>
                        <ForumIcon className={!lightTheme && "dark"} />
                    </IconButton>
                </div>
            </div>

            <div className={"web" + (lightTheme ? "" : " dark")}>
                <SbConContainer />
            </div>

        </div>
    )
}

export default Sidebar
