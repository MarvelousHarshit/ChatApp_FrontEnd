import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLocaltime, getLoggedUser, getotheruserdetails } from './misc/utili';
import { globalContext } from '../Contex/ContextProvider';
import Profilepic from './Profilepic';
import { useState } from 'react';
// import { useSelector } from 'react-redux';

function ConversationItem({ chat }) {
  var { selectedchat, setselectedchat, notifications, setNotifications } = useContext(globalContext);
  var navigate = useNavigate();
  const [isnotification, setIsnotification] = useState(false)
  var user = getLoggedUser();
  var { _id: curr_user_id, pp } = user;

  var { chatName, _id, users, lastMessage, updatedAt = "" } = chat;
  var trimmedMessage = "Click to start ..";
  if (lastMessage) {
    trimmedMessage = lastMessage.content.slice(0, 10);
    if (lastMessage.content.length > 10) {
      trimmedMessage = trimmedMessage + '...';

    }
  }
  var lightTheme = useSelector((state) => { return state.lightTheme });
  updatedAt = getLocaltime(updatedAt);


  var otheruserdetails = getotheruserdetails(users, curr_user_id);
  // console.log("Other : ",otheruserdetails)

  useEffect(() => {
    var utili = notifications.includes(chat._id);
    // console.log("utility for notification , chat id : ", chat._id, " bool :", utili);
    setIsnotification(utili)

  }, [notifications])
  
  return (
    <div
    onClick={() => {
      // setselectedchat({ chat, otheruserdetails });
      
      localStorage.setItem("otherUserInfo", JSON.stringify(otheruserdetails));
      // console.log("inside con item , chatid now 1: ", chat._id);
      navigate('/app/chat/' + chat._id);
      console.log("inside con item , chatid now 2: ", chat._id);
        setIsnotification(false);
        console.log('after set is notification')
        setNotifications((prevNotifications) => prevNotifications.filter(id => id !== chat._id));
        console.log('after set is context notifs')
        // navigate('chat');
      }
      }
      // className={'conversation-container' + (selectedchat.chat === chat ? ' selected' : '') + isnotification===true?  ' notification' : ''}
      className={'conversation-container' + (selectedchat.chat === chat ? ' selected' : '') + (isnotification ? ' notification' : '')}


    >
      <Profilepic pp={otheruserdetails.pp} firstname={chatName[0]} />
      <div className={"con-title" + (lightTheme ? "" : " dark2")}>{otheruserdetails.name}</div>
      {/* <div className={"con-lastMessage" + (lightTheme ? "" : " dark2")}>To do : Last Message not working </div> */}
      <div className={"con-lastMessage" + (lightTheme ? "" : " dark2")}>{trimmedMessage}</div>
      <div className={"con-timeStamp" + (lightTheme ? "" : " dark2")}>{updatedAt.toLocaleString()}</div>
    </div>
    // <div>handle</div>
  )
}

export default ConversationItem