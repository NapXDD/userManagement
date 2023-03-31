import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link to="/userlist">
        <ListItemButton>
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="User list" />
        </ListItemButton>
    </Link>
  </React.Fragment>
);



export const SecondaryListItems = ({handleLogOut}) => {

  const userId = localStorage.getItem("userId")

  return(
    <React.Fragment>
    <ListSubheader component="div" inset>
      Your settings
    </ListSubheader>

    <Link to={`/changepassword/user/${userId}`} >
      <ListItemButton>
        <ListItemIcon>
          <LockOpenIcon/>
        </ListItemIcon>
        <ListItemText primary="Change password" />
      </ListItemButton>
    </Link>

    <Link to={`/deleteAccount/user/${userId}`} >
      <ListItemButton>
        <ListItemIcon>
          <PersonRemoveIcon />
        </ListItemIcon>
        <ListItemText primary="Delete your account" />
      </ListItemButton>
    </Link>

    <Link to={`/profile/${userId}`} >
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
  )
}