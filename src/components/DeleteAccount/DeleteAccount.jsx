import { useNavigate, useParams } from "react-router-dom"
import { Box } from '@mui/system';
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { deleteUser } from "../../utilities/apiClientDelete";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/features/setAuth";
import { toast } from "react-toastify";

export default function DeleteAccount(){

    const {id} = useParams()
    const [idConfirm, setIdConfirm] = useState("")
    const currentUserId = localStorage.getItem("userId")
    const token = localStorage.getItem("accessToken")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(currentUserId === id){
            if(idConfirm === id){
                try{
                    const {data: res} = await deleteUser(token, id)
                    if(res.status === 200){
                        console.log("delete success")
                        localStorage.removeItem("accessToken")
                        localStorage.removeItem("userId")
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
                console.log("wrong confirm code")
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
                    console.error("wrong confirm code")
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

    return(
        <div>
            <p>Write <b>{id}</b> to confirm delete account</p>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField 
                    label="ID" 
                    id="password" 
                    name='password'
                    onChange={e => setIdConfirm(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    >
                        Submit 
                </Button>
            </Box>
        </div>
    )
}