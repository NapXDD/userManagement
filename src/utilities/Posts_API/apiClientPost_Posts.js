import axiosClient from "../axiosClient";

export async function addPost(post, token) {
  return axiosClient.post("/v1/posts/createPost", post, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
}
