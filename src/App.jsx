import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import SignIn from "./components/LoginSession/Login";
import Profile from "./components/Profile/Profile";
import UserList from "./components/UserList/UserList";
import SignUp from "./components/SignupSession/SignUp";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import DeleteAccount from "./components/DeleteAccount/DeleteAccount";
import NotFound from "./components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutAccount } from "./utilities/apiClientPost";
import { loginFail, logout } from "./Redux/features/setAuth";
import Blank from "./components/Blank/Blank";
import Posts from "./components/Posts/Posts";
import Post from "./components/Posts/component/Post";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.value);
  const date = new Date();

  const urlTitle = window.location.href.split("/")[4];
  const url = window.location.href.split("/").pop();

  let title;
  switch (urlTitle) {
    case "profile": {
      title = "User profile";
      break;
    }
    case "changepassword": {
      title = "Change user password";
      break;
    }
    case "deleteAccount": {
      title = "Delete user account";
      break;
    }
    case "userlist": {
      title = "User list";
      break;
    }
    case "posts": {
      title = "Posts";
      break;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      dispatch(loginFail());
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    if (url === "" && auth === true) {
      navigate("/dashboard/userlist");
    } else if (url === "" && auth === false) {
      navigate("/signin");
    } else if (
      (url === "signin" && auth === true) ||
      (url === "signup" && auth === true)
    ) {
      navigate("/dashboard/userlist");
    }
  }, [url]);

  useEffect(() => {
    if (auth === true) {
      const loggedDate = localStorage.getItem("loggedTime");
      const passedTime = (date - Date.parse(loggedDate)) / 60000;
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      if (passedTime > 1440) {
        console.log("logged out");
        logoutAccount(token, userId).then((res) => {
          if (res.status === 200) {
            localStorage.clear();
            dispatch(logout());
          }
        });
      }
    }
  }, [date]);

  return (
    <div className="App">
      <div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
      <Routes>
        <Route exact path="/" element={<Blank />} />
        <Route path="/dashboard" element={<Dashboard title={title} />}>
          <Route path="userlist" element={<UserList />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="changepassword/user/:id" element={<ChangePassword />} />
          <Route path="deleteAccount/user/:id" element={<DeleteAccount />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/post/:id" element={<Post />} />
        </Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
