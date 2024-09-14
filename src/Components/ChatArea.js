import React, { useContext, useEffect, useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Icon, IconButton, Skeleton } from '@mui/material';
import MessageOther from './MessageOther';
import MessageSelf from './MessageSelf';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { globalContext } from '../Contex/ContextProvider';
import Profilepic from './Profilepic';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { getBaseUrlForServer, getLoggedUser, getotheruserdetails } from './misc/utili';
import axios from 'axios';
import LoadSkeleton from './Loading/LoadSkeleton';
import ScrollableFeed from "react-scrollable-feed";
import AlertUser from './AlertUser';
import { ConstructionOutlined } from '@mui/icons-material';
import { Socket } from 'socket.io-client';
import Lottie from "lottie-react"
import typinganimation from "../animations/typing.json"
import { red } from '@mui/material/colors';
import DialogBox from './misc/DialogBox';
import Card from './Card';

const SERVER_BASE_URL = getBaseUrlForServer();

function ChatArea() {
    var [card, setCard] = React.useState(false);
    var [AllMessages, setAllMessages] = useState([]);
    var [loading, setloading] = useState(true)
    const [messageContent, setmessageContent] = useState("")
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    var lastMessageRef = useRef(null);
    const lottieRef = useRef(null);
    const navigate = useNavigate();
    const [deleteDialog, setDeleteDialog] = useState(false)


    console.log('Chat area fired 1!')
    const { newMessage, setNewMessage, refresh, setrefresh, notifications, setNotifications } = useContext(globalContext);
    var [socket, socketconnected] = useOutletContext();
    const [alert, setAlert] = useState({
        active: false,
        cause: "",
        msg: ""
    })
    const dyParams = useParams();
    var lightTheme = useSelector((state) => { return state.lightTheme });
    const [socketConnectionStatus, setSocketConnectionStatus] = useState(false)
    const [UserTyping, setUserTyping] = useState(false)




    const resetAlertState = () => {  //todo : any best way to handle AlertUser component??
        setAlert({
            active: false,
            cause: "",
            msg: ""
        });
        // console.log(alert.active, alert.msg); //this will not log current state as the setAlert performs asynchronous updation
    }

    const chat_id = dyParams.id;
    // console.log("chat ID : ", chat_id);
    const user = getLoggedUser();
    var status = "online"
    var otheruser = JSON.parse(localStorage.getItem("otherUserInfo"));
    // var socket;

    function adjustContainerHeight() {
        const textarea = document.querySelector('.message-input');
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }





    useEffect(() => {
        console.log("Messages loaded in Chatarea");
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        async function fetchchat() {
            const { data } = await axios.get(`${SERVER_BASE_URL}api/message/${chat_id}`, config);
            // console.log("fetched chat : ", data)
            setAllMessages(data);
            setloading(false);

            console.log("socket in useeffect : ", socket)
            socket
                && socket.emit("join chat", { username: user.name, room: chat_id });
            // setAllMessagesCopy(AllMessages);

        }
        fetchchat();
        return () => setloading(true);
        // }, [chat_id, user._id, user.token]);
        // }, [refresh, chat_id]);
    }, [socket, chat_id]);



    const sendMessage = () => {
        console.log("SendMessage Fired to", chat_id);
        const tempMessage = { sender: { _id: user._id }, content: messageContent, updatedAt: Date.now() };
        setAllMessages(prevMessages => [...prevMessages, tempMessage]);
        socket.emit("stop typing", chat_id);
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        axios
            .post(
                `${SERVER_BASE_URL}api/message`,
                {
                    content: messageContent,
                    chatId: chat_id,
                },
                config
            )
            .then(({ data }) => {
                console.log("Received acknloedgment of Message Fired");
                socket.emit("new message", data);
                // setAllMessages([...AllMessages, data])
                setAllMessages((prevMessages) => prevMessages.slice(0, prevMessages.length - 1));
                setAllMessages(prevMessages => [...prevMessages, data]);
                setrefresh(!refresh);
            }).catch((e) => {
                console.log(e);
                setAllMessages((prevMessages) => prevMessages.slice(0, prevMessages.length - 1));
                setAlert({ active: true, cause: "error", msg: "Failed to send message" });

            })
    };


    useEffect(() => {
        setAllMessages((state) => [
            ...state,
            newMessage
        ])


    }, [newMessage])





    useEffect(() => {
        socket && console.log('inside typing socket:', socket);
        socket && socket.on("typing", () => setIsTyping(true));
        socket && socket.on("stop typing", () => setIsTyping(false));

        // return () => {
        //     socket && socket.off("typing");
        //     socket && socket.off("stop typing");
        // };
    }, [socket]);

    useEffect(() => {
        socket?.emit('get active users');
        socket?.on('all active users', (res) => {
            // const check= res.includes(otheruser?._id);
            // console.log("other user active ? ", otheruser.name," : ", check );
            console.log("res from chat area active : ", res)
        })

        return () => {
            socket?.off('get active users')
        }
    }, [socket])

    var typingHandler = (e) => {
        console.log("socket status : ", socketconnected)
        setmessageContent(e.target.value);

        if (!socketconnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", chat_id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 2000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            console.log("settime out :", timeDiff, "typing : ", typing)
            if (timeDiff >= timerLength) {
                socket.emit("stop typing", chat_id);
                console.log("inside typing condition ka bhi inside : ", typing);
                setTyping(false);
            }
        }, timerLength);
    };

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
        if (istyping) {
            lottieRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to the <Lottie> component
        }
    }, [AllMessages, istyping]);

    const deleteChat = () => {
        // setdisabled(true);
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        axios
            .post(
                `${SERVER_BASE_URL}api/chat/delete`,
                {
                    chat_id,
                },
                config
            )
            .then(({ data }) => {
                if (data.success) {
                    setAlert({ active: true, cause: "success", msg: data.message });
                    console.log("Chat deleted");
                    navigate('/app/welcome');
                    localStorage.removeItem('otherUserInfo');
                    setrefresh(!refresh);
                    // setdisabled(false)

                } else {
                    setAlert({ active: true, cause: "warning", msg: data.message });
                    console.log("Some error from user side");
                    // setdisabled(false)

                }
            }).catch((e) => {
                console.log(e);
                setAlert({ active: true, cause: "error", msg: "Failed to delete Chat. Try again!" });
                // setdisabled(false)

            })

    }

    const toggleCard = () => {
        console.log('inside toggle card : ' + card);
        setCard(!card);
    }









    return (
        <div className='chatArea-container'>

            <div className={"chatarea-header" + (lightTheme ? "" : " dark")} onClick={toggleCard} >
                <Profilepic pp={otheruser?.pp} firstname={otheruser?.name[0]} />
                <div className='header-text'>
                    <div className={"con-title" + (lightTheme ? "" : " dark")}>{otheruser?.name}</div>
                    <div className={"status" + (lightTheme ? "" : " dark")}>{status}</div>
                </div>
                <IconButton sx={{ border: "1px solid red", boxShadow: "rgb(217 1 28 / 162%) 0px 0px 2px 2px" }} color='error' onClick={() => setDeleteDialog(true)} >
                    <DeleteIcon className={!lightTheme && 'dark'} />
                </IconButton>
            </div>
            {deleteDialog && <DialogBox msg={{ title: "Delete ?", body: "This can't be undone. " }} cb={deleteChat} reset={() => setDeleteDialog(false)} />}
            {(card && otheruser) && <Card card = {card} toggleCard = {toggleCard}  user = {otheruser}/>}


            <div className={"chatarea-body" + (lightTheme ? "" : " dark")}>
                {loading ? (
                    <LoadSkeleton />
                ) : (
                    AllMessages.slice(0).map((message, index) => {
                        const sender = message.sender;
                        const self_id = user?._id;
                        if (sender?._id === self_id) {
                            return <MessageSelf props={message} key={index} />;
                        } else {
                            return <MessageOther props={message} key={index} />;
                        }
                    })
                )}
                {/* {"hi"} */}

                {/* {istyping && <>"typing"</>} */}
                {console.log("typing status : ", istyping)}

                {(istyping) && (
                    <Lottie
                        ref={lottieRef}
                        animationData={typinganimation}
                        loop={true}
                        style={{ width: '50px', marginLeft: "10px", height: "20px" }}
                    />
                )}


                <div ref={lastMessageRef}></div>
            </div>

            <div className={"chatarea-input" + (lightTheme ? "" : " dark")}>
                <div className="input-container">
                    <textarea
                        className={"message-input" + (lightTheme ? "" : " dark")}
                        placeholder="Type a message"
                        value={messageContent}
                        onChange={typingHandler}
                        // onChange={(e) => { setmessageContent(e.target.value) }}
                        onKeyDown={(event) => {
                            if (event.code === "Enter") {
                                event.preventDefault(); // Prevent the default Enter key behavior
                                sendMessage();
                                setmessageContent("");
                                // setrefresh(!refresh);
                                // setrefresh(!refresh);
                            }
                        }}
                        onInput={adjustContainerHeight}
                    ></textarea>
                </div>
                <IconButton
                    className={"icon" + (lightTheme ? "" : " dark")}
                    onClick={() => {
                        sendMessage();
                        setmessageContent("");
                        setrefresh(!refresh);
                    }}
                >
                    <SendIcon className={!lightTheme && 'dark'} />
                </IconButton>
                {alert.active && (<><AlertUser msg={alert.msg} cause={alert.cause} resetState={resetAlertState} /> </>)}
            </div>


        </div >
    )
}

export default ChatArea