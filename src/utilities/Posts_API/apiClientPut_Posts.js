import axiosClient from "../axiosClient";

export async function updatePostByID(postId, newData, token) {
  return axiosClient.put(
    `/v1/posts/${postId}/updatePost`,
    {
      title: newData.title,
      content: newData.content,
    },
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );
}
