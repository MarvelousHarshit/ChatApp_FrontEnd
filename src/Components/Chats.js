import React from 'react'
import SbConContainer from './SbConContainer'
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Chats() {
    var lightTheme = useSelector((state) => { return state.lightTheme });
    return (
        // <div>Chats</div>
        <div className={"mob" + (lightTheme ? "" : " dark")}>
            <SbConContainer />

        </div>
    )
}

export default Chats

