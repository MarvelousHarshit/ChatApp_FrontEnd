import React from 'react'
import { getLocaltime, getotheruserdetails } from './misc/utili'
import Profilepic from './Profilepic'

function MessageOther({ props }) {
    // var props = {
    //     name: 'Hemant',
    //     message: 'This is a demo message by Random User',
    //     timeStamp: '11 : 59 AM'
    // }
    const updatedAt = getLocaltime(props.updatedAt)
    return (
        // <div className='message-other-container'>
        //     <div className='message-box-other'>

        //             <Profilepic pp={props.sender.pp} firstname={props.sender.name[0]} />
        //         <div className='other-text-content'>
        //             <div className='msg'>{props.content}</div>
        //             <div className='con-timeStamp'>{updatedAt}</div>
        //         </div>

        //     </div>
        // </div>
        <div className='message-other-container'>
            <div>

            {/* <Profilepic pp={props.sender.pp} firstname={props.sender.name[0]} /> */}
            </div>
            <div className='message-box-other'>
                <div className='msg'>{props.content}</div>
                <div className='con-timeStamp'>{updatedAt}</div>
            </div>
        </div>
    )
}

export default MessageOther