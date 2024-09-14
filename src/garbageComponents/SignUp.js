import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import FileInput from '../Components/PpUpload';
import AlertUser from '../Components/AlertUser';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from "axios";
import { Navigate } from 'react-router-dom';

// import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                www.hemant.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


function SignUp() {
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //         firstName: data.get('firstName'),
    //         lastName: data.get('lastName'),
    //     });
    // };



    const navigate = useNavigate(); // to access browser history object and direct users to the path mentioneed in the argument

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pp, setPp] = useState();
    const [picLoading, setPicLoading] = useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const [alert, setAlert] = useState({
        active: false,
        cause: "",
        msg: ""
    })

    React.useEffect(() => {
        console.log(name);
    }, [name]);
    React.useEffect(() => {
        console.log(email);
    }, [email]);
    React.useEffect(() => {
        console.log(password);
    }, [password]);
    React.useEffect(() => {
        console.log(confirmpassword);
    }, [confirmpassword]);

    const resetAlertState = () => {  //todo : any best way to handle AlertUser component??
        setAlert({
            active: false,
            cause: "",
            msg: ""
        });
        // console.log(alert.active, alert.msg); //this will not log current state as the setAlert performs asynchronous updation
    }


    //best way to check the state of any useState variable
    // React.useEffect(() => {
    //     console.log(alert.active, alert.msg);
    // }, [alert]);



    const postPic = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            setAlert({ active: true, cause: "warning", msg: "Please select an Image" });
            return;
        }
        console.log(pics);
        if (pics.type === "image/jpeg") {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        //     firstName: data.get('firstName'),
        //     lastName: data.get('lastName'),
        // });
        setPicLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            console.log(name, email, password, confirmpassword)
            console.log("error in name")
            setAlert({ active: true, cause: "error", msg: "Input all fields" });
            setPicLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            setAlert({ active: true, cause: "error", msg: "Password unmatched!" });
            setPicLoading(false);
            return;
        }
        console.log(name, email, password, pp);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user",
                {
                    name,
                    email,
                    password,
                    pp,
                },
                config
            );
            console.log(data);
            setAlert({ active: true, cause: "success", msg: "Registration Successful" });


            localStorage.setItem("userInfo", JSON.stringify(data));   //saves the userInfo in the local storage of the browser in use
            setPicLoading(false);
            // history.push("/chats");   // useHistory() is deprecated
            navigate("/app/welcome");   // useNavigate() is is the new way of using browser history object
            // navigate("/app/welcome", {replace: true});   // {replace : true} to replace the page with the new page. /on pressing back arrow in browser, signUp will not be shown

        } catch (error) {
            setAlert({ active: true, cause: "error", msg: "Something went wrong! Try again" });
            setPicLoading(false);
        }
    };



    return (
        <Container component="main" maxWidth="xs">
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
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
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
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
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
                            <Link to={'/login'} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    )
}

export default SignUp