import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PeopleIcon from "@mui/icons-material/People";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import StorageIcon from "@mui/icons-material/Storage";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const mainListItems = (
  <React.Fragment>
    <Link to="/dashboard/userlist">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="User list" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/posts">
      <ListItemButton>
        <ListItemIcon>
          <NotificationsActiveIcon />
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/meeting">
      <ListItemButton>
        <ListItemIcon>
          <MeetingRoomIcon />
        </ListItemIcon>
        <ListItemText primary="Meeting" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/storage">
      <ListItemButton>
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary="Storage" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const SecondaryListItems = ({ handleLogOut }) => {
  const userId = localStorage.getItem("userId");
  const currentUser = useSelector((state) => state.currentUser.data);

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Your settings
      </ListSubheader>

      {currentUser.isAdmin === true ? (
        <Link to={"/dashboard/approveMeeting"}>
          <ListItemButton>
            <ListItemIcon>
              <CheckBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Approve Meeting" />
          </ListItemButton>
        </Link>
      ) : (
        <></>
      )}

      <Link to={`/dashboard/changepassword/user/${userId}`}>
        <ListItemButton>
          <ListItemIcon>
            <LockOpenIcon />
          </ListItemIcon>
          <ListItemText primary="Change password" />
        </ListItemButton>
      </Link>

      <Link to={`/dashboard/profile/${userId}`}>
        <ListItemButton>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Profile settings" />
        </ListItemButton>
      </Link>

      <ListItemButton onClick={handleLogOut}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </ListItemButton>
    </React.Fragment>
  );
};
