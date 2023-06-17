import axiosClient from "../axiosClient";

export async function deletePost(token, postID) {
  return axiosClient.delete(`/v1/posts/${postID}/delete`, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
}
