import axiosClient from "../axiosClient";

export async function getAllDocs(token) {
  return axiosClient.get("/v1/docs/", {
    headers: {
      token: `Bearer ${token}`,
    },
  });
}
