import axiosClient from "../axiosClient";

export async function getAllPosts(token) {
  return axiosClient.get("/v1/posts/", {
    headers: {
      token: `Bearer ${token}`,
    },
  });
}
