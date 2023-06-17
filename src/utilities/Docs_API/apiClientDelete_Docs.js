import axiosClient from "../axiosClient";

export async function deleteDoc(token, docId) {
  return axiosClient.delete(`/v1/docs/${docId}/delete`, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
}
