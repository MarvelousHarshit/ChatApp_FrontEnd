import React, { useContext, useEffect, useState } from 'react'
import logo from '../logo.png';
import './myStyles.css'
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AlertUser from './AlertUser';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { globalContext } from '../Contex/ContextProvider';
import UserList from './UserList';
import axios from 'axios';
import LoadSkeleton from './Loading/LoadSkeleton';
import { useSelector } from 'react-redux';
import { getBaseUrlForServer, getLoggedUser } from './misc/utili';
import Button from '@mui/material/Button';

import { act } from 'react-dom/test-utils';
const SERVER_BASE_URL = getBaseUrlForServer();

function OnlineUsers() {
    var lightTheme = useSelector((state) => { return state.lightTheme });
    const { refresh, setrefresh, activeUsers, setActiveUsers } = useContext(globalContext);
    var [users, setusers] = useState([]);
    // const [activeUsers, setActiveUsers] = useState([])
    const [buttonstate, setButtonstate] = useState(false);
    var [usersSearchResults, setUsersSearchResults] = useState([])
    var [activeUsersSearchResults, setActiveUserSearchResults] = useState([])

    // var [searchresult, setsearchresult] = useState([]);
    var [searchinput, setsearchinput] = useState();
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();
    var [socket, socketconnected] = useOutletContext();

    const [alert, setAlert] = useState({
        active: false,
        cause: "",
        msg: ""
    })


    const resetAlertState = () => {  //todo : any best way to handle AlertUser component??
        setAlert({
            active: false,
            cause: "",
            msg: ""
        });
    }
    var user = getLoggedUser();
    if (!user) {
        navigate('/', { replace: true });
    }


    var handleSearch = async () => {
        console.log(`to do : implement handle search for all online users`);
    }

    var handlebutton = () => {
        setButtonstate(!buttonstate);
    }


    useEffect(() => {
        setLoading(true);
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        axios.get(`${SERVER_BASE_URL}api/user`, config)
            .then((res) => {
                const { data } = res;
                if (data.length === 0) {
                    <span>No Online Users</span>
                } else {
                    setusers(data);
                    setUsersSearchResults(data);

                }
                setLoading(false)
            })
            .catch((e) => {
                setAlert({ active: true, cause: "error", msg: "Failed to load users" });
                setLoading(false);
            })
    }, [])
    // }, [refresh])  //is refresh required?

    useEffect(() => {
        socket?.emit('get active users');
        socket?.on('all active users', (res) => {
            // console.log("res from socket: ", res)
            // var activeUsers = res;
            const temp = users?.filter((user) => (res.some((re) => re.user_id === user._id)))
            // console.log('temp : ', temp)
            // console.log('users : ', users)
            setActiveUsers(temp);
            setActiveUserSearchResults(temp);
        })

        return () => {
            socket?.off('get active users')
        }
    }, [socket, users])

    // console.log('active users : ', activeUsers);

    const handleLocalSearch = (e) => {
        var keyword = e.target.value;
        // setQuery(keyword);
        const UsersfilteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(keyword.toLowerCase())
        );
        const ActiveUsersfilteredUsers = activeUsers.filter((activeuser) =>
            activeuser.name.toLowerCase().includes(keyword.toLowerCase())
        );

        if (!keyword.length) {
            setUsersSearchResults(users);
            setActiveUserSearchResults(activeUsers);
        } else {
            setUsersSearchResults(UsersfilteredUsers);
            setActiveUserSearchResults(ActiveUsersfilteredUsers);
        }
    }

    return (
        <div className='ou-container'>
            <div className={'ou-header '+ (lightTheme?'':'dark')}>
                <img src={logo} style={{ width: "36px" }} alt='logo' className='ou-header-logo'></img>
                <p className={(lightTheme?"":"dark2")} style={{
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontSize: "1rem",
                    color: "rgba(0, 0, 0, 0.54)",
                    fontWeight: "bold"
                }}>All Users</p>
            </div>
            <div className={'ou-search '+ (lightTheme?'':'dark') }>
                <IconButton onClick={handleLocalSearch}>
                    <SearchIcon />
                </IconButton>
                {/* <input className='sb-search-input' placeholder='search' onChange={handleLocalSearch}></input> */}

                <input
                    className={"sb-search-input "+ (lightTheme?"":"dark") }
                    placeholder="search"
                    onChange={handleLocalSearch}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault(); // Prevent form submission or other default behavior
                            // handleSearch();
                        }
                    }}
                />

            </div>

            {(Loading ? <LoadSkeleton /> : (
                <div className={"ou-list" + (lightTheme ? "" : " dark")}>
                    <Button sx={{ borderRadius: "20px" }} color='success' variant="contained" onClick={handlebutton}>{buttonstate ? ("All users") : ("Online Users")}</Button>
                    {!buttonstate ? (
                        <>
                            {usersSearchResults.map((otherusers) => (
                                <UserList key={otherusers._id} otherusers={otherusers} />
                            ))}
                        </>
                    ) : (
                        <>
                            {activeUsersSearchResults.map((otherusers) => (
                                <UserList key={otherusers._id} otherusers={otherusers} />
                            ))}
                        </>
                    )}



                </div>
            )
            )}


            {alert.active && (<><AlertUser msg={alert.msg} cause={alert.cause} resetState={resetAlertState} /> </>)}

        </div>
    )
}

export default OnlineUsers