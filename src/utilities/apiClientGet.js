import axiosClient from "./axiosClient";

export async function getAllUser(token){
    return axiosClient.get("/v1/user/", {
        headers:{
            "token": `Bearer ${token}`
        }
    })
}

export async function getUserbyID(userId, token){
    return axiosClient.get(`/v1/user/${userId}`, {
        headers:{
            token: `Bearer ${token}`
        }
    })
}