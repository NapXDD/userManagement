import axiosClient from "../axiosClient";

export async function getAllMeeting(token) {
  return axiosClient.get("/v1/meeting/", {
    headers: {
      token: `Bearer ${token}`,
    },
  });
}

export async function getMeetingbyID(meetingID, token) {
  return axiosClient.get(`/v1/meeting/${meetingID}`, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
}
