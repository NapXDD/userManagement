import {  updateUserAvatarByID, updateUserbyID } from '../../../utilities/apiClientPut';
import { useDispatch, useSelector } from 'react-redux';
import "./userProfileCard.css"
import { avatarURL } from '../../../utilities/avatarURL';
import { currentUserData } from '../../../redux/features/setCurrentUser';
import { getUserbyID } from '../../../utilities/apiClientGet';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';


export default function UserProfileCard({id}){

    const token = localStorage.getItem("accessToken")
    const currentUserId = localStorage.getItem("userId")
    const user = useSelector((state) => state.user.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleMouseEnter = () => {
        const changeElement = document.querySelector(".change-paragraph")
        if(changeElement !== null){
            changeElement.classList.remove("hide")
        }
    }

    const handleMouseLeave = () => {
        const changeElement = document.querySelector(".change-paragraph")
        if(changeElement !== null){
            changeElement.classList.add("hide")
        }  
    }

    const handleChangeAva = async (e) => {
        const uploadData = new FormData()
        uploadData.append("image", e.target.files[0], e.target.files[0].name);

        const image = {
            image: uploadData.get("image")
        }

        try{
            updateUserAvatarByID(currentUserId, image, token)
            .then(
                res => {
                    if(res.status === 200){
                        console.log("update avatar success!")
                        getUserbyID(currentUserId, token)
                        .then(
                            res => {
                                if(res.status === 200){
                                    dispatch(currentUserData(res.data))
                                    localStorage.setItem("userAva", res.data.avatar)
                                    toast.success('Change avatar success', {
                                        position: "top-right",
                                        autoClose: 1000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                        });
                                    window.location.reload()
                                }
                            }
                        )
                        .catch((err) => {
                            console.error(err)
                        })
                        
                    }
                }
            )

        }catch(err){
            console.error(err)
        }
    }

    return(
        <div className='user-profile-card-container'>
            <div className='user-profile-card-content'>
                <div className='user-profile-avatar' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                    <img src={`${avatarURL}/${user.avatar}`} alt="user avatar"/>
                    {
                        currentUserId === user._id ? 
                        <div className='change-paragraph hide'>
                        <label htmlFor="file-upload" className='custom-file-upload'>
                            <p>Change avatar</p>
                        </label>
                        <input id='file-upload' type="file" onChange={(e) => handleChangeAva(e)} />
                        </div>
                        :
                        <></>
                    }
                    
                </div>
                <div className='user-profile-bio'>
                    <div className='user-profile-name'>
                        <h5>{user.username}</h5>
                    </div>
                    <div className='user-profile-email'>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}