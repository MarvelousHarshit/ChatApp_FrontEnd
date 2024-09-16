import React, { useState } from 'react';
import TextField from '@mui/material/TextField';


import { Button, IconButton } from '@mui/material';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link, Routes, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import AlertUser from './AlertUser';
import { getBaseUrlForServer } from './misc/utili';
const SERVER_BASE_URL = getBaseUrlForServer();
// import { createTheme, ThemeProvider } from '@mui/material/styles';

function Base() {
    var [Login, setLogin] = useState(true);
    var [input, setinput] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [alert, setAlert] = useState({
        active: false,
        cause: "",
        msg: ""
    })
    var [Loading, setLoading] = useState(false);
    const [confirmpassword, setConfirmpassword] = useState();
    const [pp, setPp] = useState();
    const [picLoading, setPicLoading] = useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    var navigate = useNavigate();

    const handleinput = (e) => {
        setinput((prev) => {
            return ({
                ...prev,
                [e.target.name]: e.target.value,
            })
        })
    }
    // console.log(input);


    const resetAlertState = () => {  //todo : any best way to handle AlertUser component??
        setAlert({
            active: false,
            cause: "",
            msg: ""
        });
        // console.log(alert.active, alert.msg); //this will not log current state as the setAlert performs asynchronous updation
    }

    const postPic = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            setAlert({ active: true, cause: "warning", msg: "Please select an Image" });
            return;
        }
        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg" || pics.type === "image/webp") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app-pp");
            data.append("cloud_name", "dui3vfvr8");
            // https://api.cloudinary.com/v1_1/dui3vfvr8
            fetch("https://api.cloudinary.com/v1_1/dui3vfvr8/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPp(data.url.toString());

                    setSelectedImage(pics);
                    console.log(data.url.toString());
                    setPicLoading(false);
                    setAlert({ active: true, cause: "success", msg: "Image uploaded successfully" });
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                    setAlert({ active: true, cause: "error", msg: "Something went wrong! Try again" });
                });
        } else {
            setAlert({ active: true, cause: "warning", msg: "Wrong file type selected" });
            console.log('error');
            setPicLoading(false);
            return;
        }
    };

    React.useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        setPicLoading(true);
        if (!input.name || !input.email || !input.password || !confirmpassword) {
            // console.log(name, email, password, confirmpassword)
            console.log("error in name")
            setAlert({ active: true, cause: "error", msg: "Input all fields" });
            setPicLoading(false);
            return;
        }
        if (input.password !== confirmpassword) {
            setAlert({ active: true, cause: "error", msg: "Password unmatched!" });
            setPicLoading(false);
            return;
        }
        // console.log(name, email, password, pp);
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        axios.post(`${SERVER_BASE_URL}api/user`, {
            name: input.name,
            email: input.email,
            password: input.password,
            pp
        },
            config).then((res) => {
                const { data } = res;
                console.log(data);
                setAlert({ active: true, cause: "success", msg: "Registration Successful" });


                localStorage.setItem("userInfo", JSON.stringify(data));   //saves the userInfo in the local storage of the browser in use
                setPicLoading(false);
                // history.push("/chats");   // useHistory() is deprecated
                navigate("/app/welcome");   // useNavigate() is is the new way of using browser history object
                // navigate("/app/welcome", {replace: true});   // {replace : true} to replace the page with the new page. /on pressing back arrow in browser, signUp will not be shown

            }).catch((e) => {
                setAlert({ active: true, cause: "error", msg: "Something went wrong! Try again" });
                setPicLoading(false);
            })
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        console.log(input)
        if (!input.email || !input.password) {
            setAlert({ active: true, cause: "warning", msg: "Input all fields" });
            return;
        }

        console.log(input.email, " ", input.password);
        setLoading(true);


        await axios.post(`${SERVER_BASE_URL}api/user/login`, {
            email: input.email,
            password: input.password,
        }).then((res) => {
            var { data: { data } } = res;
            console.log("api login req : ", data);
            console.log('base url :', SERVER_BASE_URL);
            console.log('node_env ', process.env.NODE_ENV);
            // saves the userInfo in the local storage of the browser in use
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            // history.push("/chats");   // useHistory() is deprecated
            navigate("/app/welcome");   // useNavigate() is is the new way of using browser history object
            // navigate("/app/welcome", {replace: true});   // {replace : true} to replace the page with the new page. /on pressing back arrow in browser, signUp will not be shown


        }).catch((e) => {
            if (e.response.status === 401) {
                setAlert({
                    active: true,
                    cause: "warning",
                    msg: "Invalid login",
                });
                setLoading(false);

            } else {
                setAlert({
                    active: true,
                    cause: "error",
                    msg: "Something went wrong! Try again",
                });
                setLoading(false);
            }

        })
    };



    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="#">
                    www.harshit.com
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    return (


        <div className='login-container'>
            <div className='sideimg-container'>
                <img className='login-side-img' src='logo.png' alt='logo'></img>
            </div>
            <div className='loginbox-container'>
                {/* <Route path="/login" element={<Login />} /> */}
                {Login && (<Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={handleinput}
                                autoComplete="email"

                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handleinput}
                                autoComplete="current-password"
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                loading={Loading}
                            >
                                Sign In
                            </LoadingButton>

                            {/* //todo : */}

                            {alert.active && (<><AlertUser msg={alert.msg} cause={alert.cause} resetState={resetAlertState} /> </>)}

                            <Grid container>
                                {/* <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid> */}
                                <Grid item>
                                    <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setLogin(false)}>

                                        {"Don't have an account? Sign Up"}
                                    </span>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>)}

                {!Login && (<Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSignUpSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={handleinput}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleinput}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={handleinput}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="cnfpassword"
                                        label="Cofirm Password"
                                        type="password"
                                        id="password"
                                        onChange={(e) => setConfirmpassword(e.target.value)}
                                    // autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id="select-image"
                                        style={{ display: "none" }}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            e.target.value = null; // Reset the input value to allow selecting the same file again
                                            postPic(file);
                                        }}

                                    />

                                    <label htmlFor="select-image">
                                        {/* <Button variant="contained" color="primary" component="span">
                                    Upload Image
                                </Button> */}
                                        <LoadingButton
                                            size="small"
                                            loading={picLoading}
                                            // loadingPosition="end"
                                            variant="contained"
                                            color="primary"
                                            component="span"
                                        >
                                            {/* <span>Send</span> */}
                                            Upload Image
                                        </LoadingButton>
                                    </label>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {imageUrl && selectedImage && (
                                        <Box sm={6} textAlign="right">
                                            <img src={imageUrl} alt={selectedImage.name} height="100px" width="100px" />
                                        </Box>
                                    )}
                                </Grid>

                                {/* <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid> */}
                            </Grid>

                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                loading={picLoading}
                                color="primary"
                            // onSubmit={handleSubmit}
                            >
                                SignUp
                            </LoadingButton>
                            {alert.active && (<><AlertUser msg={alert.msg} cause={alert.cause} resetState={resetAlertState} /> </>)}

                            <Grid container justifyContent="flex-end">

                                <Grid item>
                                    <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setLogin(true)}>
                                        {console.log(Login)}

                                        {"Already have an account? Sign In"}
                                    </span>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>)}
            </div>
        </div>
    )
}

export default Base;
