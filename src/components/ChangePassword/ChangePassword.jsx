import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { logout } from '../../Redux/features/setAuth';
import { updateUserPasswordByID } from '../../utilities/apiClientPut';

export default function ChangePassword(){

    const [currentPassword, setCurrentPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [newPassword, setNewPassword] = useState({})  
    const token = localStorage.getItem("accessToken")
    const {id} = useParams()
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        const newPass = {
            password: newPassword
        }
        if(currentPassword === repassword){
            try{
                const {data: res} = await updateUserPasswordByID(id, newPass, token)
                if(res.status === 200){
                    console.log("update password success")
                    localStorage.removeItem("accessToken")
                    localStorage.removeItem("userId")
                    dispatch(logout())
                }
            }catch(err){
                console.error(err)
            }
        }
    }

    return(
        <div className='change-password-container'>
            <Box component="form" onSubmit={handleSubmit} noValidate 
                sx={{ 
                    mt: 1, 

                }}>
                <Box component="div"
                    sx={{
                        padding: 10,
                        display: 'flex', 
                        flexDirection: 'column' 
                    }}
                >
                    <TextField 
                        label="current password" 
                        id="password" 
                        name='password'
                        type="password"
                        onChange={e => setCurrentPassword(e.target.value)}
                    />
                    <TextField 
                        label="retype current password" 
                        id="repassword" 
                        name='repassword'
                        type="password"
                        onChange= {e => setRepassword(e.target.value)}
                    />
                    <TextField 
                        label="new password" 
                        id="newpassword" 
                        name='newpassword'
                        type="password"
                        onChange= {e => setNewPassword(e.target.value)}
                    />
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    >
                        Submit 
                    </Button>
                </Box>
            </Box>
        </div>
    )
}