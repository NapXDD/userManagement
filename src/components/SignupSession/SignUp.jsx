import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { registerAccount } from "../../utilities/apiClientPost";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsernameState, setErrorUsernameState] = useState(false);
  const [errorRePasswordState, setErrorRePasswordState] = useState(false);
  const [errorEmailState, setErrorEmailState] = useState(false);
  const [errorPasswordState, setErrorPasswordState] = useState(false);
  const [usernameHelper, setUsernameHelper] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [rePasswordHelper, setRePasswordHelper] = useState("");
  let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i;
  
  const user = {
    email: email,
    username: username,
    password: password,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      errorUsernameState === false &&
      errorRePasswordState === false &&
      errorEmailState === false &&
      errorPasswordState === false
    ) {
        registerAccount(user)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Sign up success, you can now log in", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            navigate("/signin");
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  };

  const handleUsername = () => {
    if (username.length === 0) {
      setErrorUsernameState(true);
      setUsernameHelper("username cannot be empty");
    } else if (username.length <= 4) {
      setErrorUsernameState(true);
      setUsernameHelper("username must be longer or equal to 4");
    } else if (username.length > 4) {
      setErrorUsernameState(false);
      setUsernameHelper("");
    }
  };

  const handlePassword = () => {
    if (password.length === 0) {
      setErrorPasswordState(true);
      setPasswordHelper("Password cannot be empty");
    } else if (password.length <= 5) {
      setErrorPasswordState(true);
      setPasswordHelper("Password must be longer or equal to 6");
    } else if (password.length > 5) {
      setErrorPasswordState(false);
      setPasswordHelper("");
    }
  };

  const handleRePassword = () => {
    if (rePassword !== password) {
      setErrorRePasswordState(true);
      setRePasswordHelper("The confirm password is not the same as password");
    } else if (rePassword.length === 0) {
      setErrorRePasswordState(true);
      setRePasswordHelper("Confirm password cannot be empty");
    } else if (rePassword === password && rePassword.length > 0) {
      setErrorRePasswordState(false);
      setRePasswordHelper("");
    }
  };

  const handleEmail = () => {
    if (email.length === 0) {
      setErrorEmailState(true);
      setEmailHelper("Email cannot be empty");
    } else if (!regex.test(email)) {
      setErrorEmailState(true);
      setEmailHelper("Please provide correct email type");
    } else if (regex.test(email) && email.length > 0) {
      setErrorEmailState(false);
      setEmailHelper("");
    }
  };

  useEffect(() => {
    handleEmail();
  }, [email]);

  useEffect(() => {
    handleUsername();
  }, [username]);

  useEffect(() => {
    handlePassword();
  }, [password]);

  useEffect(() => {
    handleRePassword();
  }, [rePassword]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errorUsernameState}
                  helperText={usernameHelper}
                  autoComplete="username"
                  name="username"
                  fullWidth
                  id="username"
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={errorEmailState}
                  helperText={emailHelper}
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorPasswordState}
                  helperText={passwordHelper}
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
                  error={errorRePasswordState}
                  helperText={rePasswordHelper}
                  fullWidth
                  id="ConfirmPassword"
                  label="Confirm Password"
                  name="ConfirmPassword"
                  type="password"
                  autoComplete="Confirm-password"
                  onChange={(e) => setRePassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className="" to="/signin">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
