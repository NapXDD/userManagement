import axiosClient from "./axiosClient"

export async function deleteUser(token, userId){
    return axiosClient.delete(`/v1/user/${userId}/delete`, {
        headers:{
            token: `Bearer ${token}`
        }
    })
}
