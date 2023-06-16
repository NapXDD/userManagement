import axiosClient, { axiosCloudinaryClient } from "../axiosClient";

export async function addDocPDF(doc, token) {
  return axiosCloudinaryClient.post("/v1/docs/addPDF", doc, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
}

export async function addDocDOC(doc, token) {
  return axiosCloudinaryClient.post("/v1/docs/addDOC", doc, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
}

export async function addDocDOCX(token, doc) {
  return axiosCloudinaryClient.post("/v1/docs/addDOCX", doc, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
}
