import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { logout } from '../../Redux/features/setAuth';
import { updateUserPasswordByID } from '../../utilities/apiClientPut';
import { toast } from "react-toastify";
import "./changepassword.css"

export default function ChangePassword(){

    const [currentPassword, setCurrentPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [newPassword, setNewPassword] = useState({})  
    const [errorPasswordState, setErrorPasswordState] = useState(false)
    const [errorRePasswordState, setErrorRePasswordState] = useState(false)
    const [errorNewPasswordState, setErrorNewPasswordState] = useState(false)
    const [passwordHelper, setPasswordHelper] = useState("")
    const [reRasswordHelper, setReRasswordHelper] = useState("")
    const [newRasswordHelper, setNewRasswordHelper] = useState("")
    const token = localStorage.getItem("accessToken")
    const {id} = useParams()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleCurrentPassword()
        handleNewPassword()
        handleRePassword()
        if(errorPasswordState === false && errorRePasswordState === false && errorNewPasswordState === false){
            const newPass = {
                currentPassword: currentPassword,
                password: newPassword
            }
            try{
                const res = await updateUserPasswordByID(id, newPass, token)
                if(res.status === 200){
                    toast.success(res.data, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                    localStorage.removeItem("accessToken")
                    localStorage.removeItem("userId")
                    dispatch(logout())
                }
            }catch(err){
                if(err.response.status === 404){
                    setErrorPasswordState(true)
                    setPasswordHelper(err.response.data)
                }
            }
        }
    }

    const handleCurrentPassword = () => {
        if(currentPassword.length === 0){
            setErrorPasswordState(true)
            setPasswordHelper("Password cannot be empty")
        }
        else if(currentPassword.length > 0){
            setErrorPasswordState(false)
            setPasswordHelper("")
        }
    }

    const handleRePassword = () => {
        if(repassword.length === 0){
            setErrorRePasswordState(true)
            setReRasswordHelper("Confirm password cannot be empty")
        }
        else if(repassword.length > 0 && repassword !== newPassword){
            setErrorRePasswordState(true)
            setReRasswordHelper("The confirm password is not the same as new password")
        }
        else if(repassword.length > 0 && repassword === newPassword){
            setErrorRePasswordState(false)
            setReRasswordHelper("")
        }
    }

    const handleNewPassword = () => {
        if(newPassword.length === 0){
            setErrorNewPasswordState(true)
            setNewRasswordHelper("New password cannot be empty")
        }
        else if(newPassword.length < 6){
            setErrorNewPasswordState(true)
            setNewRasswordHelper("New password lenght need to bigger or equal to 6")
        }
        else if(newPassword.length >= 6){
            setErrorNewPasswordState(false)
            setNewRasswordHelper("")
        }
    }

    const handlePassFocus = () => {
        setErrorPasswordState(false)
        setPasswordHelper("")
    }

    const handleNewPassFocus = () => {
        setErrorNewPasswordState(false)
        setNewRasswordHelper("")
    }

    const handleRePassFocus = () => {
        setErrorRePasswordState(false)
        setReRasswordHelper("")
    }

    return(
        <div className="change-password-container">
            <div className='change-password-content'>
            <div className='title-describe'><p>Change your password here:</p></div>
                <form className='profile-setting-form' onSubmit={handleSubmit}>
                        <TextField 
                            error={errorPasswordState}
                            label="current password" 
                            id="password" 
                            name='password'
                            type="password"
                            helperText={passwordHelper}
                            fullWidth
                            onChange={e => setCurrentPassword(e.target.value)}
                            onFocus={handlePassFocus}
                        />
                        <TextField 
                            error={errorNewPasswordState}
                            label="new password" 
                            id="newpassword" 
                            name='newpassword'
                            type="password"
                            fullWidth
                            helperText={newRasswordHelper}
                            margin='normal'
                            onChange= {e => setNewPassword(e.target.value)}
                            onFocus={handleNewPassFocus}
                        />
                        <TextField 
                            error={errorRePasswordState}
                            label="retype new password" 
                            id="repassword" 
                            name='repassword'
                            type="password"
                            fullWidth
                            helperText={reRasswordHelper}
                            margin='normal'
                            onChange= {e => setRepassword(e.target.value)}
                            onFocus={handleRePassFocus}
                        />
                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            marginBottom: 1
                        }}
                        >
                            Submit 
                        </Button>
                </form>
            </div>
        </div>
    )
}