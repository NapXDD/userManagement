import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';





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

  const currentUser = useSelector(state => state.currentUser.data)

  return(
    <React.Fragment>
    <ListSubheader component="div" inset>
      Your settings
    </ListSubheader>

    <Link to={`/changepassword/user/${currentUser._id}`}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Change password" />
      </ListItemButton>
    </Link>

    <Link to={`/deleteAccount/user/${currentUser._id}`}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Delete your account" />
      </ListItemButton>
    </Link>

    <Link to={`/profile/${currentUser._id}`}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Profile settings" />
      </ListItemButton>
    </Link>
  
    <ListItemButton onClick={handleLogOut}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItemButton>
  </React.Fragment>
  )
}