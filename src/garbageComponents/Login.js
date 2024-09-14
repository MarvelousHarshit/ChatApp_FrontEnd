import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, IconButton } from '@mui/material';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import AlertUser from '../Components/AlertUser';

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


function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alert, setAlert] = useState({
    active: false,
    cause: "",
    msg: ""
  })
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const resetAlertState = () => {  //todo : any best way to handle AlertUser component??
    setAlert({
      active: false,
      cause: "",
      msg: ""
    });
    // console.log(alert.active, alert.msg); //this will not log current state as the setAlert performs asynchronous updation
  }

  React.useEffect(() => {
    console.log(email);
  }, [email]);
  React.useEffect(() => {
    console.log(password);
  }, [password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // email = data.get('email');
    // password = data.get('password');
    if (!email || !password) {
      setAlert({ active: true, cause: "warning", msg: "Input all fields" });
      return;
    }

    console.log(email, " ", password);
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://chatapp-api-d3a8.onrender.com/api/user/login",
        {
          email: email,
          password: password,
        },
        config
      );
      console.log(data);

      if (!data) {
        setLoading(false);
        setAlert({ active: true, cause: "warning", msg: "Invalid Credentials" });
        return;

      }

      //saves the userInfo in the local storage of the browser in use
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      // history.push("/chats");   // useHistory() is deprecated
      navigate("/app/welcome");   // useNavigate() is is the new way of using browser history object
      // navigate("/app/welcome", {replace: true});   // {replace : true} to replace the page with the new page. /on pressing back arrow in browser, signUp will not be shown

    } catch (error) {
      setAlert({ active: true, cause: "error", msg: "Something went wrong! Try again" });
      setLoading(false);
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={Loading}
          >
            Sign In
          </LoadingButton>
          {alert.active && (<><AlertUser msg={alert.msg} cause={alert.cause} resetState={resetAlertState} /> </>)}
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link to={"/signUp"} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

export default Login