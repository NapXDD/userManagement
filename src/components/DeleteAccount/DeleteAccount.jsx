import { useNavigate, useParams } from "react-router-dom"
import { Box } from '@mui/system';
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { deleteUser } from "../../utilities/apiClientDelete";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/features/setAuth";
import { toast } from "react-toastify";
import "./deleteaccount.css"

export default function DeleteAccount(){

    const {id} = useParams()
    const [idConfirm, setIdConfirm] = useState("")
    const [errorIdState, setErrorIdState] = useState(false)
    const [idHelper, setIdHelper] = useState("")
    const currentUserId = localStorage.getItem("userId")
    const token = localStorage.getItem("accessToken")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(currentUserId === id){
            if(idConfirm === id){
                try{
                    const res = await deleteUser(token, id)
                    if(res.status === 200){
                        console.log("delete success")
                        localStorage.clear()
                        dispatch(logout())
                        toast.warn('Your account have been deleted!', {
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
                }
                catch(err){
                    console.log(err)
                }
            }
            else{
                setErrorIdState(true)
                setIdHelper("Wrong confirm code")
            }
        }
        else{
            if(idConfirm === id){
                try{
                    deleteUser(token, id)
                    .then(
                        res => {
                            console.log(res)
                            if(res.status === 200){
                                toast.warn('User deleted', {
                                    position: "top-right",
                                    autoClose: 1000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                    });
                                navigate("/userlist")
                            }
                        }
                    )
                   .catch(() => {
                        setErrorIdState(true)
                        setIdHelper("Wrong confirm code")
                   })
                    
                }
                catch(err){
                    console.log(err)
                }
            }
            else{
                console.log("wrong confirm code")
            }
        }
    }

    const handleFocus = () => {
        setErrorIdState(false)
        setIdHelper("")
    }

    return(
        <div className="delete-form-container">
            <div className="delete-form-content">
            <dir className="title-describe">
            <p>Write <b>{id}</b> to confirm delete account</p>
            </dir>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField 
                    error={errorIdState}
                    label="Verify" 
                    id="password" 
                    name='password'
                    helperText={idHelper}
                    fullWidth
                    required
                    onChange={e => setIdConfirm(e.target.value)}
                    onFocus={handleFocus}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                        marginTop: 1
                    }}
                    >
                        Submit 
                </Button>
            </Box>
            </div>
        </div>
    )
}