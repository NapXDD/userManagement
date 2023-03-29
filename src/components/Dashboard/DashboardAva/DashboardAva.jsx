import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAccount } from '../../../utilities/apiClientPost';
import { logout } from '../../../Redux/features/setAuth';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import "./dashboardAva.css"
import { useNavigate } from 'react-router-dom';
import { avatarURL } from '../../../utilities/avatarURL';
import { toast } from "react-toastify";
import { currentUserData } from '../../../redux/features/setCurrentUser';
import { getUserbyID } from '../../../utilities/apiClientGet';

export default function DashboardAva(){

    const token = localStorage.getItem("accessToken")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const userId = localStorage.getItem("userId")
    const userAva = localStorage.getItem("userAva")

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleProfile = () => {
        navigate(`/profile/${userId}`)
    }

    const handleLogout = () => {
        try{
            logoutAccount(token, userId)
            .then(res => {
                if(res.status === 200){
                    localStorage.removeItem("accessToken")
                    localStorage.removeItem("userId")
                    dispatch(logout())
                    toast.success('logout success', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                }
                else{
                    console.log(res)
                }
            })
        }catch(e){
            console.error(e)
        }
    }
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return(
        <div className="dashboardAva-container">
            <div className="ava-dashboard-container">
                    <Button className='ava-dashboard-button' onClick={handleClick}>
                        <img src={`${avatarURL}/${userAva}`} alt="user avatar" />
                    </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                >
                    <Typography sx={{ p: 1, padding: "0 8px"}}>
                        <Button sx={{textTransform: "none", fontSize: 16}} onClick={handleProfile}>Profiles</Button>
                    </Typography>
                    <Typography sx={{ p: 1, padding: "0 8px" }}>
                        <Button sx={{textTransform: "none", fontSize: 16}} onClick={handleLogout}>Log out</Button>
                    </Typography>
                </Popover>
            </div>
        </div>
    )
}