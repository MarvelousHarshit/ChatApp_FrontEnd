import { React, createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


var globalContext = createContext();

function ContextProvider({ children }) {
    const [user, setUser] = useState();
    // const [chats, setchats] = useState([]);
    const [selectedchat, setselectedchat] = useState({});
    const [chatloading, setchatloading] = useState(false);
    const [refresh, setrefresh] = useState(true);
    const [notifications, setNotifications] = useState([])
    const [newMessage, setNewMessage] = useState({})
    const [activeUsers, setActiveUsers] = useState([])

    const navigate = useNavigate();
    console.log("from context, selectd chat : ", selectedchat);

    // useEffect(() => {

    //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //     console.log(userInfo)
    //     console.log(selectedchat);
    //     console.log('from context');
    //     setTimeout(() => {
    //         if (!userInfo) {
    //             // console.log(window.location.pathname.includes('/login'));
    //             if (!window.location.pathname.includes('/')) {
    //                 navigate('/');
    //             }
    //         }
    //     }, 50);
    //     setUser(userInfo);

    // }, [navigate])



    return (
        // <div>ContextProvider</div>
        <globalContext.Provider value={{ activeUsers, setActiveUsers, newMessage, setNewMessage, user, setUser, refresh, setrefresh, selectedchat, setselectedchat, chatloading, setchatloading, notifications, setNotifications }} >
            {children}
        </globalContext.Provider>

    )
}



export { globalContext };

export default ContextProvider