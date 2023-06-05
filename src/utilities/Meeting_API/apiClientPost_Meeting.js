import axiosClient from "../axiosClient";

export async function addMeeting(meeting, token) {
  return axiosClient.post("/v1/meeting/createMeeting", meeting, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
}
