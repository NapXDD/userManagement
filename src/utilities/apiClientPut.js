import axiosClient from "./axiosClient";
import { axiosCloudinaryClient } from "./axiosClient";

export async function updateUserbyID(userId, newData ,token){
    return axiosClient.put(`/v1/user/${userId}/update`, 
        newData ,
        {
            headers:{
                token: `Bearer ${token}`
            }
        })
}

export async function updateUserPasswordByID(userId, newPassword, token){
    return axiosClient.put(`/v1/user/${userId}/updatePassword`,
        newPassword,
        {
            headers: {
                token: `Bearer ${token}`
            }
        })
}

export async function updateUserAvatarByID(userId, newAvatar, token){
    return axiosCloudinaryClient.put(`/v1/user/${userId}/updateAvatar`,
        newAvatar,
        {
            headers: {
                token: `Bearer ${token}`
            }
        })
}