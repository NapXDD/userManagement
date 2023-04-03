import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginSuccess } from "../../Redux/features/setAuth";
import { loginAccount } from "../../utilities/apiClientPost";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
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
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorEmailState, setErrorEmailState] = useState(false);
  const [errorPasswordState, setErrorPasswordState] = useState(false);
  const [emailHepler, setEmailHelper] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i;
  const auth = useSelector((state) => state.auth.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const date = new Date();
    handleCheckEmail()
    handleCheckPassword()
    if (errorEmailState === false && errorPasswordState === false) {
      loginAccount(data.get("email"), data.get("password"))
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken); //save token to local storage
            localStorage.setItem("userId", res.data._id); //save userid to local storage
            localStorage.setItem("loggedTime", date);
            dispatch(loginSuccess());
            toast.success("Login success!", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            navigate("/userlist");
          }
        })
        .catch((err) => {
          toast.error("Email or password incorrect", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  };

  const handleCheckEmail = () => {
    if (email.length === 0) {
      setErrorEmailState(true);
      setEmailHelper("Email is empty");
    } else if (email.length > 0) {
      if (!regex.test(email)) {
        setErrorEmailState(true);
        setEmailHelper("Email type is not correct");
      } else {
        setErrorEmailState(false);
        setEmailHelper("");
      }
    }
  };

  const handleCheckPassword = () => {
    if (password.length === 0) {
      setErrorPasswordState(true);
      setPasswordHelper("Password is empty");
    } else if (password.length > 0) {
      setErrorPasswordState(false);
      setPasswordHelper("");
    }
  };

  useEffect(() => {
    if (auth === true) {
      navigate("/userlist");
    }
  }, [auth]);

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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={errorEmailState}
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              helperText={emailHepler}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              error={errorPasswordState}
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText={passwordHelper}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
