import axiosClient from "../axiosClient";

export async function deleteMeeting(meetingID, token) {
  return axiosClient.delete(`/v1/meeting/${meetingID}/delete`, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
}
