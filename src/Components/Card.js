import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Profilepic from './Profilepic';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius : '10px',
    p: 4,
    display : 'flex',
    flexDirection : 'column',
    minWidth : '320px'
};

export default function Card({ user, toggleCard, card }) {

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={card}
                onClose={toggleCard}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={card}>
                    <Box sx={style}>
                        {/* <Profilepic  pp = {user.pp} firstname={user.name[0]} /> */}
                        <img src={user.pp} alt={user.name} style={{ alignItems :"center" , width: '70%', height: 'auto', maxWidth: '100%', margin: '10px auto' }} />
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                           <span style={{fontSize : '15px', color : 'gray'}}> Name  :  </span> <span style={{fontWeight : 'bold'}}>{user.name} </span>
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        <span style={{fontSize : '15px', color : 'gray'}}> Email  :  </span> <span style={{fontWeight : 'bold'}}>{user.email} </span>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
