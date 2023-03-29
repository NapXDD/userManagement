import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import "./userProfileSetting.css"
import BasicDatePicker from '../../../utilities/component/datepicker/datepicker';
import { updateUserbyID } from '../../../utilities/apiClientPut';

export default function UserProfileSetting(){

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("accessToken")
    const [newData, setNewData] = useState({})
    const [date, setDate] = useState("")

    const handleUpdateUser = async () => {
        try{
            const { data: res } = await updateUserbyID(userId, newData, token)
            console.log(res)
            if(res.status === 200){
                console.log("update success")
            }
        }catch(err){
            console.log(err)
        }
    } 

    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeDate = (e) => {
        setDate(`${(e.$D <= 9) ? `0${e.$D}` : `${e.$D}`}-${(e.$M < 9) ? `0${e.$M+1}` : `${e.$M+1}`}-${e.$y}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateUser()
    }

    useEffect(() => {
        setNewData({
            ...newData,
            birthDay: date
        })
    }, [date])

    return(
        <div className="profile-setting-container">
            <form className='profile-setting-form' onSubmit={handleSubmit}>
                <TextField 
                    label="Username" 
                    id="username" 
                    name='username'
                    onChange={handleChange}
                />
                <TextField 
                    label="Bio" 
                    id="bio" 
                    name='bio'
                    onChange= {handleChange}
                />
                <BasicDatePicker 
                    description={"Date of birth"}
                    onChange= {handleChangeDate}
                />
                <Button
                type="submit"
                variant="contained"
                color="primary"
                >
                    Submit 
                </Button>
            </form>
        </div>
    )
}