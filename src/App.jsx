import { useEffect } from "react";
import { useSelector } from "react-redux";
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

function App() {
  
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.value);

  const url = window.location.href.split("/")[3]
  let title
  switch(url){
    case 'profile':{
      title = "User profile"
      break
    }
    case 'changepassword':{
      title = "Change user password"
      break
    }
    case 'deleteAccount':{
      title = "Delete user account"
      break
    }
    case 'userlist':{
      title = "User list"
      break
    }
  }

  useEffect(() => {
    if (auth === false) {
      navigate("/signin");
    }
  }, [auth]);

  useEffect(() => {
    if(url === ""){
      navigate("/userlist")
    }
  }, [url])

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
        <Route exact path="/" element={<Dashboard title={title}/>}>
          <Route path="userlist" element={<UserList />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="changepassword/user/:id" element={<ChangePassword />} />
          <Route path="deleteAccount/user/:id" element={<DeleteAccount />} />
        </Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
