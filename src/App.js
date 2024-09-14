import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import MainContainer from './Components/MainContainer';
// import { Login } from '@mui/icons-material';

import WelcomeArea from './Components/WelcomeArea';
import ChatArea from './Components/ChatArea';
import OnlineUsers from './Components/OnlineUsers';
import Creategroup from './Components/Creategroup';
import Login from './garbageComponents/Login';
import Group from './Components/Group';
import Test from './Components/Test';
import Base from './Components/Base';
import SignUp from './Components/Test';
import { useEffect, useState } from 'react';

import { getLoggedUser } from './Components/misc/utili';
import Chats from './Components/Chats';


function App() {
  var navigate = useNavigate();


  // var user = getLoggedUser();



  useEffect(() => {
    var handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className='App'>
      {/* <Button colorScheme='blue'>Button</Button> */}
      <Routes>
        <Route path='/' element={<Base />} />

        <Route path='app' element={<MainContainer />} >
          <Route path='welcome' element={<WelcomeArea />} />
          <Route path='chats' element={<Chats />} />
          <Route path='chat/:id' element={<ChatArea />} />
          {/* <Route path='chat' element={<ChatArea />} /> */}
          <Route path='users' element={<OnlineUsers />} />
          <Route path='groups' element={<Group />} />
          <Route path='create-group' element={<Creategroup />} />
        </Route>
      </Routes>
      {/* <MainContainer /> */}
    </div>
  );
}

export default App;
