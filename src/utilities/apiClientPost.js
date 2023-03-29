import axiosClient from "./axiosClient"; 
import { axiosCloudinaryClient } from "./axiosClient";

export async function registerAccount(req){
    return axiosClient.post("/v1/auth/register", {
        "username": req.username,
        "email": req.email,
        "password": req.password
    })
}

export async function loginAccount(email, password){
    return axiosClient.post("/v1/auth/login", {
        "email": email,
        "password": password
    })
}

export async function logoutAccount(token, userId){
    return axiosClient.post("/v1/auth/logout", {
        userId
    }, 
    {
        headers:{
            "token": `Bearer ${token}`
        }
    })
}

export async function uploadImage(token, avatar){
    return axiosCloudinaryClient.post("/upload/cloudinary-upload", 
        avatar,
        {
            headers:{
                "token": `Bearer ${token}`
            }
        }
    )
}

