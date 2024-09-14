import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { globalContext } from '../Contex/ContextProvider';
import axios from 'axios';
import AlertUser from './AlertUser';
import { getBaseUrlForServer, getLoggedUser, getotheruserdetails } from './misc/utili';
import { useNavigate, useOutletContext } from 'react-router-dom';
import LinearLoad from './Loading/LinearLoad';
const SERVER_BASE_URL = getBaseUrlForServer();

function UserList({ otherusers }) {
    var [loading, setloading] = useState(false);
    var { name, email, _id, pp } = otherusers;

    var { refresh, setrefresh } = useContext(globalContext);
    var navigate = useNavigate();

    var lightTheme = useSelector((state) => { return state.lightTheme });
    const [alert, setAlert] = useState({
        active: false,
        cause: "",
        msg: ""
    })

    const user = getLoggedUser();


    const resetAlertState = () => {  //todo : any best way to handle AlertUser component??
        setAlert({
            active: false,
            cause: "",
            msg: ""
        });
        // console.log(alert.active, alert.msg); //this will not log current state as the setAlert performs asynchronous updation
    }





    var accesschats = async (id) => {
        // try {
        setloading(true)
        console.log(user.token);
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        axios.post(`${SERVER_BASE_URL}api/chat`, { "id": id }, config)
            .then((res) => {
                const { data } = res;
                console.log("from  user list", data);
                var otheruserdetails = getotheruserdetails(data.users, user._id);
                console.log("Other user :", otheruserdetails);

                localStorage.setItem("otherUserInfo", JSON.stringify(otheruserdetails));
                setloading(false);
                setrefresh(!refresh);
                navigate('/app/chat/' + data._id);

            })
            .catch((e) => {
                console.log(e);
                setAlert({ active: true, cause: "error", msg: "Failed to add user" })
                setloading(false);

            })

        // setchats((prevChats) => [...prevChats, data]);

        // setchats((prevChats) => {
        //     // Check if data already exists in the chats state
        //     const dataExists = prevChats.some((chat) => chat._id === data._id);

        //     // If data doesn't exist, add it to the state
        //     if (!dataExists) {
        //         return [data, ...prevChats];
        //     }

        //     // If data already exists, return the previous state as is

        //     return prevChats;
        // });

        //     setloading(false)
        // } catch (e) {
        //     setAlert({ active: true, cause: "error", msg: "Failed to add user" })
        //     setloading(false);
        // }
    }



    return (

        // <div className='ou-item'>
        //     <img className='con-icon' src={pp} alt='U' ></img>

        //     <p className='con-title'>{name}</p>
        //     <div className={"con-lastMessage"} style={{}}>{email}</div>
        // </div>
        <>
            <div className={'conversation-container' + (lightTheme ? "" : " dark2")} onClick={() => {
                accesschats(_id);
            }}>
                <img className='con-icon' src={pp} alt='U' ></img>
                <div className={"con-title" + (lightTheme ? "" : " dark2")} >{name}</div>
                <div className={"con-lastMessage" + (lightTheme ? "" : " dark2")}>{email}</div>
            </div>
            <>{alert.active && (<><AlertUser msg={alert.msg} cause={alert.cause} resetState={resetAlertState} /> </>)}</>
            {loading && <LinearLoad />}
        </>

    )
}

export default UserList