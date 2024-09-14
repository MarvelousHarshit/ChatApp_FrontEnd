import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
function Creategroup() {
  return (
    <div className='creategroup-container '>
      <div className='creategroup-box'>
        <input className='creategroup-input' type="text" placeholder='create a group here'></input>
        <IconButton>
          <CheckCircleIcon></CheckCircleIcon>
        </IconButton>
      </div>
    </div>
  )
}

export default Creategroup