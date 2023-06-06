import axiosClient from "../axiosClient";

export async function updateMeetingbyID(meetingId, newData, token) {
  return axiosClient.put(`/v1/meeting/${meetingId}/update`, newData, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
}
