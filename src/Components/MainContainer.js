import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import ContextProvider, { globalContext } from '../Contex/ContextProvider'
import io from 'socket.io-client';
import { getBaseUrlForServer, getLoggedUser } from './misc/utili'
// const ENDPOINT = "http://localhost:4000"  //dev
const ENDPOINT = getBaseUrlForServer();
var socket;

function MainContainer() {
  const [socketconnected, setsocketconnected] = useState(false)
  const { refresh, setrefresh, notifications, setNotifications, newMessage, setNewMessage } = useContext(globalContext);
  const dy = useParams();
  var user = getLoggedUser();
  const chat_id = dy.id;

  console.log('====================================');
  console.log("chat id from MainContainer", chat_id);
  console.log('====================================');

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setsocketconnected(!socketconnected);
    })

    socket.on('disconnect', () => {
      console.log(' ❌ Socket disconnected');
    });
    socket.on('error', (error) => {
      console.error(' ❌ Socket connection error:', error);
    });
    socket.on('reconnect_error', (error) => {
      console.error(' ❌ Socket reconnection error:', error);
    });

    return () => {
      socket.off('connected');
      socket.off('error')
      socket.off('disconnect')
      socket.off('reconnect_error')
    }
  }, []);

  useEffect(() => {
    console.log("MAIN MOUNT")
    socket?.on('message recieved', (newmsg) => {
      console.log("Message received in  main container :", newmsg)
      console.log("Chat id now : ", chat_id);
      if (!chat_id || chat_id != newmsg.chat._id) {
        console.log("put in notification ");
        setNotifications((prevNotifs) =>
          [
            ...prevNotifs,
            newmsg.chat._id
          ]
        )
      } else {
        setNewMessage((state) => newmsg)
      }

      setrefresh((state) => !state);

    })
    return () => {
      socket?.off('message recieved')
      console.log('MAIN UNMOUNT')
    }
  }, [socket, chat_id]);

  return (

    <div className='MainContainer'>
      {/* <ContextProvider> */}
      <Sidebar socket={socket} socketconnected={socketconnected} />
      {/* <ChatArea /> */}
      {/* <WelcomeArea /> */}
      {/* <Creategroup /> */}
      {/* <Login /> */}
      {/* <OnlineUsers /> */}
      <Outlet context={[socket, socketconnected]} />
      {/* </ContextProvider> */}

    </div>
  )
}

export default MainContainer