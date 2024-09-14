import React from 'react'
import { getLocaltime } from './misc/utili'

function MessageSelf({props}) {
    // var props = {
    //     message : 'This is a demo message by self',
    //     timeStamp : '12:00 AM'
    // }
    const updatedAt = getLocaltime(props.updatedAt)
  return (
    <div className='self-message-container'>
        <div className='message-box-self'>
            <div className='msg'>{props.content}</div>
            <div className='con-timeStamp'>{updatedAt}</div>
        </div>
    </div>
  )
}

export default MessageSelf